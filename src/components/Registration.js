import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { BooksContext } from '../Contexts/BooksContext';

const Registration = () => {
    const { users, setUsers, setUserType } = useContext(UserContext);
    const {books, setBooks} = useContext(BooksContext);


    // const image1 = "https://cdn.pixabay.com/photo/2016/04/01/12/11/avatar-1300582_1280.png";
    // const image2 = "https://cdn.pixabay.com/photo/2016/03/31/20/27/avatar-1295773_1280.png";
    // const image3 = "https://cdn.pixabay.com/photo/2016/03/31/20/31/amazed-1295833_1280.png";
    // const image4 = "https://cdn.pixabay.com/photo/2016/03/31/20/11/avatar-1295575_1280.png";
    // const [selectedImage, setSelectedImage] = useState(null);
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
            alert('Please complete all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('The passwords are not identical');
            return;
        }

        if (!validateEmail(email)) {
            alert('Invalid email format');
            return;
        }

        // setUsers([...users, {username, password, email, dateOfBirth, avatar: selectedImage, userType:'czytelnik', borrowedBooks:[] }]);
        setUsers([...users, {username, password, email, dateOfBirth, userType:'czytelnik', borrowedBooks:[] }]);
        setIsRegistering(false);
        alert("You have successfully registered, now you can login");
        setUsername('');
        setPassword('');
        setEmail('');
        setDateOfBirth('');
        navigate("/Login");

    }

    return (
        <div className={"container mt-0"}>
            <div className="card" style={{maxWidth: "500px", margin: "auto"}}>
                <div className="card-header text-center" style={{ margin: "0" }}>
                    <h2>Rejestracja</h2>
                </div>
                <div className="card-body">
                    <form>
                        {/*<div>*/}
                        {/*    <label>Choose an avatar:</label> <br/> <br/>*/}
                        {/*    <div className="row mb-0">*/}
                        {/*        <div className="col">*/}
                        {/*            <img src={image1} alt="Avatar 1" className={`img-thumbnail ${selectedImage === image1 ? 'selected' : ''}`} style={{width: "50px", height: "50px"}} onClick={() => setSelectedImage(image1)}/>*/}
                        {/*        </div>*/}
                        {/*        <div className="col">*/}
                        {/*            <img src={image2} alt="Avatar 2" className={`img-thumbnail ${selectedImage === image2 ? 'selected' : ''}`} style={{width: "50px", height: "50px"}} onClick={() => setSelectedImage(image2)}/>*/}
                        {/*        </div>*/}
                        {/*        <div className="col">*/}
                        {/*            <img src={image3} alt="Avatar 3" className={`img-thumbnail ${selectedImage === image3 ? 'selected' : ''}`} style={{width: "50px", height: "50px"}} onClick={() => setSelectedImage(image3)}/>*/}
                        {/*        </div>*/}
                        {/*        <div className="col">*/}
                        {/*            <img src={image4} alt="Avatar 4" className={`img-thumbnail ${selectedImage === image4 ? 'selected' : ''}`} style={{width: "50px", height: "50px"}} onClick={() => setSelectedImage(image4)}/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="mb-1">
                            <label className="form-label">Username:</label>
                            <input
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Username"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-0">
                            <label>Confirm password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>Email::</label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>Date of birth:</label>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={e => setDateOfBirth(e.target.value)}
                                placeholder="Data urodzenia"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>City:</label>
                            <input
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                placeholder="City"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>Street:</label>
                            <input
                                value={street}
                                onChange={e => setStreet(e.target.value)}
                                placeholder="Street"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>House number</label>
                            <input
                                value={houseNumber}
                                onChange={e => setHouseNumber(e.target.value)}
                                placeholder="House number"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-1">
                            <label>Province:</label>
                            <select
                                className="form-control"
                                value={region}
                                onChange={e => setRegion(e.target.value)}
                            >   <option value=''>Select a province</option>
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
                                Register
                            </button>
                            <Link to="/Login">
                                <button className="btn btn-secondary btn-block mt-2" style={{ padding: "10px", fontSize: "18px" }} onClick={() => setIsRegistering(false)}>
                                    Go back to login
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