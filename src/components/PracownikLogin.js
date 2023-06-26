import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminProvider, AdminContext } from '../AdminContext';

const PracownikLogin = () => {
    const { adminLogin, setAdminLogin, adminPassword, setAdminPassword } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLoginAdmin = () => {
        if (adminLogin === '12345' && adminPassword === '12345') {
            alert('Zalogowano pomyślnie');
            navigate('/Home');
        } else {
            alert('Niepoprawny login lub hasło');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Logowanie Admina do SmartLibrary</h2>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Kod logowania:</label>
                            <input
                                value={adminLogin}
                                onChange={(e) => setAdminLogin(e.target.value)}
                                placeholder="Nazwa użytkownika"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Hasło:</label>
                            <input
                                type="password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                placeholder="Hasło"
                                className="form-control"
                            />
                        </div>
                        <button type="button" onClick={handleLoginAdmin} className="btn btn-sm btn-primary">
                            Zaloguj
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PracownikLogin;
