// Browse.js
import React, { useState, useRef, useContext } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { BooksContext } from '../BooksContext';
import { UserContext } from '../UserContext';
import { AdminContext } from '../AdminContext';
import { Card, Row, Col, Button, Form, Dropdown, Modal } from 'react-bootstrap';

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
    const { loggedInUser, setLoggedInUser, setUsers, users } = useContext(UserContext);
    const { books, setBooks, addBook } = useContext(BooksContext);
    const { adminIsLoggedIn } = useContext(AdminContext);

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

        const updatedUsers = users.map((user) => {
            if (user.username === loggedInUser.username) {
                return {
                    ...user,
                    borrowedBooks: [...user.borrowedBooks, updatedBook],
                };
            }
            return user;
        });

        const updatedLoggedInUser = updatedUsers.find((user) => user.username === loggedInUser.username);
        setUsers(updatedUsers);
        setBooks(books.filter((b) => b.id !== book.id));
        setLoggedInUser(updatedLoggedInUser);
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
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return (
                    <>
                        <Button ref={(el) => (buttonRefs.current[rowIndex] = el)} onClick={() => handleShowHideClick(row, rowIndex)}>
                            {selectedBook === row && showBooks ? 'Ukryj' : 'Pokaż'}
                        </Button>
                        {adminIsLoggedIn ? (
                            <>
                                <Button onClick={() => deleteBook(row.id)}>Usuń</Button>
                            </>
                        ) : (
                            loggedInUser && <Button onClick={() => borrowBook(row)}>Wypożycz</Button>
                        )}
                    </>
                );
            },
        },
    ];

    return (
        <div style={{ marginLeft: '0' }}>
            <Form className="mb-3">
                <Form.Group>
                    <Form.Control name="searchQuery" placeholder="Tytuł | Autor | Gatunek" value={searchQuery} onChange={handleSearchChange} />
                </Form.Group>
                <Dropdown>
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
            <BootstrapTable keyField="id" data={filteredBooks} columns={columns} hover />
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
            <Modal show={showAddModal} onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj nową książkę</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tytuł</Form.Label>
                            <Form.Control
                                type="text"
                                value={newBook.tytul}
                                onChange={(e) => setNewBook({ ...newBook, tytul: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Autor</Form.Label>
                            <Form.Control
                                type="text"
                                value={newBook.autor}
                                onChange={(e) => setNewBook({ ...newBook, autor: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gatunek</Form.Label>
                            <Form.Control
                                type="text"
                                value={newBook.gatunek}
                                onChange={(e) => setNewBook({ ...newBook, gatunek: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Okładka</Form.Label>
                            <Form.Control
                                type="text"
                                value={newBook.cover}
                                onChange={(e) => setNewBook({ ...newBook, cover: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Opis</Form.Label>
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
                        Anuluj
                    </Button>
                    <Button variant="primary" onClick={handleAddBook}>
                        Dodaj
                    </Button>
                </Modal.Footer>
            </Modal>
            {adminIsLoggedIn && <Button onClick={handleAddModalShow}>Dodaj książkę</Button>}
        </div>
    );
};

export default Browse;
