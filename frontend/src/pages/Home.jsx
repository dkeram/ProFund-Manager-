import React, {useEffect, useState} from 'react';
import api from '../api';
//import LoadingIndicator from "../components/LoadingIndicator";


function Home(){
    const [clients, setClients] = useState([]);
    
    
    useEffect(() => {
        getClients();
    },[]);
    
    const getClients = ()=>{
        api.get(`/api/clients/list/`)
            .then(res => {setClients(res.data); })
            .catch((error) => {alert(error)});
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
                                <button className="btn btn-secondary"  onClick={() => {window.location.href=`/credentials/${client.id}`}}><i className="bi bi-key"></i></button>
                                <button className="btn btn-danger" onClick={() => {window.location.href=`/client/delete/${client.id}`}}><i className="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Home; 