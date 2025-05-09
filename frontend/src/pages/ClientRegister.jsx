import {useState} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';

function ClientRegister(){
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [vat_number, setVatNumber] = useState('');
    const [gemi_number, setGemiNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            await api.post(`/api/client/new/`, {title, name, email, phone, address, vat_number, gemi_number});
            navigate('/');
        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        }
    };

    return(
        <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPhone" className="form-label">Phone</label>
                <input type="phone" className="form-control" id="inputPhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="inputAddress" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="col-md-5">
                <label htmlFor="inputVat" className="form-label">VAT Number</label>
                <input type="text" className="form-control" id="inputVat" value={vat_number} onChange={(e) => setVatNumber(e.target.value)} />
            </div>
            <div className="col-md-1">
                <label htmlFor="inputVat" className="form-label">Search</label>
                <br/>
                <button type="button" class="btn btn-secondary" onClick={null}> <i class="bi bi-globe-americas"></i> </button>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputGemi" className="form-label">Gemi Registration Number</label>
                <input type="textIsAuthenticated" className="form-control" id="inputGemi" value={gemi_number} onChange={(e) => setGemiNumber(e.target.value)} />
            </div>
            <div className="col-12">
                {loading && <LoadingIndicator />}
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Create new client</button>
            </div>
        </form>
    );
}

export default ClientRegister;