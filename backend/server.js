const express = require('express');
const db = require('./dbconfig');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/auth');
const taskRoute = require('./routes/task');
const adminTasksRoute = require('./routes/admintask');

const app = express();

db();

app.use(cors({
    origin: ['http://localhost:3001/'], 
    credentials: true, 
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/auth', authRoute);
app.use('/tasks', taskRoute);
app.use('/admin/tasks', adminTasksRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});