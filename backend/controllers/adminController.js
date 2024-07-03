const { AdminTaskResponseDTO } = require('../dtos/taskDTO');
const Task = require('../models/Task');

module.exports = {
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find({}).populate('userID', '-password');
            const newtasks = tasks.map(task => {
                return new AdminTaskResponseDTO(task);
            })
            res.status(200).json(newtasks);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}