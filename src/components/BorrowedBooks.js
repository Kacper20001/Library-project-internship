import React, { useState, useContext } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Card, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';

import { BooksContext } from '../Contexts/BooksContext';
import { UserContext } from '../Contexts/UserContext';
import { AdminContext } from '../Contexts/AdminContext';
import '../BorrowedBooks.css';
const BorrowedBooks = () => {
    const { adminIsLoggedIn } = useContext(AdminContext);
    const { loggedInUser, setUsers, users, setLoggedInUser } = useContext(UserContext);
    const { books, setBooks, addBookReview, updateBookRating, bookReviews } = useContext(BooksContext);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showBook, setShowBook] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showReviews, setShowReviews] = useState(false);

    const handleReviewSubmit = (bookId) => {
        addBookReview(bookId, reviewText, reviewRating);
        updateBookRating(bookId, reviewRating);
        setReviewText('');
        setReviewRating(5);
        setShowReviewForm(false);
    };

    const returnBook = (book) => {
        const updatedUsers = users.map((user) => {
            if (user.username === loggedInUser.username) {
                const updatedBorrowedBooks = user.borrowedBooks.filter((b) => b.id !== book.id);
                return {
                    ...user,
                    borrowedBooks: updatedBorrowedBooks,
                };
            }
            return user;
        });

        const updatedLoggedInUser = updatedUsers.find((user) => user.username === loggedInUser.username);

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
            text: 'Title',
        },
        {
            dataField: 'autor',
            text: 'Author',
        },
        {
            dataField: 'gatunek',
            text: 'Genre',
        },
        {
            dataField: 'returnDate',
            text: 'Return Date',
        },
        {
            dataField: 'borrowedBy',
            text: 'Borrowed By',
        },
        {
            text: 'Actions',
            formatter: (cell, row) => {
                return (
                    <>
                        <Button onClick={() => handleShowBookClick(row)}>Show</Button>
                        <Button onClick={() => returnBook(row)}>Return</Button>
                        <Button onClick={() => { setShowReviewForm(true); setSelectedBook(row); }}>Rate</Button>
                        {adminIsLoggedIn && (
                            <>
                                <Button onClick={() => extendReturnDate(row, 7)}>Extend by 7 days</Button>
                            </>
                        )}
                    </>
                );
            },
        },
    ];

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (field, direction) => {
        setSortField(field);
        setSortDirection(direction);
    };

    let filteredBooks = (loggedInUser ? loggedInUser.borrowedBooks : []).filter((book) =>
        book.tytul.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.gatunek.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredBooks = filteredBooks.sort((a, b) => {
        if (sortDirection === 'asc') {
            return a[sortField] > b[sortField] ? 1 : -1;
        } else {
            return a[sortField] < b[sortField] ? 1 : -1;
        }
    });

    filteredBooks = filteredBooks.map((book) => ({
        ...book,
        borrowedBy: book.borrowedBy ? book.borrowedBy : loggedInUser.username,
    }));

    const extendReturnDate = (book, days) => {
        const updatedUsers = users.map((user) => {
            if (user.username === loggedInUser.username) {
                const updatedBorrowedBooks = user.borrowedBooks.map((b) => {
                    if (b.id === book.id) {
                        const extendedReturnDate = new Date(b.returnDate);
                        extendedReturnDate.setDate(extendedReturnDate.getDate() + days);
                        return {
                            ...b,
                            returnDate: extendedReturnDate.toISOString().substring(0, 10),
                        };
                    }
                    return b;
                });
                return {
                    ...user,
                    borrowedBooks: updatedBorrowedBooks,
                };
            }
            return user;
        });

        const updatedLoggedInUser = updatedUsers.find((user) => user.username === loggedInUser.username);

        setUsers(updatedUsers);
        setLoggedInUser(updatedLoggedInUser);
    };

    return (
        <div className='Borrowed-container'>
            <Form className='borrowed-formularz'>
                <Form.Group>
                    <Form.Control
                        name="searchQuery"
                        className='wyszukiwanie'
                        placeholder="Title | Author | Genre"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sort
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSort('tytul', 'asc')}>Tytuł (A-Z)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort('tytul', 'desc')}>Tytuł (Z-A)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort('autor', 'asc')}>Autor (A-Z)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort('autor', 'desc')}>Autor (Z-A)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort('gatunek', 'asc')}>Rodzaj (A-Z)</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSort('gatunek', 'desc')}>Rodzaj (Z-A)</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Form>
            <BootstrapTable keyField="id" data={filteredBooks} id="Borrowed-tablica" columns={columns} hover />
            {showReviewForm && selectedBook && (
                <Form className="recenzja" onSubmit={(e) => { e.preventDefault(); handleReviewSubmit(selectedBook.id); }}>
                    <Form.Group>
                        <Form.Label>Review:</Form.Label>
                        <Form.Control as="textarea" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating:</Form.Label>
                        <Form.Control as="select" value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit">Submit Review</Button>
                </Form>
            )}
            {selectedBook && showBook && (
                <Card className='Borrowed-card'>
                    <Row className="no-gutters">
                        <Col style={{ maxWidth: '200px', padding: '0' }}>
                            <Card.Img variant="top" src={selectedBook.cover} />
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title>{selectedBook.tytul}</Card.Title>
                                <Card.Text>{selectedBook.summary}</Card.Text>
                                {bookReviews[selectedBook.id] && bookReviews[selectedBook.id].length > 0 && (
                                    <>
                                        <Card.Text>
                                            Average rate:
                                            {bookReviews[selectedBook.id].reduce((acc, review) => acc + review.rating, 0) / bookReviews[selectedBook.id].length}
                                        </Card.Text>
                                        <Button onClick={() => setShowReviews(!showReviews)}>
                                            Show comments
                                        </Button>
                                        {showReviews && bookReviews[selectedBook.id] && bookReviews[selectedBook.id].length > 0 && (
                                            <div>
                                                <Card.Text>Comments:</Card.Text>
                                                {bookReviews[selectedBook.id].map((review, index) => (
                                                    <Card key={index}>
                                                        <Card.Body>
                                                            <Card.Text>Rating: {review.rating}</Card.Text>
                                                            <Card.Text>{review.review}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            )}
        </div>
    );
};

export default BorrowedBooks;
