import {useState} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await api.post(`/user/register/`, {username, email, firstName, lastName,password});
                navigate('/login');
        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        };
    };

    return(
        <form onSubmit={handleSubmit} className={"form-container"}>
            <h1>Register</h1>
            <input className = "form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
            <input className = "form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            <input className = "form-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
            <input className = "form-input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"/>
            <input className = "form-input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/>
            {loading &&  <LoadingIndicator />}
            <button className = "form-button" type="submit">Create an account</button>
        </form>
    );
}

export default Register;