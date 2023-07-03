import React, { useContext, useState } from 'react';
import { AdminContext } from '../Contexts/AdminContext';
import { NewsContext } from '../Contexts/NewsContext';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';

const News = () => {
    const { adminIsLoggedIn } = useContext(AdminContext);
    const { newsData, updateNewsData, addNewsPost, deleteNewsPost } = useContext(NewsContext);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditingText(newsData[index].content);
    };

    const handleSaveClick = () => {
        updateNewsData((prevNewsData) => {
            const updatedNewsData = [...prevNewsData];
            updatedNewsData[editingIndex].content = editingText;
            return updatedNewsData;
        });
        setEditingIndex(null);
        setEditingText('');
    };

    const handleDeleteClick = (index) => {
        deleteNewsPost(index);
        if (index === editingIndex) {
            setEditingIndex(null);
            setEditingText('');
        }
    };

    const handleAddPost = () => {
        const newPost = {
            title: newPostTitle,
            content: newPostContent,
        };
        addNewsPost(newPost);
        setNewPostTitle('');
        setNewPostContent('');
    };

    return (
        <Container>
            <Row>
                {newsData.map((news, index) => (
                    <Col md={6} key={index}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{news.title}</Card.Title>
                                {adminIsLoggedIn && index === editingIndex ? (
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control
                                            as="textarea"
                                            value={editingText}
                                            onChange={(e) => setEditingText(e.target.value)}
                                        />
                                        <Button variant="primary" onClick={handleSaveClick}>
                                            Zapisz
                                        </Button>
                                    </Form.Group>
                                ) : (
                                    <Card.Text>{news.content}</Card.Text>
                                )}
                                {adminIsLoggedIn && (
                                    <>
                                        <Button variant="secondary" onClick={() => handleEditClick(index)}>
                                            Edytuj
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteClick(index)}>
                                            Usuń
                                        </Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {adminIsLoggedIn && (
                <Row>
                    <Col md={6}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Dodaj nowy post</Card.Title>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control
                                        type="text"
                                        value={newPostTitle}
                                        onChange={(e) => setNewPostTitle(e.target.value)}
                                        placeholder="Tytuł"
                                    />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control
                                        as="textarea"
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        placeholder="Treść"
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleAddPost}>
                                    Dodaj post
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default News;
