import React, { createContext, useState } from 'react';
import {useNavigate} from "react-router-dom";

export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
    const [adminLogin, setAdminLogin] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const handleEditText = () => {
        setIsEditing(true);
    };
    const handleSaveText = (newText) => {
        setIsEditing(false);
    };
    const handleAdminLogin = () => {
        if (adminLogin === '1234' && adminPassword === '1234') {
            alert("Pomyślnie zalogowano")
            setAdminIsLoggedIn(true);
            navigate('/Home')
        } else {
            alert("Błędne dane")
            setAdminIsLoggedIn(false);
        }
    };
    const handleAdminLogout = () => {
        setAdminIsLoggedIn(false);
        setAdminLogin('');
        setAdminPassword('');
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
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};