import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NavBar = ({ isAuthenticated, handleLogout }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Smart Library</a>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/Home" className={"nav-link"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/News" className="nav-link">News</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/AboutUs" className="nav-link">About us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Branchces" className="nav-link">Branchces</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                For the reader
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/SuggestBook" className="dropdown-item">Suggest a book</Link>
                                <a className="dropdown-item" href="#">Contests</a>
                                <a className="dropdown-item" href="#">Discussion forum</a>
                                <a className="dropdown-item" href="#">Terms of use</a>
                            </div>
                        </li>
                        { isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/UserProfile" className="nav-link">User Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/Login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Registration" className="nav-link">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
