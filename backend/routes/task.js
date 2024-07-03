const express = require('express');
const router = express.Router();
const { getTasks, getTask, createTask, deleteTask, updateTask } = require('../controllers/taskController');
const { checkAuth } = require('../middlewares/authentication');
const { checkValidTask } = require('../middlewares/validator');

router
// get all tasks
.get('/', checkAuth, getTasks)
// get single task
.get('/:id', checkAuth, getTask)
// post task
.post('/', checkAuth, checkValidTask, createTask)
// update single task
.put('/:id', checkAuth, checkValidTask, updateTask)
// patch single task
.patch('/:id', checkAuth, checkValidTask, updateTask)
// delete single task
.delete('/:id', checkAuth, deleteTask);

module.exports = router;