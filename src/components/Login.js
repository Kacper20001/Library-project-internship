import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import '../Login.css';
const Login = () => {
    const { users, setIsAuthenticated, setLoggedInUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            setIsAuthenticated(true);
            setLoggedInUser(user);
            navigate('/Home')

        } else {
            alert('Incorrect username or password');
        }
    };

    return (
        <div className="container" id="Login-container">
            <div className="card" style={{maxWidth: "400px", margin: "auto"}}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Login to SmartLibrary</h2>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Username:</label>
                            <input
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Username"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Passwrod"
                                className="form-control"
                            />
                        </div>
                        <button type="button" onClick={handleLogin} className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
