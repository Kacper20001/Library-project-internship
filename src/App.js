import './App.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContext, UserProvider } from './UserContext';
import { AdminContext, AdminProvider } from './AdminContext';
import Registration from './components/Registration';
import Login from './components/Login';
import News from './components/News';
import Branchces from './components/Branchces';
import AboutUs from './components/AboutUs';
import Home from './components/Home';
import SuggestBook from './components/SuggestBook';
import UserProfile from './components/UserProfile';
import Contact from './components/Contact';
import TermsOfUse from './components/TermsOfUse';
import Browse from './components/Browse';
import PracownikLogin from './components/PracownikLogin';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [userType, setUserType] = useState("");
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    return (
        <UserProvider value={{ isAuthenticated, setIsAuthenticated, users, setUsers, loggedInUser, setLoggedInUser, borrowedBooks, setBorrowedBooks }}>
            <AdminProvider>
                <Router>
                    <div>
                        <Link to="/PracownikLogin">
                            <button>Pracownik</button>
                        </Link>
                        <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/Home" element={<Home />} />
                            <Route path="/UserProfile" element={<UserProfile loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} users={users} setUsers={setUsers} />} />
                            <Route path="/Branchces" element={<Branchces />} />
                            <Route path="/Login" element={<Login users={users} setUsers={setUsers} setIsAuthenticated={setIsAuthenticated} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />} />
                            <Route path="/Registration" element={<Registration users={users} setUsers={setUsers} />} />
                            <Route path="/News" element={<News />} />
                            <Route path="/AboutUs" element={<AboutUs />} />
                            <Route path="/SuggestBook" element={<SuggestBook />} />
                            <Route path="/Contact" element={<Contact />} />
                            <Route path="/TermsOfUse" element={<TermsOfUse />} />
                            <Route path="/Browse" element={<Browse />} />
                            <Route path="/PracownikLogin" element={<PracownikLogin />} />
                        </Routes>
                    </div>
                </Router>
            </AdminProvider>
        </UserProvider>
    );
}

export default App;
