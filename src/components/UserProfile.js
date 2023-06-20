import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = ({loggedInUser, setUsers, users, setLoggedInUser}) => {
    const {username = '', email = '', dateOfBirth = '', role = ''} = loggedInUser || {};

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if(loggedInUser.password === oldPassword) {
            if(newPassword === confirmPassword) {
                setUsers(users.map(user =>
                    user.username === loggedInUser.username ? {...user, password: newPassword} : user
                ));
                setLoggedInUser({ ...loggedInUser, password: newPassword }); // Update loggedInUser
                alert('Hasło zostało pomyślnie zmienione');
            } else {
                alert('Nowe hasło nie pasuje do potwierdzenia');
            }
        } else {
            alert('Stare hasło jest nieprawidłowe');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Profil użytkownika</h1>
            <div className="mb-3">
                <label className="form-label">Nazwa użytkownika:</label>
                <p>{username}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <p>{email}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Data urodzenia:</label>
                <p>{dateOfBirth}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Typ użytkownika:</label>
                <p>{role}</p>
            </div>
            <div>
                <h3>Zmień hasło</h3>
                <div className="mb-3">
                    <label className="form-label">Stare hasło:</label>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nowe hasło:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Potwierdź nowe hasło:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" />
                </div>
                <button className="btn btn-primary" onClick={handleChangePassword}>Zmień hasło</button>
            </div>
        </div>
    );
};

export default UserProfile;
