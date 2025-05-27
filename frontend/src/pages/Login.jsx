import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import Logo from '../assets/Logo.png';
import { useUser } from '../providers/UserProvider';

function Login() {
    const { login } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            await login(username, password);
            navigate('/');
        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        };
    };

    return(
        <main className="d-flex vh-100 align-items-center justify-content-center bg-light">
            <form onSubmit={handleSubmit} className="form-signin">
                <div className="text-center">
                <img src={Logo} alt="Logo" width="100" height="100"/>
                </div>
                <h1 className="text-center h1 mb-3 fw-normal">Please sign in</h1>
            
                <div className="form-floating">
                <input 
                    type="username" 
                    className="form-control" 
                    id="floatingInput" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username"
                />
                <label htmlFor="floatingInput">UserName</label>
                </div>

                <div className="form-floating">
                <input 
                    type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
                </div>
                
                <div className="text-center mb-3">
                {loading && <LoadingIndicator />}
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            </form>
        </main>
    );
}

export default Login;