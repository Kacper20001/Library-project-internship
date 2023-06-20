import React, { useState } from "react";
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

const News = ({ role }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [editAnnouncementIndex, setEditAnnouncementIndex] = useState(null);

    const handleAddAnnouncement = () => {
        setAnnouncements([...announcements, newAnnouncement]);
        setNewAnnouncement('');
    };

    const handleEditAnnouncement = (index) => {
        setNewAnnouncement(announcements[index]);
        setEditAnnouncementIndex(index);
    };

    const handleEditApproval = () => {
        let updatedAnnouncements = [...announcements];
        updatedAnnouncements[editAnnouncementIndex] = newAnnouncement;
        setAnnouncements(updatedAnnouncements);
        setNewAnnouncement('');
        setEditAnnouncementIndex(null);
    };

    const handleDeleteAnnouncement = (index) => {
        let updatedAnnouncements = [...announcements];
        updatedAnnouncements.splice(index, 1);
        setAnnouncements(updatedAnnouncements);
    };

    return (
        <Container>
            <h2>News</h2>
            {announcements.map((announcement, i) => (
                <Row key={i}>
                    <Col>{announcement}</Col>
                    {role === 'bibliotekarz' && (
                        <Col>
                            <Button variant="primary" onClick={() => handleEditAnnouncement(i)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDeleteAnnouncement(i)}>Delete</Button>
                        </Col>
                    )}
                </Row>
            ))}
            {role === 'bibliotekarz' && (
                <div>
                    <h2>Add/Edit Announcement</h2>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="New Announcement"
                            aria-label="New Announcement"
                            aria-describedby="basic-addon2"
                            value={newAnnouncement}
                            onChange={e => setNewAnnouncement(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={editAnnouncementIndex === null ? handleAddAnnouncement : handleEditApproval}>
                                {editAnnouncementIndex === null ? "Add Announcement" : "Approve Edit"}
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            )}
        </Container>
    )
}

export default News;
