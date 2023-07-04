import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { AdminContext } from '../Contexts/AdminContext';
import { AboutUsContext } from '../Contexts/AboutUsContext';
import '../AboutUs.css';
const AboutUs = () => {
    const { adminIsLoggedIn, isEditing,setIsEditing, handleEditText } = useContext(AdminContext);
    const { text, setText } = useContext(AboutUsContext);
    const [editedText, setEditedText] = useState(text);

    const handleSaveClick = () => {
        setText(editedText);
        setIsEditing(false);
        setEditedText(text);
    };

    return (
        <div className="container py-0" id="AboutUs-container">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">SmartLibrary!</h2>
                            {adminIsLoggedIn && isEditing ? (
                                <>
                  <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="form-control mb-4"
                  />
                                    <button onClick={handleSaveClick} className="btn btn-primary btn-md me-2">
                                        Zapisz
                                    </button>
                                    <button onClick={() => setEditedText(text)} className="btn btn-secondary btn-md">
                                        Anuluj
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="card-text">{text}</p>
                                    {adminIsLoggedIn && (
                                        <button onClick={handleEditText} className="btn btn-primary btn-md">
                                            Edytuj
                                        </button>
                                    )}
                                </>
                            )}
                            <Link to="/Registration">
                                <button className="btn btn-primary btn-md">Join Us</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
