import React from 'react';
import { Accordion, Card, Button, Container, Row, Col } from 'react-bootstrap';


const TermsOfUse = () => {
    return (
        <Container>
            <h1 className="mt-5">Zasady korzystania</h1>

            <Accordion className="mt-4">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Ogólne zasady
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ul>
                                <li>Przy korzystaniu z naszej strony, prosimy o przestrzeganie obowiązującego prawa.</li>
                                <li>Zabrania się zamieszczania treści o charakterze obraźliwym, niezgodnym z prawem, szkodliwym lub naruszającym prywatność innych użytkowników.</li>
                                <li>Dozwolone jest korzystanie z naszej strony tylko przez osoby pełnoletnie lub z odpowiednim zezwoleniem rodziców/opiekunów.</li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Odpowiedzialność
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <ul>
                                <li>Nie ponosimy odpowiedzialności za treści zamieszczane przez użytkowników na naszej stronie.</li>
                                <li>Użytkownik ponosi pełną odpowiedzialność za wszelkie treści, komentarze, linki lub inne materiały, które zamieszcza na naszej stronie.</li>
                                <li>Nie gwarantujemy dokładności, kompletności lub aktualności informacji zamieszczanych na stronie.</li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                            Prawa autorskie
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <ul>
                                <li>Wszystkie prawa autorskie do treści, zdjęć, grafik i innych materiałów zamieszczonych na stronie należą do nas lub zostały nam udostępnione z odpowiednim zezwoleniem.</li>
                                <li>Zabrania się kopiowania, reprodukowania lub dystrybucji treści zamieszczonych na stronie bez naszej zgody.</li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>

            </Accordion>

            <Row className="mt-4">
                <Col>
                    <p className="text-muted">
                        Te zasady korzystania mają na celu zapewnienie bezpiecznego i odpowiedzialnego korzystania z naszej strony. Prosimy o ich przestrzeganie. W przypadku naruszenia tych zasad, zastrzegamy sobie prawo do podjęcia odpowiednich działań, włącznie z ograniczeniem lub usunięciem dostępu do naszej strony.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};
export default TermsOfUse;
