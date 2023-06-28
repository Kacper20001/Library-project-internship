import React, { useState, useRef, useContext } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { BooksContext } from '../BooksContext';
import { UserContext } from '../UserContext';
import { Card, Row, Col, Button } from 'react-bootstrap';
const Browse = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [showBooks, setShowBooks] = useState(false);
    const buttonRefs = useRef({});
    const {loggedInUser, setLoggedInUser, setUsers, users } = useContext(UserContext);
    const {books, setBooks} = useContext(BooksContext);

    const borrowBook = (book) => {
        const updatedUsers = users.map(user => {
            if (user.username === loggedInUser.username) {
                return {
                    ...user,
                    borrowedBooks: [...user.borrowedBooks, book]
                }
            }
            return user;
        });
        const updatedLoggedInUser = updatedUsers.find(user => user.username === loggedInUser.username);
        setUsers(updatedUsers);
        setBooks(books.filter(b => b.id !== book.id));
        setLoggedInUser(updatedLoggedInUser);
    };

    const handleShowHideClick = (row, rowIndex) => {
        setSelectedBook(row);
        setShowBooks(selectedBook !== row || !showBooks);
        window.scrollTo({ top: buttonRefs.current[rowIndex].offsetTop, behavior: 'smooth' });
    };

    const columns = [
        {
            dataField: 'tytul',
            text: 'Title'
        },
        {
            dataField: 'autor',
            text: 'Author'
        },
        {
            dataField: 'gatunek',
            text: 'Genre'
        },
        {
            text: 'Actions',
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return (
                    <>
                        <Button ref={el => buttonRefs.current[rowIndex] = el} onClick={() => handleShowHideClick(row, rowIndex)}>
                            {selectedBook === row && showBooks ? 'Hide' : 'Show'}
                        </Button>
                        {loggedInUser && <Button onClick={() => borrowBook(row)}>Borrow</Button>}
                    </>
                );
            }
        }
    ];

    return (
        <div style={{ marginLeft: '0' }}>
            <BootstrapTable
                keyField='id'
                data={books}
                columns={columns}
                hover
            />
            {selectedBook && showBooks && (
                <Card>
                    <Row className="no-gutters">
                        <Col style={{ maxWidth: '200px', padding: '0' }}>
                            <Card.Img variant="top" src={selectedBook.cover} />
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title>{selectedBook.title}</Card.Title>
                                <Card.Text>{selectedBook.summary}</Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            )}
        </div>
    );
};

export default Browse;