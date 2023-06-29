import React, { useContext, useState } from 'react';
import { AdminContext } from '../AdminContext';
import { ContestsContext } from "../ContestsContext";
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';

const Contests = () => {
    const { adminIsLoggedIn } = useContext(AdminContext);
    const { contestsData, updateContestsData, addContest, editContest, deleteContest } = useContext(ContestsContext);
    const [newContestTitle, setNewContestTitle] = useState('');
    const [newContestDescription, setNewContestDescription] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingDescription, setEditingDescription] = useState('');

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditingDescription(contestsData[index].description);
    };

    const handleSaveClick = () => {
        editContest(editingIndex, {
            ...contestsData[editingIndex],
            description: editingDescription
        });
        setEditingIndex(null);
        setEditingDescription('');
    };

    const handleDeleteClick = (index) => {
        deleteContest(index);
        if (index === editingIndex) {
            setEditingIndex(null);
            setEditingDescription('');
        }
    };

    const handleAddContest = () => {
        const newContest = {
            title: newContestTitle,
            description: newContestDescription,
            deadline: '2023-12-31'
        };
        addContest(newContest);
        setNewContestTitle('');
        setNewContestDescription('');
    };

    return (
        <Container>
            <Row>
                {contestsData.map((contest, index) => (
                    <Col md={6} key={index}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{contest.title}</Card.Title>
                                {adminIsLoggedIn && index === editingIndex ? (
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control
                                            as="textarea"
                                            value={editingDescription}
                                            onChange={(e) => setEditingDescription(e.target.value)}
                                        />
                                        <Button variant="primary" onClick={handleSaveClick}>
                                            Zapisz
                                        </Button>
                                    </Form.Group>
                                ) : (
                                    <>
                                        <Card.Text>{contest.description}</Card.Text>
                                        <Card.Text>Termin zgłoszeń: {contest.deadline}</Card.Text>
                                    </>
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
                                <Card.Title>Dodaj nowy konkurs</Card.Title>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control
                                        type="text"
                                        value={newContestTitle}
                                        onChange={(e) => setNewContestTitle(e.target.value)}
                                        placeholder="Tytuł"
                                    />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control
                                        as="textarea"
                                        value={newContestDescription}
                                        onChange={(e) => setNewContestDescription(e.target.value)}
                                        placeholder="Opis"
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleAddContest}>
                                    Dodaj konkurs
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Contests;
