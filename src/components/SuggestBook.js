import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const SuggestBook = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Card className="p-4">
                        <Card.Title className="text-center mb-4">Pozwól nam być lepszymi!</Card.Title>
                        <Card.Text className="text-center">
                            Jeżeli masz pomysł na książki, którymi powinniśmy się zainteresować to daj nam znać.
                        </Card.Text>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={3} placeholder="Uzasdnij jaką książkę powinniśmy wybrać" />
                            </Form.Group>
                            <Button variant="primary" type="submit" href="mailto:example@domain.com">
                                Kliknij, aby wysłać e-mail
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SuggestBook;
