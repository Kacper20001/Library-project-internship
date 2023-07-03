import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const SuggestBook = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Card className="p-4">
                        <Card.Title className="text-center mb-4">Let us be better!</Card.Title>
                        <Card.Text className="text-center">
                            If you have an idea for books we should be interested in, let us know.
                        </Card.Text>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={3} placeholder="Justify which book we should choose" />
                            </Form.Group>
                            <Button variant="primary" type="submit" href="mailto:example@domain.com">
                                Click to send an email
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SuggestBook;
