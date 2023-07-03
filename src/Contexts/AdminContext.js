import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
    const [adminLogin, setAdminLogin] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [admins, setAdmins] = useState([]); // Nowa tablica admins
    const navigate = useNavigate();

    const handleEditText = () => {
        setIsEditing(true);
    };

    const handleSaveText = (newText) => {
        setIsEditing(false);
    };

    const handleAdminLogin = () => {
        const admin = admins.find((admin) => admin.login === adminLogin && admin.password === adminPassword);
        if (admin) {
            alert('Pomyślnie zalogowano');
            setAdminIsLoggedIn(true);
            navigate('/Home');
        } else {
            alert('Błędne dane');
            setAdminIsLoggedIn(false);
        }
    };


    const handleAdminLogout = () => {
        setAdminIsLoggedIn(false);
        setAdminLogin('');
        setAdminPassword('');
    };

    const addAdmin = (newAdminLogin, newAdminPassword) => {
        const newAdmin = {
            login: newAdminLogin,
            password: newAdminPassword,
        };
        setAdmins([...admins, newAdmin]);
    };

    return (
        <AdminContext.Provider
            value={{
                adminLogin,
                setAdminLogin,
                adminPassword,
                setAdminPassword,
                adminIsLoggedIn,
                handleAdminLogin,
                handleAdminLogout,
                isEditing,
                setIsEditing,
                handleEditText,
                handleSaveText,
                addAdmin,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
