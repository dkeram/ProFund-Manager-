import {useState} from 'react';
import api from '../api';
import LoadingIndicator from '../components/LoadingIndicator';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function AddCredentials(){
    const [credectials, setCredentials] = useState({
        public_service: '',
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const client = location.state.client_id;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            await api.post(`/api/credentials/new/`, {client,...credectials});
            alert("Credentials added successfully!");
            navigate(`/credentials/${client}`);
        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        }
    };

    return(
        <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
                <label htmlFor="publicService" className="form-label">Public Service</label>
                <select class="form-select" aria-label="Default select example" value={credectials.public_service} onChange={(e) => setCredentials({...credectials, public_service:e.target.value})} required>
                    <option >Select a public Service</option>
                    <option value="PSKE">PSKE</option>
                    <option value="EFKA">EFKA</option>
                    <option value="DYPA">DYPA</option>
                    <option value="MY_AADE">MY AADE</option>
                </select>
            </div>
            <div className="col-md-6">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" value={credectials.username} onChange={(e) => setCredentials({...credectials, username:e.target.value})} required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={credectials.password} onChange={(e) => setCredentials({...credectials, password:e.target.value})} required/>
            </div>
            {loading ? <LoadingIndicator/> : 
            <button type="submit" className="btn btn-primary">Submit</button>}
        </form>
    )
};
export default AddCredentials;