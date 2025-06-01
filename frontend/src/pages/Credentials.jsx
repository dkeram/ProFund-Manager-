import { useState, useEffect} from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import { useClient } from '../providers/ClientProvider';


function Credentials(){
    const [credentials, setCredentials] = useState([]);
    const { setClientId } = useClient();
    const { client_id } = useParams();
    setClientId(client_id);
    
    useEffect(() => {
        getCredentials();
    },[]);
    
    const getCredentials = ()=>{
        api.get(`/api/credentials/client/${client_id}/`)
            .then(res => {setCredentials(res.data); })
            .catch((error) => {alert("This client has no credentials yet.")}    
        );
    };


    return(
        <>
            <h1>Credentials</h1>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Public Service</th>
                    <th scope="col">Username</th>
                    <th scope="col">Password</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                    {credentials.map((credential)=>(
                        <tr key = {credential.id}>
                            <td>{credential.public_service}</td>
                            <td>{credential.username}</td>
                            <td>{credential.password}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => {api.delete(`api/credentials/delete/${credential.id}/`).then(()=> window.location.reload())}}><i className="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Credentials;