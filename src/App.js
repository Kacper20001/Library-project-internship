// import logo from './logo.svg';
import './App.css';
import React, {useState, useRef} from "react";

function App() {
    const librarianPins = ['1234', '5678', '9012'];


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [region, setRegion] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');
    const [books, setBooks] = useState([
        { tytul: 'Wiedźmin', autor: 'Andrzej Sapkowski', gatunek: 'Fantastyka', available: true, cover:'https://www.gloskultury.pl/wp-content/uploads/2019/12/wied%C5%BAmin-plakat.jpg', summary:'Świat Ciri i wiedźmina ogarniają płomienie. Nastał zapowiadany przez Ithlinne czas miecza i topora. Czas pogardy. A w czasach pogardy na powierzchnię wypełzają Szczury. Szczury atakujące po szczurzemu, cicho, zdradziecko i okrutnie. Szczury uwielbiające dobrą zabawę i zabijanie. To maruderzy z rozbitych armii, zabłąkane dzieciaki, zgwałcone dziewczyny, wieśniacy, których obejścia spalono, a rodziny wymordowano. Wyrzutki, dziwna zbieranina stworzona przez wojnę i na wojennym nieszczęściu żerująca. Ludzie, którzy wszystko przeżyli, wszystko utracili, którym śmierć już niestraszna. Przyodziani w zrabowane błyskotki, solidarni w biedzie i nieszczęściu, dla obcych zaś mający tylko to, czego sami zaznali od pogrążającego się w chaosie świata. Pogardę.', publishDate: '2012'  },
        { tytul: '1984', autor: 'George Orwell', gatunek: 'Fikcja dystopijna', available: true, cover:'https://ecsmedia.pl/c/14973575652531918-jpg-gallery.big-iext49966708.jpg', summary:'Okrutna i sugestywna wizja świata, w którym rządzi przemoc i strach, a władza panuje nie tylko nad losem człowieka, ale też nad jego myślami i uczuciami. Boleśnie aktualna opowieść o pragnieniu władzy i konsekwencjach jej nadużywania.', publishDate: 2000 },
        { tytul: 'Hobbit', autor: 'J.R.R. Tolkien', gatunek: 'Fantastyka', available: true, cover: 'https://ecsmedia.pl/c/hobbit-b-iext120945557.jpg', summary:'“Hobbit, czyli tam i z powrotem” to historia fantastycznego świata pełnego krasnoludów, elfów i smoków. Przeżyj wraz z Bilbo Bagginsem przygodę życia i sprawdź, czy odzyska wielki skarb!', publishDate: 1940  },
    ]);
    const [editBook, setEditBook] = useState(null);
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const[search, setSearch] = useState('');
    const [borrowedBooks, setBorrowedBooks] = useState({});
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const [editAnnouncementIndex, setEditAnnouncementIndex] = useState(null);
    const[bookCover, setBookCover] = useState('');
    const [bookSummary, setBookSummary] = useState('');
    const [bookPublishDate, setBookPublishDate] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [userType, setUserType] = useState("");
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    const [forumMessages, setForumMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [librarianPin, setLibrarianPin] = useState('');
    const [isManagingAccount, setIsManagingAccount] = useState(false);
    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView();
    const validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const handleManageAccount = () => {
        setIsManagingAccount(!isManagingAccount);
    }
    const handleDeleteMessage = (index) => {
        let newMessages = [...forumMessages];
        newMessages.splice(index, 1, {username: "Moderator", message: "Wiadomość zostałą usunięta przez moderatora"})
        setForumMessages(newMessages);
    }

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = () => {
        setForumMessages([...forumMessages, {username: username, message: newMessage}]);
        setNewMessage("");
    };


    const handleAddReview = (bookTitle, reviewText, rating) => {
        setReviews([...reviews, {bookTitle, reviewText, rating}]);
        setReviewText('');
        setRating('');
    };

    const handleLogin = () => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            setIsLoggedIn(true);
            setRole(user.role);
        }
        else alert('Niepoprawna nazwa użytkownika lub hasło');
    };
    const handleRegister = () => {
        if (!username || !password || !confirmPassword || !email || !dateOfBirth || !city || !street || !houseNumber || !region || (userType === 'bibliotekarz' && !librarianPin)) {
            alert('Proszę wypełnić wszystkie pola');
            return;
        }

        if (password !== confirmPassword) {
            alert('Hasła nie są identyczne');
            return;
        }

        if (!validateEmail(email)) {
            alert('Nieprawidłowy format email');
            return;
        }

        if (userType === 'bibliotekarz' && !librarianPins.includes(librarianPin)) {
            alert('Niepoprawny pin dla bibliotekarza');
            return;
        }

        setUsers([...users, {username, password, role: userType, email, dateOfBirth, address}]);
        setIsRegistering(false);
        alert("Pomyślnie zarejestrowano, teraz możesz się zalogować");
        setUsername('');
        setPassword('');
        setEmail('');
        setDateOfBirth('');
        setAddress('');
    }


    const handleLogOut = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
        setRole('')
    };

    const handleDeleteAccount = () => {
        setUsers(users.filter(user => user.username !== username));
        setIsLoggedIn(false);
        setUsername('name');
        setRole('');
    }
    const handleChangeUsername = () => {
        if (!newUsername || users.find(user => user.username === newUsername)) {
            alert('Nazwa użytkownika jest pusta lub zajęta');
            return;
        }
        setUsers(users.map(user => user.username === username ? {...user, username: newUsername} : user));
        setUsername(newUsername);
        setNewUsername('');
    }

    const handleChangePassword = () => {
        if (!newPassword) {
            alert('Hasło jest puste')
            return;
        }
        setUsers(users.map(user => user.username === username ? {...user, password: newPassword} : user));
        setPassword(newPassword);
        setNewPassword('');
    };
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
    const handleAddBook = () => {
        setBooks([...books, {tytul: bookTitle, autor: bookAuthor, gatunek: bookGenre, available: true, cover:bookCover, summary: bookSummary, publishDate: bookPublishDate }]);
        setBookTitle('');
        setBookAuthor('');
        setBookGenre('');
        setBookCover('');
        setBookSummary('');
        setBookPublishDate('');
    };

    const handleDeleteBook = (index) => {
        setBooks(books.filter((_,i) => i !== index));
    };
    // const handleEditBook = (index) => {
    //     setEditBook(index);
    //     setBookTitle(books[index].tytul);
    //     setBookAuthor(books[index].autor);
    //     setBookGenre('');
    //     setBookCover('');
    //     setBookSummary('');
    //     setBookPublishDate('')
    // }
    const handleEditBook = (index) => {
        setEditBook(index);
        setBookTitle(books[index].tytul);
        setBookAuthor(books[index].autor);
        setBookGenre(books[index].gatunek);
        setBookCover(books[index].cover);
        setBookSummary(books[index].summary);
        setBookPublishDate(books[index].publishDate);
    }
    const handleBookEditApproval = () => {
        const newBooks = [...books];
        newBooks[editBook] = {tytul: bookTitle, autor: bookAuthor, gatunek: bookGenre, okladka:bookCover, streszczenie:bookSummary, data: setBookPublishDate()};
        setBooks(newBooks);
        setEditBook(null);
        setBookTitle('');
        setBookAuthor('');
        setBookGenre('');
        setBookCover('');
        setBookSummary('');
        setBookPublishDate('')
    }
    const handleBorrowBook = (index) => {
        const newBooks = [...books];
        newBooks[index] = {...newBooks[index], available: false, dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1))};
        setBooks(newBooks);
        setBorrowedBooks({...borrowedBooks, [username]: (borrowedBooks[username] || []).concat(newBooks[index])})
    };
    const handleReturnBook = (index) => {
        const newBooks = [...books];
        newBooks[index] = {...newBooks[index], available:true, dueDate: null,};
        setBooks(newBooks);
        setBorrowedBooks({...borrowedBooks, [username]: (borrowedBooks[username] || []).filter(book => book.tytul !== newBooks[index].tytul)});
    };
    const handleSelectBook = (book) =>{
        setSelectedBook(book);
    }

    const filteredBooks = books.filter((book) => {
        return book.tytul.toLowerCase().includes(search.toLowerCase()) ||
            book.autor.toLowerCase().includes(search.toLowerCase()) ||
            book.gatunek.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h1> Witaj, {username}</h1>
                    <h2>Jesteś zalogowany jako: {role}</h2>
                    <button onClick={handleManageAccount}>Zarządzaj kontem</button>
                    <button onClick={handleLogOut}>Wyloguj</button>
                    <div>
                        {isManagingAccount && (
                            <>
                                <input
                                    value={newUsername}
                                    onChange={e => setNewUsername(e.target.value)}
                                    placeholder="Nowa nazwa użytkownika"
                                />
                                <button onClick={handleChangeUsername}>Zmień nazwę użytkownika</button>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    placeholder="Nowe hasło"
                                /> <br/>
                                <button onClick={handleChangePassword}>Zmień hasło</button>
                                <button onClick={handleDeleteAccount}>Usuń konto</button>
                            </>
                        )}
                    </div>
                    <div>
                        <h2>Ogłoszenia</h2>
                        {announcements.map((announcements, i) => (
                            <div key={i}>
                                {announcements}
                                {role === 'bibliotekarz' && (
                                <div>
                                    <button onClick={() => handleEditAnnouncement(i)}>Edytuj</button>
                                    <button onClick={() => handleDeleteAnnouncement(i)}>Usuń</button>
                                </div>
                                )}
                            </div>

                        ))}
                        {role === 'bibliotekarz' && (
                            <div>
                                <h2>Dodaj/Edytuj ogłoszenie</h2>
                                <input
                                    value={newAnnouncement}
                                    onChange={e => setNewAnnouncement(e.target.value)}
                                    placeholder="Nowe ogłoszenie"
                                />
                                <button onClick={editAnnouncementIndex === null ? handleAddAnnouncement : handleEditApproval}>
                                    {editAnnouncementIndex === null ? "Dodaj ogłoszenie" : "Zatwierdź edycję"}
                                </button>
                            </div>
                        )}
                        <div>
                            <h2>Wyszukaj książkę</h2>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Szukaj książki"
                            />
                        </div>
                    </div>

                    {role === 'bibliotekarz' && (
                        <div>
                            <div ref={myRef}>
                                <h2>Dodaj/edytuj książkę</h2>
                                <input
                                    value={bookTitle}
                                    onChange={e => setBookTitle(e.target.value)}
                                    placeholder="Tytuł książki"
                                />
                                <input
                                    value={bookAuthor}
                                    onChange={e => setBookAuthor(e.target.value)}
                                    placeholder="Autor książki"
                                />
                                <input
                                    value={bookGenre}
                                    onChange={e => setBookGenre(e.target.value)}
                                    placeholder="Gatunek książki"
                                />
                                <input
                                    value={bookCover}
                                    onChange={e => setBookCover(e.target.value)}
                                    placeholder="Okładka książki"
                                />
                                <input
                                    value={bookSummary}
                                    onChange={e => setBookSummary(e.target.value)}
                                    placeholder="Streszcznie książki"
                                />
                                <input
                                    type="date"
                                    value={bookPublishDate}
                                    onChange={e => setBookPublishDate(e.target.value)}
                                    placeholder="Data publikacji"
                                />
                                <button onClick={handleAddBook}>Dodaj książkę</button>
                                {editBook !== null && (
                                    <button onClick={handleEditApproval}>Zatwierdź edycję</button>
                                )}
                            </div>
                            <div>
                                <h2>Lista książek</h2>
                                {filteredBooks.map((book, i) => (
                                    <div key={i} id={"ksiazki"}>
                                        <h3>{book.tytul}</h3>
                                        <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                        <p>Autor: {book.autor}</p>
                                        <p>Gatunek: {book.gatunek}</p>
                                        <p>Data publikacji: return book.tytul{book.publishDate}</p>
                                        <p>Streszczenie: {book.summary}</p>
                                        <>
                                            <button onClick={() => {handleEditBook(i); executeScroll();}}>Edytuj</button>
                                            <button onClick={() => handleDeleteBook(i)}>Usuń</button>
                                        </>
                                    </div>
                                ))}
                                <>
                                    <div>
                                        <h2>Forum dyskusyjne</h2>
                                        {forumMessages.map((msg, index) => (
                                            <div key={index}>
                                                <h3>{msg.username}</h3>
                                                <p>{msg.message}</p>
                                                <button onClick={() => handleDeleteMessage(index)}>Usuń wiadomość</button>
                                            </div>
                                        ))}
                                        <div>
                                            <input type="text" value={newMessage} onChange={handleNewMessageChange} />
                                            <button onClick={handleSendMessage}>Wyślij wiadomość</button>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>
                    )}
                    {role === 'czytelnik' && (
                        <>
                            <div>
                                <h2>Lista dostępnych książek</h2>
                                {filteredBooks.map((book,i) => (
                                    book.available && (
                                        <div key={i}>
                                            <h3 onClick={() => handleSelectBook(book)}>{book.tytul}</h3>
                                            <button onClick={() => handleBorrowBook(i)}>Wypożycz</button>
                                        </div>
                                    )
                                ))}
                                {selectedBook && (
                                    <div>
                                        <h2>Szczegóły książki</h2>
                                        <h3>{selectedBook.tytul}</h3>
                                        <img src={selectedBook.cover} alt={`Okładka książki ${selectedBook.tytul}`}/>
                                        <p> Autor: {selectedBook.autor}</p>
                                        <p>Gatunek: {selectedBook.gatunek}</p>
                                        <p>Data publikacji: {selectedBook.publishDate}</p>
                                        <p>Streszczenie: {selectedBook.summary}</p>
                                        {selectedBook && (
                                            <div>
                                                <h2>Book Reviews</h2>
                                                {reviews.filter(review => review.bookTitle === selectedBook.tytul).map((review, index) => (
                                                    <div key={index}>
                                                        <p>{review.reviewText}</p>
                                                        <p>Rating: {review.rating}/5</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h2>Twoje wypożyczone książki</h2>
                                {borrowedBooks[username]?.map((book, i) => (
                                    <div key={i}>
                                        <h3>{book.tytul}</h3>
                                        {!book.available && <p>Termin zwrotu: {book.dueDate?.toLocaleDateString()}</p>}
                                        <button onClick={() => handleReturnBook(books.findIndex(b => b.tytul === book.tytul))}>Zwróć</button>
                                        <button onClick={() => handleSelectBook(book)}>Recenzuj</button>
                                    </div>
                                ))}
                                {selectedBook && (
                                    <>
                                    <div>
                                        <h2>Ocena {selectedBook.tytul} </h2>
                                        <input placeholder="Your review" onChange={e => setReviewText(e.target.value)} />
                                        <input type="number" min="1" max="5" placeholder="Your rating" onChange={e => setRating(Number(e.target.value))} />
                                        <button onClick={() => handleAddReview(selectedBook.tytul, reviewText, rating)}>Submit Review</button>
                                    </div>
                                    </>
                                )}
                            </div>
                            <div>
                                <h2>Forum dyskusyjne</h2>
                                {forumMessages.map((msg, index) => (
                                    <div key={index}>
                                        <h3>{msg.username}</h3>
                                        <p>{msg.message}</p>
                                    </div>
                                ))}
                                <div>
                                    <input type="text" value={newMessage} onChange={handleNewMessageChange} />
                                    <button onClick={handleSendMessage}>Wyślij wiadomość</button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div>
                    <h1>Biblioteka</h1>
                    {!isRegistering ? (
                        <>
                            <input
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Nazwa użytkownika"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Hasło"
                            />
                            <button onClick={() => {setUserType('czytelnik'); setIsRegistering(true);}}>Zarejestruj jako czytelnik</button>
                            <button onClick={() => {setUserType('bibliotekarz'); setIsRegistering(true);}}>Zarejestruj jako bibliotekarz</button>
                            <button onClick={handleLogin}>Zaloguj</button> <br/>
                        </>
                    ) : (
                        <>
                            <input
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Nazwa użytkownika"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Hasło"
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Potwierdź Hasło"
                            />
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={e => setDateOfBirth(e.target.value)}
                                placeholder="Data urodzenia"
                            />
                            <input
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                placeholder="Miejscowość"
                            />
                            <input
                                value={street}
                                onChange={e => setStreet(e.target.value)}
                                placeholder="Ulica"
                            />
                            <input
                                value={houseNumber}
                                onChange={e => setHouseNumber(e.target.value)}
                                placeholder="Numer domu"
                            />

                            <select
                                value={region}
                                onChange={e => setRegion(e.target.value)}
                            >   <option value=''>Wybierz województwo</option>
                                <option value="dolnoslaskie">Dolnośląskie</option>
                                <option value="kujawsko_pomorskie">Kujawsko-Pomorskie</option>
                                <option value="lubelskie">Lubelskie</option>
                                <option value="lubuskie">Lubuskie</option>
                                <option value="lodzkie">Łódzkie</option>
                                <option value="malopolskie">Małopolskie</option>
                                <option value="mazowieckie">Mazowieckie</option>
                                <option value="opolskie">Opolskie</option>
                                <option value="podkarpackie">Podkarpackie</option>
                                <option value="podlaskie">Podlaskie</option>
                                <option value="pomorskie">Pomorskie</option>
                                <option value="slaskie">Śląskie</option>
                                <option value="swietokrzyskie">Świętokrzyskie</option>
                                <option value="warminsko_mazurskie">Warmińsko-Mazurskie</option>
                                <option value="wielkopolskie">Wielkopolskie</option>
                                <option value="zachodniopomorskie">Zachodniopomorskie</option>
                            </select>
                            {userType === 'bibliotekarz' && (
                                <input
                                    value={librarianPin}
                                    onChange={e => setLibrarianPin(e.target.value)}
                                    placeholder="PIN Bibliotekarza"
                                />
                            )}
                            <button onClick={handleRegister}>Zarejestruj</button>
                            <button onClick={() => setIsRegistering(false)}>Wróć do logowania</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;