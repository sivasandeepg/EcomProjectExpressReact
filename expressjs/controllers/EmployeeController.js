const Employee = require('../models/Employee')
 
const createEmployee  = async(req, res)=>{
    try{
        const {name, email, phone, city} = req.body
        const employee = new Employee({
            name,email,phone,city
        })
        await employee.save()
        res.status(201).json(employee)
    } catch(error){
        console.log('there is an error:', error)
        res.status(500).json({message: 'Server error'})
    }
}
 

const getEmployees = async(req, res)=>{

    try {
        const employee = await Employee.find()
        res.status(200).json(employee)

    }catch(error){
        console.error("There is an Error : ", error) 
        res.status(500).json({message: 'Server error'})
    }
}

const getSingleEmployees = async(req, res)=>{
    try {
        const employee = await Employee.findById(req.params.id)
        if(!employee){
            return res.status(404).json({message: 'Employee Not Found'})
        }
        res.status(200).json(employee)
    }catch(error){
        console.error("There is an Error : ", error) 
        res.status(500).json({message: 'Server error'})
    }
}

const updateEmployees = async(req, res)=>{
    try {
        const {name, email, phone, city} = req.body

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name,email,phone,city }

        )
        if(!employee){
            return res.status(404).json({message: 'Employee Not Found'})
        }
        res.status(200).json(employee)
    }catch(error){
        console.error("There is an Error : ", error) 
        res.status(500).json({message: 'Server error'})
    }
}
 
   
const deleteEmployees = async(req, res)=>{
    try {
        const {name, email, phone, city} = req.body

        const employee = await Employee.findByIdAndDelete( req.params.id )
        if(!employee){
            return res.status(404).json({message: 'Employee Not Found'})
        }
        res.status(200).json(employee)
    }catch(error){
        console.error("There is an Error : ", error) 
        res.status(500).json({message: 'Server error'})
    }
}





module.exports = {createEmployee,getEmployees,getSingleEmployees,updateEmployees,deleteEmployees }
  