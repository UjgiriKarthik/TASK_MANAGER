import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/tasks/new" element={<ProtectedRoute><TaskForm/></ProtectedRoute>} />
        <Route path="/tasks/edit/:id" element={<ProtectedRoute><TaskForm/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
