import './App.css';
import React, {useState} from "react";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { UserContext } from './UserContext';
import Registration from './components/Registration';
import Login from "./components/Login";
import News from './components/News';
import Branchces from './components/Branchces'
import AboutUs  from "./components/AboutUs";
import Home from "./components/Home"
import SuggestBook from "./components/SuggestBook";
import UserProfile from "./components/UserProfile";
import Contact from "./components/Contact";
import TermsOfUse from "./components/TermsOfUse";
import Browse from "./components/Browse";
import BorrowedBooks from "./components/BorrowedBooks";
import Contests from "./components/Contests";
import Discussion from "./components/DiscussionForum";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AddAdmin from "./components/AddAdmin";
import {BooksProvider} from './BooksContext';
import PostsContext from './PostsContext';
import {AdminProvider} from "./AdminContext";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [userType, setUserType] = useState("");
    const [books, setBooks] = useState([])
    const [posts, setPosts] = useState([]);
    return (
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, users, setUsers, loggedInUser, setLoggedInUser}}>
            <BooksProvider value={{books, setBooks}}>
                <PostsContext.Provider value={{ posts, setPosts }}>
                    <Router>
                            <AdminProvider>
                            <div>
                                <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="Home" element={<Home />} />
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
                                    <Route path="/BorrowedBooks" element={<BorrowedBooks />} />
                                    <Route path="/Contests" element={<Contests />} />
                                    <Route path="/DiscussionForum" element={<Discussion />} />
                                    <Route path="/Footer" element={<Footer />} />
                                    <Route path="/AdminLogin" element={<AdminLogin />} />
                                    <Route path="/AddAdmin" element={<AddAdmin />} />
                                </Routes>
                                <Footer/>
                            </div>
                            </AdminProvider>
                    </Router>
                </PostsContext.Provider>
            </BooksProvider>
        </UserContext.Provider>

    );

}

export default App;