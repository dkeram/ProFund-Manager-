import { useEffect,useState } from 'react';
import { useUser } from '../providers/UserProvider';
import LoadingIndicator from '../components/LoadingIndicator';
import api from '../api';


function UserProfile() {
    const { user } = useUser();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && profile === null) {
            setProfile(user);
        }
    }, [user, profile]);

    if (!user || !profile) {
        return <LoadingIndicator />;
    }

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.patch(`/api/user/edit/${user.id}/`, profile);
            alert("User updated successfully!");
            setLoading(false);
        } catch (error) {
            alert("Error updating User: " + error.message);
            setLoading(false);
        }
    };

    return (
<form onSubmit={handleSubmit} className="row g-3">
            <h1 className="text-center h1 mb-3 fw-normal">Edit User Profile</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <label htmlFor="inputUsername" className="form-label">UserName</label>
                    <input className="form-control" type="text" name="username" value={profile.username || ''} onChange={handleChange} placeholder="username" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputFirst_name" className="form-label">FirstName</label>
                    <input className="form-control" type="text" name="first_name" value={profile.first_name || ''} onChange={handleChange} placeholder="firstName" />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <label htmlFor="inputLast_name" className="form-label">LastName</label>
                    <input className="form-control" type="text" name="last_name" value={profile.last_name || ''} onChange={handleChange} placeholder="lastName" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail" className="form-label">E-mail</label>
                    <input className="form-control" type="text" name="email" value={profile.email || ''} onChange={handleChange} placeholder="email" />
                </div>
            </div>
            <div className="col-12 text-center">
                <button className="btn btn-primary" type="submit">Update Profile</button>
                {loading && <LoadingIndicator />}
                <h5>*If you want to change your password you must contact with Administrator <a href="#">here</a></h5>
            </div>
        </form>
    ); 

};



export default UserProfile;