const Task = require('../models/Task');

module.exports = {
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find({}).populate('userID', '-password');
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}