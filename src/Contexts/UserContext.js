import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    return (
        <UserContext.Provider value={{isAuthenticated, setIsAuthenticated, userType, setUserType, borrowedBooks, setBorrowedBooks}}>
            {props.children}
        </UserContext.Provider>
    )
};
