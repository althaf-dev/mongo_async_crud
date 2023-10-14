// const data = {
//     employees : require('../Data/employee.json'),
//     setEmployee: function (data){ this.employees = data}
// }
const Employ = require('../Data/Employee');
const getAllEmployees = async(req,res)=>{

    const data = await Employ.find({}).exec();
    if(!data) return res.status(204).json({'message':'No Employees found'});
    console.log(`get rewquest from employees ${data}`);
    res.json(data);
}
const createEmployees = async(req,res)=>{

    console.log("entered to post employee")
    const newEmploye = {
        // id:data.employees[data.employees.length-1].id+1 || 1,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }

    if(!newEmploye.firstname || !newEmploye.lastname){
        return res.status(400).json({'message':"first and last names required"})
    }
    await Employ.create(newEmploye);
    // data.setEmployee([...data.employees,newEmploye]);
    res.status(201).json({'message':"added employee"});
}

const updateEmployee = async(req,res)=>{

    if(!req?.body?.id){
        return res.status(400).json({'message':'ID parameters not found'});
    }
    const employee  = await Employ.findOne({_id:req.body.id}).exec();
    // const employee = data.employees.find(emp=>emp.id==req.body.id);
    // const employee = Employ.findOne()
    if(!employee){
        return res.status(400).json({"message":`Employ Id ${req.body.id} no match`})
    }
    if(req.body?.firstname){
        employee.firstname = req.body.firstname;
    }
    if(req.body?.lastname){
        employee.lastname = req.body.lastname;
    }
    // const filteredArray = data.employees.filter((emp)=>emp.id != req.body.id);
    // data.setEmployee([...filteredArray,employee]);
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req,res)=>{

    if(!req?.body?.id){
        return res.status(400).json({'message':"Employ Id required"})
    }
    const employee  = await Employ.findOne({_id:req.body.id}).exec();
    // const employee = data.employees.find(emp=>emp.id==req.body.id);
    if(!employee){
        return res.status(400).json({"message":`Employ with ${req.body.id} not found`})
    }
    const result = await employee.deleteOne({_id:req.body.id});
    // const filteredArray = data.employees.filter((emp)=>emp.id != req.body.id);
    // data.setEmployee([...filteredArray]);
    res.json(result);
}

const getEmployee = async(req,res)=>{

    if(!req?.params?.id){
        return res.status(400).json({'message':"Employ Id required"})
    }
    const employee  = await Employ.findOne({_id:req.params.id}).exec();
    if(!employee){
        return res.status(400).json({"message":`Employ with ${req.params.id} not found`})
    }
    res.json(employee);
}

module.exports = {getAllEmployees,createEmployees,updateEmployee,deleteEmployee,getEmployee}