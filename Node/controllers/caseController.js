const Hospital = require('../models/hospital');

const net = require('net');

const {get_viable_hospitals} = require('./hospitalController');

const case_post = (req, res)=>
{
    let data = req.body;
    const location = data.location;
    let department;

    const client = new net.Socket();
    client.connect(5555, '127.0.0.1',()=>
    {
        client.write(data);
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
        get_viable_hospitals(location, department)
            .then(data=>{viable=data});
        client.connect(4444, '127.0.0.1', ()=>
        {
            client.write(data);
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

}

module.exports = 
{
    case_post
};