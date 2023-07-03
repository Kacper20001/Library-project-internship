import React, { useContext, useState } from 'react';
import { AdminContext } from '../Contexts/AdminContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddAdmin = () => {
    const { addAdmin } = useContext(AdminContext);
    const [newAdminLogin, setNewAdminLogin] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addAdmin(newAdminLogin, newAdminPassword);
        setNewAdminLogin('');
        setNewAdminPassword('');
        alert('Pomyślnie dodano nowego admina');
    };

    return (
        <div className="container mt-5">
            <div className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Dodawanie Admina do SmartLibrary</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Kod logowania:</label>
                            <input
                                value={newAdminLogin}
                                onChange={(e) => setNewAdminLogin(e.target.value)}
                                placeholder="Nazwa użytkownika"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Hasło:</label>
                            <input
                                type="password"
                                value={newAdminPassword}
                                onChange={(e) => setNewAdminPassword(e.target.value)}
                                placeholder="Hasło"
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary">
                            Dodaj
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;
