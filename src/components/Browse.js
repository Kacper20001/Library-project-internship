import React, {useState, useRef, useContext, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { UserContext } from '../UserContext';

const BookList = () => {
    const { loggedInUser, setLoggedInUser, borrowedBooks, setBorrowedBooks, users, setUsers } = useContext(UserContext);
    const [books, setBooks] = useState([
        { tytul: 'Wiedźmin', autor: 'Andrzej Sapkowski', gatunek: 'Fantastyka', available: true, cover:'https://www.gloskultury.pl/wp-content/uploads/2019/12/wied%C5%BAmin-plakat.jpg', summary:'Świat Ciri i wiedźmina ogarniają płomienie. Nastał zapowiadany przez Ithlinne czas miecza i topora. Czas pogardy. A w czasach pogardy na powierzchnię wypełzają Szczury. Szczury atakujące po szczurzemu, cicho, zdradziecko i okrutnie. Szczury uwielbiające dobrą zabawę i zabijanie. To maruderzy z rozbitych armii, zabłąkane dzieciaki, zgwałcone dziewczyny, wieśniacy, których obejścia spalono, a rodziny wymordowano. Wyrzutki, dziwna zbieranina stworzona przez wojnę i na wojennym nieszczęściu żerująca. Ludzie, którzy wszystko przeżyli, wszystko utracili, którym śmierć już niestraszna. Przyodziani w zrabowane błyskotki, solidarni w biedzie i nieszczęściu, dla obcych zaś mający tylko to, czego sami zaznali od pogrążającego się w chaosie świata. Pogardę.', publishDate: '2012'  },
        { tytul: '1984', autor: 'George Orwell', gatunek: 'Fikcja dystopijna', available: true, cover:'https://ecsmedia.pl/c/14973575652531918-jpg-gallery.big-iext49966708.jpg', summary:'Okrutna i sugestywna wizja świata, w którym rządzi przemoc i strach, a władza panuje nie tylko nad losem człowieka, ale też nad jego myślami i uczuciami. Boleśnie aktualna opowieść o pragnieniu władzy i konsekwencjach jej nadużywania.', publishDate: 2000 },
        { tytul: 'Hobbit', autor: 'J.R.R. Tolkien', gatunek: 'Fantastyka', available: true, cover: 'https://ecsmedia.pl/c/hobbit-b-iext120945557.jpg', summary:'“Hobbit, czyli tam i z powrotem” to historia fantastycznego świata pełnego krasnoludów, elfów i smoków. Przeżyj wraz z Bilbo Bagginsem przygodę życia i sprawdź, czy odzyska wielki skarb!', publishDate: 1940  },
    ]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showBooks, setShowBooks] = useState(false);
    const buttonRefs = useRef({});

    const borrowBook = (book) => {
        const updatedUser = {
            ...loggedInUser,
            borrowedBooks: [...borrowedBooks, book]
        };
        setLoggedInUser(updatedUser);
        setBorrowedBooks([...borrowedBooks, book]);
        setBooks(books.filter(b => b.tytul !== book.tytul));
    };

    useEffect(() => {
        if (loggedInUser) {
            const updatedUsers = users.map(user =>
                user.username === loggedInUser.username ? loggedInUser : user
            );
            setUsers(updatedUsers);
        }
    }, [loggedInUser, setUsers, users]);

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
            text: 'Autor'
        },
        {
            dataField: 'gatunek',
            text: 'Genre'
        },
        {
            dataField: 'publishDate',
            text: 'Publish Date'
        },
        {
            text: 'Actions',
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return (
                    <>
                        <Button ref={el => buttonRefs.current[rowIndex] = el} onClick={() => handleShowHideClick(row, rowIndex)}>
                            {selectedBook === row && showBooks ? 'Ukryj' : 'Pokaż'}
                        </Button>
                        {loggedInUser && <Button onClick={() => borrowBook(row)}>Wypożycz</Button>}
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

export default BookList;
