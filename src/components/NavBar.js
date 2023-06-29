import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminContext } from '../AdminContext';

const NavBar = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
    const { adminIsLoggedIn, setAdminIsLoggedIn, handleAdminLogout} = useContext(AdminContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsAuthenticated(false);
        handleAdminLogout();
        alert("Wylogowano pomyślnie");
        navigate('/Home');
    };

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
                                <Link to="/Contests" className="dropdown-item">Konkursy</Link>
                                <Link to="/TermsOfUse" className="dropdown-item">Terms of use</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to="/Contact" className="nav-link">Contact</Link>
                        </li>
                        { isAuthenticated  || adminIsLoggedIn ? (
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Books
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to="/Browse" className="dropdown-item">Browse</Link>
                                        <Link to="/BorrowedBooks" className="dropdown-item">Borrowed books</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to="/DiscussionFOrum" className="nav-link"> Forum dyskusyjne</Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
                                </li>
                            </>
                        ) :  (
                            <>
                                <li className="nav-item">
                                    <Link to="/Login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Registration" className="nav-link">Register</Link>
                                </li>
                            </>
                        )
                        }
                        {adminIsLoggedIn && (
                            <li className="nav-item">
                                <Link to="/AddAdmin" className="nav-link">Add Admin</Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link to="/UserProfile" className="nav-link">User Profile</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};


export default NavBar;
