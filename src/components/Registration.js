import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from "react-router-dom";

const Registration = ({users, setUsers}) => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [region, setRegion] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [userType, setUserType] = useState("");

    const validateEmail = (email) => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const navigate = useNavigate();
    const handleRegister = () => {
        if (!username || !password || !confirmPassword || !email || !dateOfBirth || !city || !street || !houseNumber || !region) {
            alert('Proszę wypełnić wszystkie pola');
            return;
        }

        if (password !== confirmPassword) {
            alert('Hasła nie są identyczne');
            return;
        }

        if (!validateEmail(email)) {
            alert('Nieprawidłowy format email');
            return;
        }

        setUsers([...users, {username, password, role: userType, email, dateOfBirth}]);
        setIsRegistering(false);
        alert("Pomyślnie zarejestrowano, teraz możesz się zalogować");
        setUsername('');
        setPassword('');
        setEmail('');
        setDateOfBirth('');
        navigate("/Login")
    }

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
                <div className="mb-3">
                <label>Powtórz hasło:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Potwierdź Hasło"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                <label>Podaj e-mail:</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                <label>Podaj datę urodzenia:</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={e => setDateOfBirth(e.target.value)}
                        placeholder="Data urodzenia"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                <label>Podaj miasto:</label>
                    <input
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Miejscowość"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                <label>Podaj ulicę:</label>
                    <input
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                        placeholder="Ulica"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                <label>Podaj numer domu</label>
                    <input
                        value={houseNumber}
                        onChange={e => setHouseNumber(e.target.value)}
                        placeholder="Numer domu"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                <label>Podaj województwo:</label>
                    <select
                        className="form-control"
                        value={region}
                        onChange={e => setRegion(e.target.value)}
                    >   <option value=''>Wybierz województwo</option>
                        <option value="dolnoslaskie">Dolnośląskie</option>
                        <option value="kujawsko_pomorskie">Kujawsko-Pomorskie</option>
                        <option value="lubelskie">Lubelskie</option>
                        <option value="lubuskie">Lubuskie</option>
                        <option value="lodzkie">Łódzkie</option>
                        <option value="malopolskie">Małopolskie</option>
                        <option value="mazowieckie">Mazowieckie</option>
                        <option value="opolskie">Opolskie</option>
                        <option value="podkarpackie">Podkarpackie</option>
                        <option value="podlaskie">Podlaskie</option>
                        <option value="pomorskie">Pomorskie</option>
                        <option value="slaskie">Śląskie</option>
                        <option value="swietokrzyskie">Świętokrzyskie</option>
                        <option value="warminsko_mazurskie">Warmińsko-Mazurskie</option>
                        <option value="wielkopolskie">Wielkopolskie</option>
                        <option value="zachodniopomorskie">Zachodniopomorskie</option>
                    </select>
                </div>
                <button onClick={(e) => {e.preventDefault(); handleRegister();}} className="btn btn-primary me-2">Zarejestruj</button>
                <Link to="/Login">
                <button className="btn btn-secondary" onClick={() => setIsRegistering(false)}>Wróć do logowania</button>
                </Link>
                </form>
        </div>
    );
};

export default Registration;
