const Hospital = require('../models/hospital');
const Doctor = require("../models/doctor");

const net = require('net');

const {get_viable_hospitals, get_distance} = require('./hospitalController');

const case_post = (req, res)=>
{
    let data = req.body;
    console.log(data);
    const location = {longitude:31.790210182152045, latitude:35.215105759686786};
    const stable = data.stable;
    let department;

    const client = new net.Socket();
    client.connect(32654, '127.0.0.1',()=>
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
    });

    client.on('close', ()=>
    {
        client.destroy();
        let client2 = new net.Socket();
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

                client2.connect(4444, '127.0.0.1', ()=>
                {
                    client2.write(JSON.stringify(newd));
                });

                client2.on('data', new_data=>
                {
                    data = new_data;
                });

                client2.on('close', ()=>
                {
                    Hospital.findById(data)
                        .then(newd=>res.send(newd));
                    client2.destroy();
                    return;
                })
            });
    });

}

module.exports = 
{
    case_post
};