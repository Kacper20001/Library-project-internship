import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = ({loggedInUser}) => {
    return (
        <div className="container">
            <h1>Profil Użytkownika</h1>
            <h2>Imię: {loggedInUser.firstName}</h2>
            <h2>Nazwisko: {loggedInUser.lastName}</h2>
            <h2>Email: {loggedInUser.email}</h2>
            <h2>Data urodzenia: {loggedInUser.Date}</h2>
        </div>
    );
};

export default UserProfile;