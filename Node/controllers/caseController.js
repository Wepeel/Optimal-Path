const Hospital = require('../models/hospital');
const Doctor = require("../models/doctor");

const net = require('net');

const {get_viable_hospitals, get_distance} = require('./hospitalController');

const case_post = (req, res)=>
{
    let data = req.body;
    const location = {longitude:31.790210182152045, latitude:35.215105759686786};
    const stable = data.stable;
    let department;

    const client = new net.Socket();
    client.connect(5555, '127.0.0.1',()=>
    {
        client.write(JSON.stringify(data));
    })

    client.on('data', data=>
    {
        if (data == "mi")
        {
            department = "Cardiology";
        }

        else if (data == "stroke")
        {
            department = "Neurology";
        }

        else
        {
            department = "All";
        }

        console.log("-------------------", data.toString(), department);
    });

    client.on('close', ()=>
    {
        get_viable_hospitals(location, department)
            .then( async (data)=>
            {
                let newd = {stable};
                await Promise.all(data.map( async (item)=>
                {
                    let has;
                    let id = item._id;
                    has = await Doctor.exists({department:department, hospital:id});
                    newd[id] = {has_dept: has, 
                        load_percentage:item.load_percentage,
                        dist:get_distance(location, item)}
                }));

                console.log(newd);

                client.connect(4444, '127.0.0.1', ()=>
                {
                    client.write(JSON.stringify(newd));
                });

                client.on('data', new_data=>
                {
                    data = new_data;
                });

                client.on('close', ()=>
                {
                    Hospital.findById(data)
                        .then(newd=>res.send(newd));
                })
            });
    });

}

module.exports = 
{
    case_post
};