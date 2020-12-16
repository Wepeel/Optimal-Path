const spawn = require("child_process").spawn;

const { get_viable_hospitals } = require('./hospitalController');

const case_post = (req, res)=>
{
    let data = req.body;
    const location = data.location;
    
    let pythonProcess = spawn('python', ["../Python/get_problem.py", data]);

    pythonProcess.stdout.on('data', new_data=>
    {
        data = new_data;
    });

    pythonProcess.on('close', new_data=>
    {
        pythonProcess = spawn('python', ["../Python/get_hosp.py",
        await get_viable_hospital(location, data.department), data]);
    });

    pythonProcess.stdout.on('data', new_data=>
    {
        data = new_data;
    });

    res.send(data);
}

module.exports = 
{
    case_post
};