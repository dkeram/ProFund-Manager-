import {useState} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';

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
            await api.post(`/user/register/`, {username, password, email, firstname, lastname});
            navigate('/login');
        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        }
    };

    return(
        <main className="d-flex vh-100 align-items-center justify-content-center bg-light">
            <form onSubmit={handleSubmit} className="form-signin w-100" style={{ maxWidth: 400 }}>
                <h1 className="text-center mb-4">Register</h1>

                <div className="form-floating">
                <input
                    type="text"
                    id="firstname"
                    className="form-control"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <label htmlFor="firstname">First Name</label>
                </div>

                <div className="form-floating">
                <input
                    type="text"
                    id="lastname"
                    className="form-control"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <label htmlFor="lastname">Last Name</label>
                </div>

                <div className="form-floating">
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating">
                <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username</label>
                </div>

                <div className="form-floating">
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                </div>

                <div className="text-center mb-3">
                {loading && <LoadingIndicator />}
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
            </form>
        </main>
    );
}

export default Register;