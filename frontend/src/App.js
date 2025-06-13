import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClientProvider } from './providers/ClientProvider';
import { UserProvider } from './providers/UserProvider';
import Login from './pages/Login';
import Register from './pages/UserRegister';
import UserProfile from './pages/UserProfile';
import Home from './pages/Home';
import ClientRegister from './pages/ClientRegister';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import Credentials from './pages/Credentials';
import AddCredentials from './pages/AddCredentials';
import MyTasks from './pages/MyTasks';
import NewTask from './pages/NewTask';
import Projects from './pages/Projects';
import NewProject from './pages/NewProject';
import ClientEdit from './pages/ClientEdit';

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
          <Route path="/edit-client/:client_id" element={<ProtectedRoute><ClientEdit /></ProtectedRoute>} />
          <Route path="/credentials/:client_id" element={<ProtectedRoute><Credentials /></ProtectedRoute>} />
          <Route path="/credentials/new/" element={<ProtectedRoute><AddCredentials /></ProtectedRoute>} />
          <Route path="/projects/clients/:client_id" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/project/new/" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
          <Route path="/my-tasks/" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />
          <Route path="/new-task" element={<ProtectedRoute><NewTask /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
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
