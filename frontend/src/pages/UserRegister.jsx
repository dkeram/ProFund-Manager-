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
        <form onSubmit={handleSubmit}>
            <h1 className="text-center h1 mb-3 fw-normal">Register</h1>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <input className = "form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input className = "form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <label htmlFor="inputLastname" className="form-label">Lastname</label>
                    <input className = "form-control" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputFirstname" className="form-label">Firstname</label>
                    <input className = "form-control" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input className = "form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"/>
                </div>
            </div>  
            {loading &&  <LoadingIndicator />}
            <div className="col-12 text-center">
                <button className = "btn btn-primary" type="submit">Create an account</button>
            </div>
        </form>
    );
}




export default Register;