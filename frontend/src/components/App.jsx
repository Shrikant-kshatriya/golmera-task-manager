import '../App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import { createContext, useEffect, useState } from 'react';
import AddTask from './AddTask';
import EditTask from './EditTask';

// user context
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    // Checking local storage for user data on initial load
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
},[]);

  return (
    <div className='App'>
      <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/addTask' element={user ? <AddTask /> : <Navigate to="/login" />} />
            <Route path='/editTask/:id' element={user ? <EditTask /> : <Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>    
  )
}

export default App;
