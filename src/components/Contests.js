import React, { useContext, useState } from 'react';
import { AdminContext } from '../AdminContext';
import { ContestsContext } from "../ContestsContext";
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';

const Contests = () => {
    const { adminIsLoggedIn } = useContext(AdminContext);
    const { contestsData, updateContestsData, addContest, deleteContest } = useContext(ContestsContext);
    const [newContestTitle, setNewContestTitle] = useState('');
    const [newContestDescription, setNewContestDescription] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingDescription, setEditingDescription] = useState('');
    const [editingDeadline, setEditingDeadline] = useState('');

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setEditingTitle(contestsData[index].title);
        setEditingDescription(contestsData[index].description);
        setEditingDeadline(contestsData[index].deadline);
    };

    const handleSaveClick = () => {
        const updatedContests = {
            title: editingTitle,
            description: editingDescription,
            deadline: editingDeadline
        };
        updateContestsData(editingIndex, updatedContests);
        setEditingIndex(null);
        setEditingTitle('');
        setEditingDescription('');
        setEditingDeadline('');
    };

    const handleDeleteClick = (index) => {
        deleteContest(index);
        if (index === editingIndex) {
            setEditingIndex(null);
            setEditingTitle('');
            setEditingDescription('');
            setEditingDeadline('');
        }
    };

    const handleAddContest = () => {
        const newContest = {
            title: newContestTitle,
            description: newContestDescription,
            deadline: ''
        };
        addContest(newContest);
        setNewContestTitle('');
        setNewContestDescription('');
    };

    const contestsCards = contestsData.map((contest, index) => (
        <div className="card" key={index}>
            <div className="card-body">
                <h5 className="card-title">{contest.title}</h5>
                <p className="card-text">{contest.description}</p>
                <p className="card-deadline">Termin zgłoszeń: {contest.deadline}</p>
            </div>
        </div>
    ));

    return (
        <Container>
            <Row>
                {contestsData.map((contest, index) => (
                    <Col md={6} key={index}>
                        <Card className="mb-4">
                            <Card.Body>
                                {adminIsLoggedIn && index === editingIndex ? (
                                    <>
                                        <Form.Group controlId="formContestTitle">
                                            <Form.Label>Tytuł</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editingTitle}
                                                onChange={(e) => setEditingTitle(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formContestDescription">
                                            <Form.Label>Opis</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                value={editingDescription}
                                                onChange={(e) => setEditingDescription(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formContestDeadline">
                                            <Form.Label>Termin zgłoszeń</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editingDeadline}
                                                onChange={(e) => setEditingDeadline(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" onClick={handleSaveClick}>
                                            Zapisz
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Card.Title>{contest.title}</Card.Title>
                                        <Card.Text>{contest.description}</Card.Text>
                                        <Card.Text>Termin zgłoszeń: {contest.deadline}</Card.Text>
                                    </>
                                )}

                                {adminIsLoggedIn && (
                                    <>
                                        {index === editingIndex ? (
                                            <Button variant="secondary" onClick={() => setEditingIndex(null)}>
                                                Anuluj
                                            </Button>
                                        ) : (
                                            <Button variant="secondary" onClick={() => handleEditClick(index)}>
                                                Edytuj
                                            </Button>
                                        )}

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
                                <Form.Group controlId="formNewContestTitle">
                                    <Form.Label>Tytuł</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newContestTitle}
                                        onChange={(e) => setNewContestTitle(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formNewContestDescription">
                                    <Form.Label>Opis</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={newContestDescription}
                                        onChange={(e) => setNewContestDescription(e.target.value)}
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
