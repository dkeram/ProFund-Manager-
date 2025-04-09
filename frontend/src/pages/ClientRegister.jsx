import {useState} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import axios from 'axios';

function ClientRegister(){
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [vatNumber, setVatNumber] = useState('');
    const [gemiNumber, setGemiNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            await api.post(`/api/clients/new/`, {title, name, email, phone, address, vatNumber, gemiNumber});
            navigate('/');
        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        }
    };

    const searchByVat = async () => {
        if (!vatNumber) {
            alert("Please enter a VAT number.");
            return;
        }
        setLoading(true);

        try {
            const res = await api.get(`/api/client/vat/${vatNumber}`);
            console.log(res.data);
            if (res.data.valid) {
                setName(res.data.company_name || '');
                setAddress(res.data.address || '');
                setEmail(res.data.email || '');
                setPhone(res.data.phone || '');
            } else {
                alert("Invalid VAT number.");
            }
        }catch (error) {
            alert("Error fetching data. Please check the VAT number.");
        }
        finally {
            setLoading(false);
        };
    };

    return(
        <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
                <label for="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="col-md-6">
                <label for="inputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="col-md-6">
                <label for="inputName" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-md-6">
                <label for="inputPhone" className="form-label">Phone</label>
                <input type="phone" className="form-control" id="inputPhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="col-12">
                <label for="inputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="inputAddress" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="col-md-5">
                <label for="inputVat" className="form-label">VAT Number</label>
                <input type="text" className="form-control" id="inputVat" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} />
            </div>
            <div className="col-md-1">
                <label for="inputSearch" className="form-label">Search</label>
                <button type="button" class="btn btn-secondary" onClick={searchByVat}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe-americas" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"></path>
                    </svg>
              </button>
            </div>
            <div className="col-md-6">
                <label for="inputGemi" className="form-label">Gemi Registration Number</label>
                <input type="password" className="form-control" id="inputGemi" value={gemiNumber} onChange={(e) => setGemiNumber(e.target.value)} />
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