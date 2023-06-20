import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const SuggestBook = () => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h2 className="text-center">Pozwól nam być lepszymi!</h2>
                    <p className="text-center">Jeżeli masz pomysł na książki, którymi powinniśmy się zainteresować to daj nam znać.</p>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} placeholder="Uzasdnij jaką książkę i dlaczego powinniśmy wybrać"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" href="mailto:example@domain.com">
                            Kliknij, aby wysłać e-mail
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SuggestBook;
