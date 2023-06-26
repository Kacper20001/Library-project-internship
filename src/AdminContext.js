import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [adminLogin, setAdminLogin] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    return (
        <AdminContext.Provider
            value={{ adminLogin, setAdminLogin, adminPassword, setAdminPassword }}
        >
            {children}
        </AdminContext.Provider>
    );
};