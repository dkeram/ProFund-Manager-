import { Outlet, useLocation, Link } from 'react-router-dom';
import { useClient } from '../providers/ClientProvider';
import { useUser } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';

function Layout() {
    const {user} = useUser();
    const userId = user ? user.id : null;
    const location = useLocation();
    const { clientId } = useClient();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const HeaderButtons = () => {
        if (currentPath === "/") {
            return (<div className="d-flex justify-content-start">
                        <div className="btn-group me-2">
                            <a href="/new-client"> <button className="btn btn-secondary rounded-pill px-3" type="button">New Client</button> </a>
                        </div>
                        <div className="btn-group me-2">
                            <a href="/new-task"> <button className="btn btn-secondary rounded-pill px-3" type="button">Assign a Task</button> </a>
                        </div>
                     </div>);
        }else if (currentPath.startsWith("/credentials")) {
            return(<div className="d-flex justify-content-start">
                        <div className="btn-group me-2">
                            <button className="btn btn-secondary rounded-pill px-3" type="button" onClick={()=> navigate(-1)}><i className="bi bi-caret-left-fill"></i></button>
                        </div>
                        <div className="btn-group me-2"></div>
                            <Link to="/credentials/new/" state={{client_id:clientId}}> <button className="btn btn-secondary rounded-pill px-3" type="button">Add Credentials</button> </Link> 
                        </div>
            );
        }else if (currentPath.startsWith("/projects")) {
            return (<div className="d-flex justify-content-start">
                        <div className="btn-group me-2">
                            <button className="btn btn-secondary rounded-pill px-3" type="button" onClick={()=> navigate(-1)}><i className="bi bi-caret-left-fill"></i></button>
                        </div>
                        <div className="btn-group me-2"></div>
                            <Link to="/project/new/" state={{client_id:clientId}} > <button className="btn btn-secondary rounded-pill px-3" type="button">New Project</button> </Link>
                        </div>
            );
        }else {
            return (
                    <div className="d-flex justify-content-start">
                        <div className="btn-group me-2">
                            <button className="btn btn-secondary rounded-pill px-3" type="button" onClick={()=> navigate(-1)}><i className="bi bi-caret-left-fill"></i></button>
                        </div>
                        <div className="btn-group me-2">
                            <button className="btn btn-secondary"  onClick={() => {window.location.href=`/`}}><i className="bi bi-house"></i></button>
                        </div>
                    </div>
            );
        };
    };
    return (
            <div className="row">
                <div className="col-md-auto">
                    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{width: "280px", height: "100vh"}}>
                        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <svg className="bi pe-none me-2" width="40" height="32"></svg>
                        <div className="text-center" style={{marginRight: "10px"}}>
                            <img src={Logo} alt="Logo" width="60" height="60"/>
                        </div>
                        <span className="fs-4">ProFund Manager+</span>
                        </a>
                        <hr/>
                        <ul className="nav nav-pills flex-column mb-auto">
                        <li>
                            <Link to="/my-tasks/" state={{user_id:userId}} className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"></svg>
                            <i className="bi bi-list-task"> </i>
                            My Tasks
                            </Link>
                        </li>
                        <li>
                            <a href="*" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"></svg>
                            <i className="bi bi-wallet"> </i>
                            Open Projects
                            </a>
                        </li>
                        <li>
                            <a href="*" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"></svg>
                            <i className="bi bi-wallet-fill"> </i>
                            Completed Projects
                            </a>
                        </li>
                        </ul>
                        <hr/>
                        <div className="dropdown">
                            <a href="*" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg className="bi pe-none me-2" width="16" height="16"></svg>
                                <strong>User</strong>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li><a className="dropdown-item" href="*">Profile</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="/logout">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-start mt-3 me-5">
                            <HeaderButtons />
                        </div>
                    </div>
                    <div className="row">
                        <Outlet />
                    </div>
                </div>
            </div>
    );
};

export default Layout;