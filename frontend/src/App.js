import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import Layout from './components/Layout';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />s
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
