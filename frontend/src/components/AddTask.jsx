import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Header from './Header/Header';
import { useNavigate } from 'react-router-dom';

const AddTask = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pending');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newTask = { title, description, dueDate, status };
            const res = await axios.post('http://localhost:3000/tasks', newTask, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            setTitle('');
            setDescription('');
            setDueDate('');
            setStatus('pending');
            navigate('/');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <>
            <Header />
            <Container sx={{ mt: 4 }} maxWidth="sm">
                <Typography variant="h5" component="h2" gutterBottom>
                    Add New Task
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        required
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        label="Due Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        margin="normal"
                    />
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Age"
                                onChange={e => setStatus(e.target.value)}
                            >
                                <MenuItem value={'pending'}>pending</MenuItem>
                                <MenuItem value={'in-progress'}>in-progress</MenuItem>
                                <MenuItem value={'completed'}>completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                        Add Task
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default AddTask;
