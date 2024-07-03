const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    name: Joi.string().required(),
    role: Joi.string().valid('user', 'admin').required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').required()
});

module.exports = {
    checkValidRegistration: async (req, res, next) => {
        try {
            const { error } = await registerSchema.validateAsync(req.body);
            if (error) throw error;
            next();
            
        } catch (error) {
            res.status(400).json({ message: error.details[0].message });
        }
    },
    checkValidLogin: async (req, res, next) => {
        try {
            const { error } = await loginSchema.validateAsync(req.body);
            if (error) throw error;
            next();
            
        } catch (error) {
            res.status(400).json({ message: error.details[0].message });
        }
    },
    checkValidTask: async (req, res, next) => {
        try {
            const { error } = await taskSchema.validateAsync(req.body);
            if (error) throw error;
            next();
            
        } catch (error) {
            res.status(400).json({ message: error.details[0].message });
        }
    }
}