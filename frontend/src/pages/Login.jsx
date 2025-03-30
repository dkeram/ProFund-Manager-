import {useState} from 'react';
import api from '../api';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import LoadingIndicator from '../components/LoadingIndicator';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await api.post(`/api/token/`, {username, password});
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate('/');
        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        };
    };

    return(
        <main class="d-flex align-items-center py-4 bg-body-tertiary">
        <form onSubmit={handleSubmit} class="form-signin w-100 m-auto">
            <img class="mb-4" src="../assets/logo.svg" alt="" width="72" height="57"/>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        
            <div class="form-floating">
            <input type="username" class="form-control" id="floatingInput" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
            <label for="floatingInput">UserName</label>
            </div>
            <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            <label for="floatingPassword">Password</label>
            </div>
            {loading && <LoadingIndicator />}
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      </form>
      </main>
    );
}

export default Login