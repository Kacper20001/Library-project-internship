import React from 'react';
import { Accordion } from 'react-bootstrap';

const TermsOfUse = () => {
    return (
        <div className="container mx-auto my-4">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Ogólne zasady</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>Przy korzystaniu z naszej strony, prosimy o przestrzeganie obowiązującego prawa.</li>
                            <li>Zabrania się zamieszczania treści o charakterze obraźliwym, niezgodnym z prawem, szkodliwym lub naruszającym prywatność innych użytkowników.</li>
                            <li>Dozwolone jest korzystanie z naszej strony tylko przez osoby pełnoletnie lub z odpowiednim zezwoleniem rodziców/opiekunów.</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Odpowiedzialność</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>Nie ponosimy odpowiedzialności za treści zamieszczane przez użytkowników na naszej stronie.</li>
                            <li>Użytkownik ponosi pełną odpowiedzialność za wszelkie treści, komentarze, linki lub inne materiały, które zamieszcza na naszej stronie.</li>
                            <li>Nie gwarantujemy dokładności, kompletności lub aktualności informacji zamieszczanych na stronie.</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Prawa autorskie</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>Wszystkie prawa autorskie do treści, zdjęć, grafik i innych materiałów zamieszczonych na stronie należą do nas lub zostały nam udostępnione z odpowiednim zezwoleniem.</li>
                            <li>Zabrania się kopiowania, reprodukowania lub dystrybucji treści zamieszczonych na stronie bez naszej zgody.</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
export default TermsOfUse;
