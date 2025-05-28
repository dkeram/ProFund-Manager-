import React, {useState, useEffect} from 'react';
import api from '../api';
import { useLocation } from 'react-router-dom';


function MyTasks() {
    const location = useLocation();
    const [myTasks, setMyTasks] = useState([]);
    const { user_id } = location.state;


    useEffect(() => {
    api.get(`/api/tasks/user/${user_id}/`)
        .then(res => {
            setMyTasks(res.data);
        })
        .catch((error) => {
            alert(error);
        });
    },[user_id]);

    return (
        <>
        <h1>My Tasks</h1>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Client</th>
                    <th scope="col">Project</th>
                    <th scope="col">Status</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Created</th>
                </tr>
            </thead>
            <tbody>
                {myTasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.id}
                            {" "}
                            {task.status === "Completed" ? (
                                <span className="badge bg-success">Completed</span>
                            ): task.status === "In Progress" ? (
                                <span className="badge bg-warning">In Progress</span>
                             ) : (
                                <span className="badge bg-secondary">Pending</span>
                            )}
                        </td>
                        <td>{task.task}</td>
                        <td>{task.description}</td>
                        <td>{task.client}</td>
                        <td>{task.project}</td>
                        <td>{task.status}</td>
                        <td>{task.deadline}</td>
                        <td>{task.created_at}</td>
                        <td>
                            <button className="btn btn-success" onClick={() => {task.status="Completed"}}><i className="bi bi-check"></i></button>
                            <button className="btn btn-danger" onClick={() => {api.delete(`api/task/delete/${task.id}`).then(() => window.location.reload())}}><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default MyTasks;