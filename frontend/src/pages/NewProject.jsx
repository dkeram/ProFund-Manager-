import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../providers/ClientProvider';
import LoadingIndicator from '../components/LoadingIndicator';
import { useLocation } from 'react-router-dom';


function NewProject() {
    const [project, setProject] = useState({
        name: '',
        description: '',
        comments: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const client = location.state.client_id;


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post(`/api/project/new/`, { client, ...project });
            navigate(`/projects/clients/${client}`);
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
                <label htmlFor="name" className="form-label">Fund Project Name</label>
                <input type="text" className="form-control" id="name" value={project.name} onChange={(e) => setProject({ ...project, name: e.target.value })} required />
            </div>
            <div className="col-md-6">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="textarea" className="form-control" id="description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} required />
            </div>
            <div className="col-md-6">
                <label htmlFor="comments" className="form-label">Comments</label>
                <input type="textarea" className="form-control" id="comments" value={project.comments} onChange={(e) => setProject({ ...project, comments: e.target.value })} />
            </div>
            <div className="col-md-8">
            {loading ? <LoadingIndicator /> :
                <button type="submit" className="btn btn-primary">Submit</button>}
            </div>
        </form>
    );
};

export default NewProject;