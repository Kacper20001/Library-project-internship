import React, { useState, useRef, useContext } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { BooksContext } from '../Contexts/BooksContext';
import { UserContext } from '../Contexts/UserContext';
import { AdminContext } from '../Contexts/AdminContext';
import { Card, Row, Col, Button, Form, Dropdown, Modal } from 'react-bootstrap';
import '../Browse.css'
const Browse = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [showBooks, setShowBooks] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [showAddModal, setShowAddModal] = useState(false);
    const [newBook, setNewBook] = useState({
        tytul: '',
        autor: '',
        gatunek: '',
        available: true,
        cover: '',
        summary: '',
        publishDate: '',
    });

    const buttonRefs = useRef({});
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const { books, setBooks, addBook, bookReviews } = useContext(BooksContext);
    const { isAdminLoggedIn } = useContext(AdminContext);
    const [showReviews, setShowReviews] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (field, direction) => {
        setSortField(field);
        setSortDirection(direction);
    };

    const deleteBook = (bookId) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    };

    const borrowBook = (book) => {
        const borrowedDate = new Date();
        const returnDate = new Date();
        returnDate.setMonth(returnDate.getMonth() + 1);

        const updatedBook = {
            ...book,
            borrowedDate: borrowedDate.toISOString().substring(0, 10),
            returnDate: returnDate.toISOString().substring(0, 10),
        };

        setLoggedInUser((prevUser) => ({
            ...prevUser,
            borrowedBooks: [...prevUser.borrowedBooks, updatedBook],
        }));

        setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
    };

    const handleShowHideClick = (row, rowIndex) => {
        setSelectedBook(row);
        setShowBooks(selectedBook !== row || !showBooks);
        window.scrollTo({ top: buttonRefs.current[rowIndex].offsetTop, behavior: 'smooth' });
    };

    const handleAddModalShow = () => {
        setShowAddModal(true);
    };

    const handleAddModalClose = () => {
        setShowAddModal(false);
        setNewBook({
            tytul: '',
            autor: '',
            gatunek: '',
            available: true,
            cover: '',
            summary: '',
            publishDate: '',
        });
    };


    const handleAddBook = () => {
        const updatedBook = {
            ...newBook,
            id: books.length + 1,
        };
        addBook(updatedBook);
        handleAddModalClose();
    };

    let filteredBooks = books.filter(
        (book) =>
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
            text: 'Actions',
            formatter: (cell, row, rowIndex) => {
                return (
                    <>
                        <Button ref={(el) => (buttonRefs.current[rowIndex] = el)} onClick={() => handleShowHideClick(row, rowIndex)}>
                            {selectedBook === row && showBooks ? 'Hide' : 'Show'}
                        </Button>
                        {isAdminLoggedIn ? (
                            <>
                                <Button onClick={() => deleteBook(row.id)}>Delete</Button>
                            </>
                        ) : (
                            loggedInUser && <Button onClick={() => borrowBook(row)}>Borrow</Button>
                        )}
                    </>
                );
            },
        },
    ];

    return (
        <div className='Browse-container'>
            <Form className="browse-formularz">
                <Form.Group>
                    <Form.Control name="searchQuery" className='wyszukiwanie' placeholder="Tytuł | Autor | Gatunek" value={searchQuery} onChange={handleSearchChange} />
                </Form.Group>
                <Dropdown className="sortowanie">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sortuj
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
            <BootstrapTable keyField="id" data={filteredBooks} columns={columns} hover id="Browse-tablica" className="Browse-table" />
            {selectedBook && showBooks && (
                <Card className="Browse-card">
                    <Row className="no-gutters">
                        <Col style={{ maxWidth: '200px', padding: '0' }}>
                            <Card.Img variant="top" src={selectedBook.cover} />
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title>{selectedBook.tytul}</Card.Title>
                                <Card.Text>{selectedBook.summary}</Card.Text>
                                {bookReviews[selectedBook.id] && bookReviews[selectedBook.id].length > 0 && (
                                    <Card.Text>
                                        Average rate:
                                        {(bookReviews[selectedBook.id].reduce((acc, review) => acc + parseInt(review.rating), 0) / bookReviews[selectedBook.id].length).toFixed(2)}
                                    </Card.Text>
                                )}
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
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            )}
            <Modal show={showAddModal} onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={newBook.tytul}
                                onChange={(e) => setNewBook({ ...newBook, tytul: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                value={newBook.autor}
                                onChange={(e) => setNewBook({ ...newBook, autor: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                value={newBook.gatunek}
                                onChange={(e) => setNewBook({ ...newBook, gatunek: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cover</Form.Label>
                            <Form.Control
                                type="text"
                                value={newBook.cover}
                                onChange={(e) => setNewBook({ ...newBook, cover: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newBook.summary}
                                onChange={(e) => setNewBook({ ...newBook, summary: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Data publikacji</Form.Label>
                            <Form.Control
                                type="text"
                                value={newBook.publishDate}
                                onChange={(e) => setNewBook({ ...newBook, publishDate: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddBook}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            {isAdminLoggedIn && <Button onClick={handleAddModalShow}>Add book</Button>}
        </div>
    );
};

export default Browse;
