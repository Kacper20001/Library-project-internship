import React, { useState, useRef, useContext } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { BooksContext } from '../BooksContext';
import { UserContext } from '../UserContext';
import { AdminContext } from '../AdminContext';
import { Card, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';

const BorrowedBooks = () => {
    const { adminIsLoggedIn } = useContext(AdminContext);
    const { loggedInUser, setUsers, users, setLoggedInUser } = useContext(UserContext);
    const { books, setBooks } = useContext(BooksContext);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showBook, setShowBook] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortDirection, setSortDirection] = useState("asc");
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
            dataField: 'borrowedBy',
            text: 'Borrowed By'
        },
        {
            text: 'Actions',
            formatter: (cell, row) => {
                return (
                    <>
                        <Button onClick={() => handleShowBookClick(row)}>Show</Button>
                        <Button onClick={() => returnBook(row)}>Return</Button>
                        {adminIsLoggedIn && (
                            <>
                                <Button onClick={() => extendReturnDate(row, 7)}>Extend by 7 days</Button>
                            </>
                        )}
                    </>
                );
            }
        }
    ];
    const handleSearchChange = e => {
        setSearchQuery(e.target.value);
    };
    const handleSort = (field, direction) => {
        setSortField(field);
        setSortDirection(direction);
    };
    let filteredBooks = (loggedInUser ? loggedInUser.borrowedBooks : []).filter(book =>
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

    filteredBooks = filteredBooks.map(book => ({
        ...book,
        borrowedBy: book.borrowedBy ? book.borrowedBy : loggedInUser.username
    }));
    const extendReturnDate = (book, days) => {
        const updatedUsers = users.map(user => {
            if (user.username === loggedInUser.username) {
                const updatedBorrowedBooks = user.borrowedBooks.map(b => {
                    if (b.id === book.id) {
                        const extendedReturnDate = new Date(b.returnDate);
                        extendedReturnDate.setDate(extendedReturnDate.getDate() + days);
                        return {
                            ...b,
                            returnDate: extendedReturnDate.toISOString().substring(0, 10)
                        }
                    }
                    return b;
                });
                return {
                    ...user,
                    borrowedBooks: updatedBorrowedBooks
                }
            }
            return user;
        });

        const updatedLoggedInUser = updatedUsers.find(user => user.username === loggedInUser.username);

        setUsers(updatedUsers);
        setLoggedInUser(updatedLoggedInUser);
    };

    return (
        <div style={{ marginLeft: '0' }}>
            <Form className="mb-3">
                <Form.Group>
                    <Form.Control
                        name="searchQuery"
                        placeholder="Tytuł | Autor | Gatunek"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
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
            <BootstrapTable
                keyField='id'
                data={filteredBooks}
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
