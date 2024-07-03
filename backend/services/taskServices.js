const Task = require('../models/Task');

module.exports = {
    createTask: async (task) => {
        try {
            const task1 = new Task(task);
            await task1.save();
            return task1;
        } catch (error) {
            throw error;
        }
    },
    getTasks: async (id) => {
        try {
            const tasks = await Task.find({userID: id});
            return tasks;
        } catch (error) {
            throw error;
        }
    },
    getTask: async (id) => {
        try {
            const task = await Task.findById(id);
            if (!task) throw new Error('Task not found');
            return task;
        } catch (error) {
            throw error;
        }
    },
    updateTask: async (id, updatedTask) => {
        try {
            const task = await Task.findByIdAndUpdate(id, updatedTask);
            if (!task) throw new Error('Task not found');
            return task;
        } catch (error) {
            throw error;
        }
    },
    deleteTask: async (id) => {
        try {
            const task = await Task.findByIdAndDelete(id);
            if (!task) throw new Error('Task not found');
            return task;
        } catch (error) {
            throw error;
        }
    }
}