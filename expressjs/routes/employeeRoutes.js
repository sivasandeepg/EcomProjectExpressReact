const express = require('express')
const router = express.Router()
const EmployeeController = require('../controllers/EmployeeController')
const Employee = require('../models/Employee')


 
router.post('/addemp', EmployeeController.createEmployee)
router.get('/getemployees', EmployeeController.getEmployees)
router.get('/getsingleemployees/:id', EmployeeController.getSingleEmployees)
router.put('/updateemployees/:id', EmployeeController.updateEmployees)
router.delete('/deleteemployees/:id', EmployeeController.deleteEmployees)
module.exports = router
