import React from 'react';
import { Accordion } from 'react-bootstrap';
import '../TermsOfUse.css';

const TermsOfUse = () => {
    return (
        <div className="container" id="TermsOfUse-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>General rules</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>Please comply with applicable laws when using our site.</li>
                            <li>It is forbidden to post content that is offensive, unlawful, harmful or violates the privacy of other users.</li>
                            <li>It is allowed to use our website only by adults or with the appropriate permission of parents / guardians.</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Responsibility</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>We are not responsible for the content posted by users on our site.</li>
                            <li>You are fully responsible for any content, comments, links or other material you post on our site.</li>
                            <li>We do not guarantee the accuracy, completeness or timeliness of the information on the site.</li></ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Copyright</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li>All copyrights to the content, photos, graphics and other materials posted on the site belong to us or have been made available to us with the appropriate permission.</li>
                            <li>It is forbidden to copy, reproduce or distribute the content posted on the site without our consent.</li> </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
export default TermsOfUse;
