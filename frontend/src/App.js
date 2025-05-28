import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ClientRegister from './pages/ClientRegister';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import Credentials from './pages/Credentials';
import AddCredentials from './pages/AddCredentials';
import MyTasks from './pages/MyTasks';
import NewTask from './pages/NewTask';
import { ClientProvider } from './providers/ClientProvider';
import { UserProvider } from './providers/UserProvider';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
      <ClientProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/new-client" element={<ProtectedRoute><ClientRegister /></ProtectedRoute>} />
          <Route path="/credentials/:client_id" element={<ProtectedRoute><Credentials /></ProtectedRoute>} />
          <Route path="/credentials/new/" element={<ProtectedRoute><AddCredentials /></ProtectedRoute>} />
          <Route path="/my-tasks/" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />
          <Route path="/new-task" element={<ProtectedRoute><NewTask /></ProtectedRoute>} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ClientProvider>
    </UserProvider>
    </BrowserRouter>
  )
}

export default App;
