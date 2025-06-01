import { useState,useEffect } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import { useClient } from '../providers/ClientProvider';

function Projects() {
    const [projects, setProjects] = useState([]);
    const { setClientId } = useClient();
    const { client_id } = useParams();
    setClientId(client_id); 

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = () => {
        api.get(`/api/projects/client/${client_id}/`)
        .then(res => {setProjects(res.data);})
        .catch((error) => {alert(error);});
    };

    return(
        <>
            <h1>Projects</h1>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Fund Project</th>
                    <th scope="col">Description</th>
                    <th scope="col">Comments</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                    {projects.map((project)=>(
                        <tr key = {project.id}>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>{project.comments}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => {api.delete(`api/projects/delete/${project.id}/`).then(()=> window.location.reload())}}><i className="bi bi-trash"></i></button>   
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Projects;