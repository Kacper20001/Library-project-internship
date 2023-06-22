import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
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
            alert('Niepoprawna nazwa użytkownika lub hasło');
        }
    };

    return (
        <div className={"container mt-5"}>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Logowanie do SmartLibrary</h2>
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
            </div>
        </div>
    );
};

export default Login;
