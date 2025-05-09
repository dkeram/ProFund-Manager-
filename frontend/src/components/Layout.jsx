import React from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useClient } from '../providers/ClientProvider';

function Layout() {
    const location = useLocation();
    const { clientId } = useClient();
    const currentPath = location.pathname;

    const HeaderButtons = () => {
        if (currentPath === "/") {
            return (<a href="/new-client"> <button className="btn btn-secondary rounded-pill px-3" type="button">New Client</button> </a>);
        }else if (currentPath.startsWith("/credentials")) {
            return( <Link to="/credentials/new/" state={{client_id:clientId}}> <button className="btn btn-secondary rounded-pill px-3" type="button">Add Credentials</button> </Link> );
        }else {
            return (<div>Error</div>);
        };
    };


    return (
            <div className="row">
                <div className="col-md-auto">
                    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{width: "280px", height: "2160px"}}>
                        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <svg className="bi pe-none me-2" width="40" height="32"></svg>
                        <span className="fs-4">ProFund Manager+</span>
                        </a>
                        <hr/>
                        <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <a href="/" className="nav-link active" aria-current="page">
                            <svg className="bi pe-none me-2" width="16" height="16"></svg>
                            Home
                            </a>
                        </li>
                        <li>
                            <a href="*" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"></svg>
                            My Tasks
                            </a>
                        </li>
                        <li>
                            <a href="*" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"></svg>
                            Open Fund Projects
                            </a>
                        </li>
                        <li>
                            <a href="list/clients/" className="nav-link text-white">
                            <svg className="bi pe-none me-2" width="16" height="16"></svg>
                            Completed Fund Projects
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
}

export default Layout