import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Button, Container, Grid, Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import TaskCard from './TaskCard/TaskCard';
import { UserContext } from './App';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 3;
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    
    useEffect(() => {
      const fetchTasks = async () => {
        const res = await axios.get('http://localhost:3000/tasks', {
          withCredentials: true,
        });
        setTasks(res.data);
        };
        const fetchAdminTasks = async () => {
            const res = await axios.get('http://localhost:3000/admin/tasks', {
                withCredentials: true,
              });
              setTasks(res.data);
            };
            user.role === 'admin' ? fetchAdminTasks() : fetchTasks();
          }, [tasks]);
          
          const handleDelete = async (id) => {
            await axios.delete(`http://localhost:3000/tasks/${id}`, { withCredentials: true });
            setTasks(tasks.filter(task => task._id !== id));
          };
          
          // Calculating the tasks to display for the current page
          const indexOfLastTask = currentPage * tasksPerPage;
          const indexOfFirstTask = indexOfLastTask - tasksPerPage;
          const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

          return (
            <>
            <Header/>
            <Container sx={{mt: 4, mb: 4}}>
              <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant='h5'>All Tasks</Typography>
                <Button size="small" color="primary" variant="contained" sx={{ mr: 1 }} onClick={() => {navigate('/addTask')}}>
                Add Task
              </Button>
              </Box>
            </Container>
            <Container sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    {currentTasks.map((task) => (
                        <Grid item xs={12} sm={6} md={4} lg={12} key={task.id}>
                            <TaskCard task={task} onDelete={handleDelete}/>
                        </Grid>
                    ))}
                </Grid>
                {tasks.length > tasksPerPage && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={Math.ceil(tasks.length / tasksPerPage)}
                            page={currentPage}
                            onChange={(e, value) => setCurrentPage(value)}
                        />
                    </Box>
                )}
            </Container>
        </>
    );
};

export default Home;
