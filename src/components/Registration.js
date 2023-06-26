import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const Registration = () => {
    const { users, setUsers, setUserType, borrowedBooks, setBorrowedBooks } = useContext(UserContext);
    const image1 = "https://cdn.pixabay.com/photo/2016/04/01/12/11/avatar-1300582_1280.png";
    const image2 = "https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_1280.png";
    const image3 = "https://cdn.pixabay.com/photo/2016/03/31/20/31/amazed-1295833_1280.png";
    const image4 = "https://cdn.pixabay.com/photo/2016/03/31/20/11/avatar-1295575_1280.png";
    const [selectedImage, setSelectedImage] = useState(null);
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

        setUsers([...users, {username, password, email, dateOfBirth, avatar: selectedImage, userType:'czytelnik', borrowedBooks:[]}]);
        setIsRegistering(false);
        alert("Pomyślnie zarejestrowano, teraz możesz się zalogować");
        setUsername('');
        setPassword('');
        setEmail('');
        setDateOfBirth('');
        navigate("/Login");
        setBorrowedBooks([]);
    }

    return (
        <div className={"container mt-0"}>
            <div className="card" style={{maxWidth: "780px", margin: "auto"}}>
                <div className="card-header text-center" style={{ margin: "0" }}>
                    <h2>Rejestracja</h2>
                </div>
                <div className="card-body">
                    <form>
                        <div>
                            <label>Wybierz avatar:</label> <br/> <br/>
                            <div className="row mb-0">
                                <div className="col">
                                    <img src={image1} alt="Avatar 1" className={`img-thumbnail ${selectedImage === image1 ? 'selected' : ''}`} style={{width: "50px", height: "50px"}} onClick={() => setSelectedImage(image1)}/>
                                </div>
                                <div className="col">
                                    <img src={image2} alt="Avatar 2" className={`img-thumbnail ${selectedImage === image2 ? 'selected' : ''}`} style={{width: "50px", height: "50px"}} onClick={() => setSelectedImage(image2)}/>
                                </div>
                                <div className="col">
                                    <img src={image3} alt="Avatar 3" className={`img-thumbnail ${selectedImage === image3 ? 'selected' : ''}`} style={{width: "50px", height: "50px"}} onClick={() => setSelectedImage(image3)}/>
                                </div>
                                <div className="col">
                                    <img src={image4} alt="Avatar 4" className={`img-thumbnail ${selectedImage === image4 ? 'selected' : ''}`} style={{width: "50px", height: "50px"}} onClick={() => setSelectedImage(image4)}/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <label className="form-label">Nazwa użytkownika:</label>
                            <input
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Nazwa użytkownika"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label className="form-label">Hasło:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Hasło"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-0">
                            <label>Powtórz hasło:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Potwierdź Hasło"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>Podaj e-mail:</label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>Podaj datę urodzenia:</label>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={e => setDateOfBirth(e.target.value)}
                                placeholder="Data urodzenia"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>Podaj miasto:</label>
                            <input
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                placeholder="Miejscowość"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>Podaj ulicę:</label>
                            <input
                                value={street}
                                onChange={e => setStreet(e.target.value)}
                                placeholder="Ulica"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>Podaj numer domu</label>
                            <input
                                value={houseNumber}
                                onChange={e => setHouseNumber(e.target.value)}
                                placeholder="Numer domu"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
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
                        <div style={{margin: "auto"}}>
                            <button className="btn btn-success btn-block mt-2" style={{ padding: "10px", fontSize: "18px" }} onClick={(e) => { e.preventDefault(); handleRegister(); }}>
                                Zarejestruj
                            </button>
                            <Link to="/Login">
                                <button className="btn btn-secondary btn-block mt-2" style={{ padding: "10px", fontSize: "18px" }} onClick={() => setIsRegistering(false)}>
                                    Wróć do logowania
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Registration;