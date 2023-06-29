import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BranchesContext } from '../BranchesContext';
import { AdminContext } from '../AdminContext';

const Branches = () => {
    const { newsData, updateNewsData } = useContext(BranchesContext);
    const { adminIsLoggedIn, isEditing, handleEditText, handleSaveText } = useContext(AdminContext);

    const [expandedCards, setExpandedCards] = useState([]);

    const toggleCardExpansion = (index) => {
        if (expandedCards.includes(index)) {
            setExpandedCards(expandedCards.filter((cardIndex) => cardIndex !== index));
        } else {
            setExpandedCards([...expandedCards, index]);
        }
    };

    const handleTextUpdate = (index, newText) => {
        const updatedData = [...newsData];
        updatedData[index].description = newText;
        updateNewsData(updatedData);
    };

    const handleEditClick = (index) => {
        handleEditText();
        setExpandedCards([index]);
    };

    const handleSaveClick = () => {
        handleSaveText(newsData);
        setExpandedCards([]);
    };

    return (
        <div className="container">
            <div className="row">
                {newsData.map((branch, index) => (
                    <div key={index} className="col-md-3 mb-6">
                        <div className="card h-100" style={{ maxWidth: "300px", margin: "auto" }}>
                            <img className="card-img-top" src={branch.image} alt="Branch" style={{ width: '100%', maxHeight: '200px' }} />
                            <div className="card-body">
                                <h4 className="card-title">{branch.address}</h4>
                                {adminIsLoggedIn && expandedCards.includes(index) && isEditing ? (
                                    <form>
                                        <textarea
                                            className="form-control"
                                            value={branch.description}
                                            onChange={(e) => handleTextUpdate(index, e.target.value)}
                                        ></textarea>
                                        <div className="btn-group mt-2">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleSaveClick()}
                                            >
                                                Zapisz
                                            </button>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => setExpandedCards([])}
                                            >
                                                Anuluj
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        {branch.description.length > 100 ? (
                                            <>
                                                <p className="card-text">
                                                    {expandedCards.includes(index)
                                                        ? branch.description
                                                        : branch.description.substring(0, 100) + '...'}
                                                </p>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => toggleCardExpansion(index)}
                                                >
                                                    {expandedCards.includes(index) ? 'Zwiń' : 'Rozwiń'}
                                                </button>
                                            </>
                                        ) : (
                                            <p className="card-text">{branch.description}</p>
                                        )}
                                    </>
                                )}
                                {adminIsLoggedIn && !expandedCards.includes(index) && !isEditing && (
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={() => handleEditClick(index)}
                                    >
                                        Edytuj
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Branches;
