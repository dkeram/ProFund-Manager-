import {useEffect, useState, useRef} from 'react';
import api from '../api';


function Home(){
    const [clients, setClients] = useState([]);
    const [credentials, setCredentials] = useState([]);
    const [clientId, setClientId] = useState(null);
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    
    
    useEffect(() => {
        getClients();
        if (modalRef.current) {
            modalInstance.current = new window.bootstrap.Modal(modalRef.current);
        }
    },[]);
    
    const getClients = ()=>{
        api.get(`/api/clients/list/`)
            .then(res => {setClients(res.data); })
            .catch((error) => {alert(error)});
    };

    const openModal = (clientId) => {
        setClientId(clientId);
        api.get(`/api/credentials/client/${clientId}/`)
            .then(res => {setCredentials(res.data); })
            .catch((error) => {alert("This client has no credentials yet.")}
        );
        modalInstance.current.show();
    };

    const autoLogin = (clientId,publicService) => {
        api.post(`/api/credentials/connect/${clientId}/${publicService}/`)
        .catch((error) => {
            alert(error);
        });
    };

    return(
        <>
            <h1>Clients</h1>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">VAT</th>
                    <th scope="col">GEMI</th>
                    <th scope="col">E-Mail</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {clients.map((client)=>(
                        <tr key = {client.id}>
                            <td>{client.id}</td>
                            <td>{client.title}</td>
                            <td>{client.name}</td>
                            <td>{client.address}</td>
                            <td>{client.vat_number}</td>
                            <td>{client.gemi_number}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.created_at}</td>
                            <td>
                                <div className="d-flex justify-content-start">
                                    <div className="btn-group me-2">
                                        <button className="btn btn-secondary"  onClick={() => openModal(client.id)}><i className="bi bi-globe-asia-australia"></i></button>
                                    </div>
                                    <div className="btn-group me-2">
                                        <button className="btn btn-secondary"  onClick={() => {window.location.href=`/projects/clients/${client.id}`}}><i className="bi bi-wallet-fill"></i></button>
                                    </div>
                                    <div className="btn-group me-2">
                                        <button className="btn btn-secondary"  onClick={() => {window.location.href=`/credentials/${client.id}`}}><i className="bi bi-key-fill"></i></button>
                                    </div>
                                    <div className="btn-group me-2">
                                            <button className="btn btn-secondary"  onClick={() => {window.location.href=`/edit-client/${client.id}/`}}><i className="bi bi-pencil-fill"></i></button>
                                    </div>
                                    <div className="btn-group me-2">
                                        <button className="btn btn-danger" onClick={() => {api.delete(`api/client/delete/${client.id}`).then(()=> window.location.reload())}}><i className="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
                <div className="modal fade" id="autoLoginSelect" tabIndex="-1" ref={modalRef} aria-labelledby="userModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="autoLoginSelect">Choose Where You Want to Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                                    <div className="d-flex justify-content-center">
                                        <h2>Public Service</h2>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <ul className="list-group">
                                            {credentials.map((credential)=>(
                                                <li className="list-group-item"  key = {credential.id}>
                                                        <button className="btn btn-info" onClick={() => {autoLogin(clientId, credential.public_service)}} >{credential.public_service}</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Home; 