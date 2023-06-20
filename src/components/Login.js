import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
const Login = ({ users, setUsers, setIsAuthenticated, loggedInUser, setLoggedInUser}) => {
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
            alert('Niepoprawna nazwa użytkownika lub hasło');
        }
    };

    return (
        <div className={"container mt-5"}>
            <form>
                <div className="mb-3">
                    <label className="form-label">Nazwa użytkownika:</label>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Nazwa użytkownika"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Hasło:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Hasło"
                        className="form-control"
                    />
                </div>
                <button type="button" onClick={handleLogin} className="btn btn-primary">Zaloguj</button>
            </form>
        </div>
    );
};

export default Login;
