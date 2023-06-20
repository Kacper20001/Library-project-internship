import './App.css';
import React, {useState} from "react";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Registration from './components/Registration';
import Login from "./components/Login";
import News from './components/News';
import Branchces from './components/Branchces'
import AboutUs  from "./components/AboutUs";
import Home from "./components/Home"
import SuggestBook from "./components/SuggestBook";
import UserProfile from "./components/UserProfile";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const handleLogout = () => {
        setIsAuthenticated(false);
        alert("Wylogowano pomyślnie");
    }

    return (
        <Router>
            <div>
                <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
                <Routes>
                    <Route path="Home" element={<Home />} />
                    <Route path="/UserProfile" element={<UserProfile />} />
                    <Route path="/Branchces" element={<Branchces />} />
                    <Route path="/Login" element={<Login users={users} setUsers={setUsers} setIsAuthenticated={setIsAuthenticated} setLoggedInUser={setLoggedInUser} />} />
                    <Route path="/Registration" element={<Registration users={users} setUsers={setUsers} />} />
                    <Route path="/News" element={<News />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/SuggestBook" element={<SuggestBook />} />
                </Routes>
            </div>
        </Router>
    );

}

export default App;
