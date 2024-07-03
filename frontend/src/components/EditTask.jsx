import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Header from './Header/Header';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchDetails = async (id) => {
            // Fetch initial options
            try {
                axios.get(`https://golmerataskmanager-backend.vercel.app/tasks/${id}`, {
                    withCredentials: true
                })
               .then(res => {
                 const { title, description, dueDate, status } = res.data;
                 setTitle(title);
                 setDescription(description);
                 setDueDate(new Date(dueDate).toISOString().split('T')[0]);
                 setStatus(status);
               })  
            } catch (error) {
                console.log(error)
            }
        }
        fetchDetails(id);
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newTask = { title, description, dueDate, status };
            const res = await axios.put(`https://golmerataskmanager-backend.vercel.app/tasks/${id}`, newTask, {
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
                   Edit Task
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
                        Save
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default EditTask;
