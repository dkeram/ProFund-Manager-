import {useState, useEffect} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';

function NewTask() {
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [task, setTask] = useState({
        task: '',
        description: '',
        client: '',
        project: '',
        deadline: ''
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getClients();
        if (task.client) {
            getProjects();
        }
        getUser();
    }, []);

    function getClients() {
        api.get(`/api/clients/list/`)
            .then(res => {
                setClients(res.data);
            })
            .catch((error) => {
                alert(error);
            });
    };

    function getUser() {
        api.get(`/api/user/list/`)
            .then(res => {
                setUsers(res.data);
            })
            .catch((error) => {
                alert(error);
            });
    };

    function getProjects() {
        api.get(`/api/projects/client/${task.client}/`)
            .then(res => {
                setProjects(res.data);
            })
            .catch((error) => {
                alert(error);
            });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        try {
            await api.post(`/api/tasks/new/`,{task});
            navigate("/");
        }catch(error){
            alert(error);
        }finally{
            setLoading(false);
        }
    }

    return (
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
                <label htmlFor="inputClient" className="form-label">Client</label>
                <select className="form-select" aria-label="Select client" value={task.client} onChange={(e) => setTask({...task, client:e.target.value})} required>
                <option value>Select Client</option>
                {clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                ))}
                </select>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputProject" className="form-label">Project</label>
                <select className="form-select" aria-label="Select client" value={task.project} onChange={(e) => setTask({...task, project:e.target.value})} required>
                <option value>Select Project</option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                ))}
                </select>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputUser" className="form-label">User to Assign</label>
                <select className="form-select" aria-label="Select User" value={task.user} onChange={(e) => setTask({...task, user:e.target.value})} required>
                <option value>Select user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                ))}
                </select>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputTask" className="form-label">Task</label>
                <input type="text" className="form-control" id="inputTask" value={task.task} onChange={(e) => setTask({...task, task:e.target.value})} />
            </div>
            <div className="col-md-12">
                <label htmlFor="inputDescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="inputDescription" value={task.description} onChange={(e) => setTask({...task, description:e.target.value})} />
            </div>
            <div className="col-6">
                <label htmlFor="inputDeadline" className="form-label">Due Date</label>
                <input type="date" className="form-control" id="inputDeadline" value={task.deadline} onChange={(e) => setTask({...task, deadline:e.target.value})} />
            </div>
            <div className="col-12">
                {loading && <LoadingIndicator />}
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Assign Task</button>
            </div>
        </form>
    );
};

export default NewTask;