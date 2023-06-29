import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminContext } from '../AdminContext';
import { NewsContext } from '../NewsContext';

const News = () => {
    const { adminIsLoggedIn } = useContext(AdminContext);
    const { newsData, updateNewsData } = useContext(NewsContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedNewsData, setEditedNewsData] = useState([...newsData]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        updateNewsData(editedNewsData);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedNewsData([...newsData]);
        setIsEditing(false);
    };

    const handleTitleChange = (index, e) => {
        const updatedNewsData = [...editedNewsData];
        updatedNewsData[index].title = e.target.value;
        setEditedNewsData(updatedNewsData);
    };

    const handleContentChange = (index, e) => {
        const updatedNewsData = [...editedNewsData];
        updatedNewsData[index].content = e.target.value;
        setEditedNewsData(updatedNewsData);
    };

    const newsCards = editedNewsData.map((news, index) => (
        <div className="card" key={index}>
            <div className="card-body">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={news.title}
                            onChange={(e) => handleTitleChange(index, e)}
                            className="form-control mb-2"
                        />
                        <textarea
                            value={news.content}
                            onChange={(e) => handleContentChange(index, e)}
                            className="form-control"
                        />
                    </>
                ) : (
                    <>
                        <h5 className="card-title">{news.title}</h5>
                        <p className="card-text">{news.content}</p>
                    </>
                )}
            </div>
        </div>
    ));

    return (
        <div className="library-news">
            <h3>Aktualności biblioteczne</h3>
            <div className="card-container">{newsCards}</div>
            {adminIsLoggedIn && !isEditing && (
                <button onClick={handleEditClick} className="btn btn-primary btn-md">
                    Edytuj
                </button>
            )}
            {isEditing && (
                <>
                    <button onClick={handleSaveClick} className="btn btn-primary btn-md me-2">
                        Zapisz
                    </button>
                    <button onClick={handleCancelClick} className="btn btn-secondary btn-md">
                        Anuluj
                    </button>
                </>
            )}
        </div>
    );
};

export default News;
