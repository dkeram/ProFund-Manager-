import React, {useState, useEffect} from 'react';
import api from '../api';


function MyTasks(user_id) {
    const [myTasks, setMyTasks] = useState([]);

    useEffect(() => {
    api.get(`/api/tasks/user/${user_id}`)
        .then(res => {
            setMyTasks(res.data);
        })
        .catch((error) => {
            alert(error);
        });
    },[]);

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
                        <td>{task.id}</td>
                        <td>{task.task}</td>
                        <td>{task.description}</td>
                        <td>{task.client}</td>
                        <td>{task.project}</td>
                        <td>{task.status}</td>
                        <td>{task.deadline}</td>
                        <td>{task.created_at}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default MyTasks;