import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-light">
            <div className="container py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-center">Smart Library</h5>
                    <Link to="/AdminLogin">
                        <button className="btn btn-outline-light">Admin Login</button>
                    </Link>
                </div>
                <p className="text-center">Jesteśmy firmą dostarczającą książki od 2023 roku. Naszym celem jest promowanie czytelnictwa na całym świecie.</p>
                <div className="row text-center">
                    <div className="col-md-4">
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/Home" className="text-light">Home</Link>
                            </li>
                            <li>
                                <Link to="/AboutUs" className="text-light">About us</Link>
                            </li>
                            <li>
                                <Link to="/Branchces" className="text-light">Branchces</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/News" className="text-light">News</Link>
                            </li>
                            <li>
                                <Link to="/SuggestBook" className="text-light">Suggest a book</Link>
                            </li>
                            <li>
                                <Link to="/Contests" className="text-light">Konkursy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/Login" className="text-light">Login</Link>
                            </li>
                            <li>
                                <Link to="/Registration" className="text-light">Register</Link>
                            </li>
                            <li>
                                <Link to="/Contact" className="text-light">Contact</Link>
                            </li>
                            <li>
                                <Link to="/TermsOfUse" className="text-light">Terms of use</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
