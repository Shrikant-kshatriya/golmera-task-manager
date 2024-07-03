import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, onDelete }) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        {task.title}
                    </Typography>
                    {task.userID && <Typography variant="h5" component="div" gutterBottom>
                        {`User: ${task.userID.name}`}
                    </Typography>}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {task.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                        Due Date: {new Date(task.dueDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Status: {task.status}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" variant="contained" sx={{ mr: 1 }} onClick={() => {navigate(`/editTask/${task.id}`)}}>
                    Edit
                </Button>
                <Button size="small" color="secondary" variant="contained" onClick={() => onDelete(task.id)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default TaskCard;
