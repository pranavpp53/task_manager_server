const express=require('express')
const { employeeRegister, getAllEmployees, getSingleEmployee,deleteEmployee, editUser } = require('../controllers/logic')
const upload = require('../multerConfig/storageConfig')


//create an object for router class in express
const router=new express.Router()

//route for register new employee
router.post('/employees/register',upload.single('user_profile'),employeeRegister)

//get all employees
router.get('/employees/getEmployees',getAllEmployees)

//get single employee data
router.get('/employees/getSingleEmployee/:id',getSingleEmployee)

//delete employee
router.delete('/employees/deleteEmp/:id',deleteEmployee)

//edit employee
router.post('/employees/editEmployee/:id',upload.single('user_profile'),editUser)



module.exports=router