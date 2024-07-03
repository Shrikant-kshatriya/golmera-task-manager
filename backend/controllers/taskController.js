const Task = require('../models/Task');
const { TaskRequestDTO, TaskResponseDTO } = require('../dtos/taskDTO');
const { createTask, deleteTask, getTasks, getTask, updateTask } = require('../services/taskServices'); 

module.exports = {
    createTask: async (req, res) => {   // create a task for user
        try {
            const task = createTask(new TaskRequestDTO(req.body, req.user.id));
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getTasks: async (req, res) => {  // get all tasks for user
        try {
            const tasks = await getTasks(req.user.id);
            const newTasks = tasks.map(task => {
                return new TaskResponseDTO(task);
            })
            res.status(200).json(newTasks);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getTask: async (req, res) => {  // get single task of user
        try {
            const task = await getTask(req.params.id);
            res.status(200).json(new TaskResponseDTO(task));
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateTask: async (req, res) => {  // update single task of user
        try {
            const task = await updateTask(req.params.id, req.body);
            if (!task) return res.status(404).json({ message: 'Task not found' });
            res.status(200).json(new TaskResponseDTO(task));
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteTask: async (req, res) => {   // delete single task of user
        try {
            const task = await deleteTask(req.params.id);
            if (!task) return res.status(404).json({ message: 'Task not found' });
            res.status(200).json({ message: 'Task deleted successfully'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}