import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext } from 'react'
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const res = await axios.post('http://localhost:3000/auth/logout', {email: user.email}, { withCredentials: true });
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');}
        catch (error) {
            console.error(error);
        }
    };

  return (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Task Manager
            </Typography>
            {user && (
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Header