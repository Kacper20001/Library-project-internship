import React, { useContext, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { UserContext } from '../UserContext';
import { BooksContext } from '../BooksContext';
import { Button, Card, Row, Col } from 'react-bootstrap';

const BorrowedBooks = () => {
    const { loggedInUser, setUsers, users, setLoggedInUser } = useContext(UserContext);
    const { books, setBooks } = useContext(BooksContext);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showBook, setShowBook] = useState(false);

    const returnBook = (book) => {
        const updatedUsers = users.map(user => {
            if (user.username === loggedInUser.username) {
                const updatedBorrowedBooks = user.borrowedBooks.filter(b => b.id !== book.id);
                return {
                    ...user,
                    borrowedBooks: updatedBorrowedBooks
                }
            }
            return user;
        });

        const updatedLoggedInUser = updatedUsers.find(user => user.username === loggedInUser.username);

        setUsers(updatedUsers);
        setBooks([...books, book]);
        setLoggedInUser(updatedLoggedInUser);
    };

    const handleShowBookClick = (book) => {
        setSelectedBook(book);
        setShowBook(!showBook);
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
            dataField: 'returnDate',
            text: 'Return Date'
        },
        {
            text: 'Actions',
            formatter: (cell, row) => {
                return (
                    <>
                        <Button onClick={() => handleShowBookClick(row)}>Show</Button>
                        <Button onClick={() => returnBook(row)}>Return</Button>
                    </>
                );
            }
        }
    ];

    return (
        <div style={{ marginLeft: '0' }}>
            <BootstrapTable
                keyField='id'
                data={loggedInUser ? loggedInUser.borrowedBooks : []}
                columns={columns}
                hover
            />
            {selectedBook && showBook && (
                <Card>
                    <Row className="no-gutters">
                        <Col style={{ maxWidth: '200px', padding: '0' }}>
                            <Card.Img variant="top" src={selectedBook.cover} />
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title>{selectedBook.tytul}</Card.Title>
                                <Card.Text>{selectedBook.summary}</Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            )}
        </div>
    );
};

export default BorrowedBooks;
