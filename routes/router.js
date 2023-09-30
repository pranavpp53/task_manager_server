const express=require('express')
const { addTask, showAllTask, getSingleTask, deleteTask, changeStatus, editTask } = require('../controllers/logic')



//create an object for router class in express
const router=new express.Router()

//route for register add task
router.post('/api/tasks/addTask',addTask)

//route for get all task
router.get('/api/tasks/getAllTasks',showAllTask)

//router for get single task
router.get('/api/tasks/getSingleTask/:id',getSingleTask)

//router for delete task
router.delete('/api/tasks/deleteTask/:id',deleteTask)

//status update
router.post('/api/tasks/changeStatus',changeStatus)

// edit task details
router.put('/api/tasks/editTask/:id',editTask)

module.exports=router