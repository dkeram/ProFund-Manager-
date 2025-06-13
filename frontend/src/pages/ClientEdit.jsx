import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import api from '../api';


function ClientEdit() {
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);
    const { client_id } = useParams();

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await api.get(`/api/client/${client_id}/`);
                setClient(response.data);
                setLoading(false);
            } catch (error) {
                alert("Error fetching client data: " + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchClient();
    }, [client_id]);

    console.log(client);

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/client/edit/${client_id}/`, client);
            alert("Client updated successfully!");
        } catch (error) {
            alert("Error updating client: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="row g-3">
            <h1 className="text-center h1 mb-3 fw-normal">Edit Client</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <label htmlFor="inputTitle" className="form-label">Title</label>
                    <input className="form-control" type="text" name="title" value={client.title || ''} onChange={handleChange} placeholder="Title" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input className="form-control" type="text" name="name" value={client.name || ''} onChange={handleChange} placeholder="Name" />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input className="form-control" type="text" name="address" value={client.address || ''} onChange={handleChange} placeholder="Address" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputVat" className="form-label">VAT</label>
                    <input className="form-control" type="text" name="vat" value={client.vat_number || ''} onChange={handleChange} placeholder="VAT" />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <label htmlFor="inputGemi" className="form-label">GEMI</label>
                    <input className="form-control" type="text" name="gemi" value={client.gemi_number || ''} onChange={handleChange} placeholder="GEMI" />
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputEmail" className="form-label">E-Mail</label>
                    <input className="form-control" type="email" name="email" value={client.email || ''} onChange={handleChange} placeholder="E-mail" />
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input className="form-control" type="text" name="phone" value={client.phone || ''} onChange={handleChange} placeholder="Phone" />
                </div>
            </div>
            <div className="col-12 text-center">
                {loading && <LoadingIndicator />}
                <button className="btn btn-primary" type="submit">Update Client</button>
            </div>
        </form>
    ); 
};

export default ClientEdit;