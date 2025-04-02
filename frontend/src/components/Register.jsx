import React, {useState} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await api.post(`/api/user/register/`, {username, password, email, firstname, lastname});
            navigate('/login');
        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        }
    }

    return(
        <main className="d-flex vh-100 align-items-center justify-content-center bg-light">
                <h2 className="text-center mb-3">Register</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    placeholder="Enter your first name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                
                <div className="mb-3">
                <label className="form-label">Last Name</label>
                    <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    placeholder="Enter your last name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input
                    type="text"
                    name="usename"
                    className="form-control"
                    placeholder="Enter your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {loading && <LoadingIndicator />}
                <button className="btn btn-primary w-100" type="submit">
                    Register
                </button>
                </form>
    </main>
    )
}

export default Register;