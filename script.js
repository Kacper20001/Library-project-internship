import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
    const [dueDate, setDueDate] = useState('');
    const [borrowedBooks, setBorrowedBooks] = useState({});
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const[bookCover, setBookCover] = useState('');
    const [bookSummary, setBookSummary] = useState('');
    const [bookPublishDate, setBookPublishDate] = useState('');


    const handleLogin = () => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            setIsLoggedIn(true);
            setRole(user.role);
        }
        else alert('Niepoprawna nazwa użytkownika lub hasło');
    };
    const  handleRegister = (role) => {
        setUsers([...users, {username, password, role}]);
        setUsername('');
        setPassword('');
    };
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
        if (newUsername && !users.find(user => user.username === newUsername)) {
            setUsers(users.map(user => user.username === username ? {...user, username: newUsername} : user));
            setUsername(newUsername);
            setNewUsername('');
        } else {
            alert('Nazwa użytkownika jest pusta lub zajęta');
        }
    }

    const handleChangePassword = () => {
        if (newPassword) {
            setUsers(users.map(user => user.username === username ? {...user, password: newPassword} : user));
            setPassword(newPassword);
            setNewPassword('');
        } else {
            alert('Hasło jest puste')
        }
    };
    const handleAddAnnouncement = () => {
        setAnnouncements([...announcements, newAnnouncement]);
        setNewAnnouncement('');
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
    const handleEditBook = (index) => {
        setEditBook(index);
        setBookTitle(books[index].tytul);
        setBookAuthor(books[index].autor);
        setBookGenre('');
        setBookCover('');
        setBookSummary('');
        setBookPublishDate('')
    }
    const handleEditApproval = () => {
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


    const filteredBooks = books.filter((book) => {
        return book.tytul.includes(search) || book.autor.includes(search) || book.gatunek.includes(search);
    })

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h1> Witaj, {username}</h1>
                    <h2>Jesteś zalogowany jako: {role}</h2>
                    <button onClick={handleLogOut}>Wyloguj</button>
                    <div>
                        <h2>Ogłoszenia</h2>
                        {announcements.map((announcements, i) => (
                            <div key={i}>{announcements}</div>
                        ))}
                    </div>

                    <div>
                        <h2>Zarządzanie kontem</h2>
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
                        />
                        <button onClick={handleChangePassword}>Zmień hasło</button>
                        <button onClick={handleDeleteAccount}>Usuń konto</button>
                    </div>
                    <div>
                        <h2>Wyszukaj książkę</h2>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Szukaj książki"
                        />
                    </div>
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Dodaj ogłoszenie</h2>
                            <input
                                value={newAnnouncement}
                                onChange={e => setNewAnnouncement(e.target.value)}
                                placeholder="Nowe ogłoszenie"
                            />
                            <button onClick={handleAddAnnouncement}>Dodaj ogłoszenie</button>
                        </div>
                    )}
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Dodaj książkę</h2>Open sidebar
                            Dodaj ogłoszenia biblioteczne

                            Model: GPT-4

                            User
                            Do poniższego kodu dodaj:
                            Udostępnienie przeglądu wydarzeń bibliotecznych, ogłoszeń lub nadchodzących premier
                            książek.
                            kod:
                            import logo from './logo.svg';
                            import './App.css';
                            import React, {useState} from "react";

                            function App() {
                            const [isLoggedIn, setIsLoggedIn] = useState(false);
                            const [username, setUsername] = useState('');
                            const [password, setPassword] = useState('');
                            const [users, setUsers] = useState([]);
                            const [role, setRole] = useState('');
                            const [books, setBooks] = useState([
                        { tytul: 'Wiedźmin', autor: 'Andrzej Sapkowski', gatunek: 'Fantastyka', available: true },
                        { tytul: '1984', autor: 'George Orwell', gatunek: 'Fikcja dystopijna', available: true },
                        { tytul: 'Hobbit', autor: 'J.R.R. Tolkien', gatunek: 'Fantastyka', available: true },
                            ]);
                            const [editBook, setEditBook] = useState(null);
                            const [bookTitle, setBookTitle] = useState('');
                            const [bookAuthor, setBookAuthor] = useState('');
                            const [bookGenre, setBookGenre] = useState('');
                            const[search, setSearch] = useState('');
                            const [dueDate, setDueDate] = useState('');
                            const [borrowedBooks, setBorrowedBooks] = useState({});
                            const [newUsername, setNewUsername] = useState('');
                            const [newPassword, setNewPassword] = useState('');

                            const handleLogin = () => {
                            const user = users.find(user => user.username === username && user.password === password);
                            if (user) {
                            setIsLoggedIn(true);
                            setRole(user.role);
                        }
                            else alert('Niepoprawna nazwa użytkownika lub hasło');
                        };
                            const  handleRegister = (role) => {
                            setUsers([...users, {username, password, role}]);
                            setUsername('');
                            setPassword('');
                        };
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
                            if (newUsername && !users.find(user => user.username === newUsername)) {
                            setUsers(users.map(user => user.username === username ? {...user, username: newUsername} : user));
                            setUsername(newUsername);
                            setNewUsername('');
                        } else {
                            alert('Nazwa użytkownika jest pusta lub zajęta');
                        }
                        }

                            const handleChangePassword = () => {
                            if (newPassword) {
                            setUsers(users.map(user => user.username === username ? {...user, password: newPassword} : user));
                            setPassword(newPassword);
                            setNewPassword('');
                        } else {
                            alert('Hasło jest puste')
                        }
                        };
                            const handleAddBook = () => {
                            setBooks([...books, {tytul: bookTitle, autor: bookAuthor, gatunek: bookGenre, available: true}]);
                            setBookTitle('');
                            setBookAuthor('');
                            setBookGenre('');
                        };

                            const handleDeleteBook = (index) => {
                            setBooks(books.filter((_,i) => i !== index));
                        };
                            const handleEditBook = (index) => {
                            setEditBook(index);
                            setBookTitle(books[index].tytul);
                            setBookAuthor(books[index].autor);
                            setBookGenre('');
                        }
                            const handleEditApproval = () => {
                            const newBooks = [...books];
                            newBooks[editBook] = {tytul: bookTitle, autor: bookAuthor, gatunek: bookGenre};
                            setBooks(newBooks);
                            setEditBook(null);
                            setBookTitle('');
                            setBookAuthor('');
                            setBookGenre('');
                        }
                            const handleBorrowBook = (index) => {
                            const newBooks = [...books];
                            newBooks[index] = {...newBooks[index], available: false, dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1))};
                            setBooks(newBooks);
                            setBorrowedBooks({...borrowedBooks, [username]: (borrowedBooks[username] || []).concat(newBooks[index])})
                        };
                            const handleReturnBook = (index) => {
                            const newBooks = [...books];
                            newBooks[index] = {...newBooks[index], available:true, dueDate: null};
                            setBooks(newBooks);
                            setBorrowedBooks({...borrowedBooks, [username]: (borrowedBooks[username] || []).filter(book => book.tytul !== newBooks[index].tytul)});
                        };


                            const filteredBooks = books.filter((book) => {
                            return book.tytul.includes(search) || book.autor.includes(search) || book.gatunek.includes(search);
                        })

                            return (
                            <div>
                        {isLoggedIn ? (
                            <>
                            <h1> Witaj, {username}</h1>
                        <h2>Jesteś zalogowany jako: {role}</h2>
                <button onClick={handleLogOut}>Wyloguj</button>
                <div>
                <h2>Zarządzanie kontem</h2>
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
    />
    <button onClick={handleChangePassword}>Zmień hasło</button>
    <button onClick={handleDeleteAccount}>Usuń konto</button>
</div>
    <div>
        <h2>Wyszukaj książkę</h2>
        <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Szukaj książki"
        />
    </div>

{role === 'bibliotekarz' && (
        <div>
            <h2>Dodaj książkę</h2>
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
            <button onClick={handleAddBook}>Dodaj książkę</button>
            {editBook !== null && (
                <button onClick={handleEditApproval}>Zatwierdź edycję</button>
            )}
        </div>
    )}
{role === 'czytelnik' && (
        <>
            <div>
                <h2>Lista dostępnych książek</h2>
                {filteredBooks.map((book,i) => (
                    book.available && (
                        <div key={i}>
                            <span>{book.tytul} - {book.autor} - {book.gatunek}</span>
                            <button onClick={() => handleBorrowBook(i)}>Wypożycz</button>
                        </div>
                    )
                ))}
            </div>
            <div>
                <h2>Twoje wypożyczone książki</h2>
                {borrowedBooks[username]?.map((book, i) => (
                    <div key={i}>
                        <span>{book.tytul} - {book.autor} - {book.gatunek}</span>
                        <button onClick={() => handleReturnBook(books.findIndex(b => b.tytul === book.tytul))}>Zwróć</button>
                    </div>
                ))}
            </div>
        </>
    )}
{role === 'bibliotekarz' && (
        <div>
            <h2>Lista książek</h2>
            {filteredBooks.map((book, i) => (
                <div key={i}>
                    <span>{book.tytul} - {book.autor} - {book.gatunek}</span>
                    {!book.available && <p>Termin zwrotu: {book.dueDate?.toLocaleDateString()}</p>}
                    <>
                        <button onClick={() => handleEditBook(i)}>Edytuj</button>
                        <button onClick={() => handleDeleteBook(i)}>Usuń</button>
                    </>
                </div>
            ))}
        </div>
    )}
</>
) : (
        <div>
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
            <button onClick={handleLogin}>Zaloguj</button>
            <button onClick={() => handleRegister('czytelnik')}>Zarejestruj jako czytelnik</button>
            <button onClick={() => handleRegister('bibliotekarz')}>Zarejestruj jako bibliotekarz</button>
        </div>
    )}
</div>
);
}

export default App;


ChatGPT
Poniżej znajduje się zmodyfikowany kod, który zawiera nową funkcjonalność: przegląd wydarzeń bibliotecznych, ogłoszeń i nadchodzących premier książek. Nowe wydarzenia i ogłoszenia są przechowywane w tablicy announcements i mogą być dodawane przez użytkownika z rolą "bibliotekarz". Ogłoszenia są potem wyświetlane dla wszystkich zalogowanych użytkowników.

jsx
Copy code
import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function App() {
    // Nowe pola stanu dla ogłoszeń i nowego ogłoszenia
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');

    // Pozostałe pola stanu...

    // Nowa funkcja do dodawania ogłoszeń
    const handleAddAnnouncement = () => {
        setAnnouncements([...announcements, newAnnouncement]);
        setNewAnnouncement('');
    };

    // Pozostałe funkcje...

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h1> Witaj, {username}</h1>
                    <h2>Jesteś zalogowany jako: {role}</h2>
                    <button onClick={handleLogOut}>Wyloguj</button>

                    {/* Wyświetlanie ogłoszeń */}
                    <div>
                        <h2>Ogłoszenia</h2>
                        {announcements.map((announcement, i) => (
                            <div key={i}>{announcement}</div>
                        ))}
                    </div>

                    <div>
                        <h2>Zarządzanie kontem</h2>
                        {/* Pozostały kod zarządzania kontem... */}
                    </div>

                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Dodaj ogłoszenie</h2>
                            <input
                                value={newAnnouncement}
                                onChange={e => setNewAnnouncement(e.target.value)}
                                placeholder="Nowe ogłoszenie"
                            />
                            <button onClick={handleAddAnnouncement}>Dodaj ogłoszenie</button>
                        </div>
                    )}

                    {/* Pozostały kod dla różnych ról użytkowników... */}
                </>
            ) : (
                <div>
                    {/* Kod do logowania i rejestracji... */}
                </div>
            )}
        </div>
    );
}

export default App;
Pamiętaj, że ten kod jest przykładowy i może wymagać dostosowania do twoich potrzeb. W szczególności, pomyśl nad dodaniem możliwości usuwania ogłoszeń lub edycji istniejących ogłoszeń.





User
Dodaj:
Wyświetlanie szczegółowych informacji o każdej książce, w tym okładki, streszczenia i
innych istotnych danych.

ChatGPT
Aby dodawać dodatkowe informacje do książek, najpierw musimy rozszerzyć nasz stan książek, aby uwzględnić te dodatkowe pola. Poniżej znajduje się przykład, jak możemy to zrobić. Na przykład, możemy dodać pola cover, summary, publishDate do naszej struktury książki.

Poniższy kod jest tylko przykładowy, na podstawie twojego kontekstu i wymagań, powinieneś dostosować kod.

jsx
Copy code
import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function App() {
    // Nowe pola stanu dla szczegółów książki
    const [bookCover, setBookCover] = useState('');
    const [bookSummary, setBookSummary] = useState('');
    const [bookPublishDate, setBookPublishDate] = useState('');

    const [books, setBooks] = useState([
        {
            tytul: 'Wiedźmin',
            autor: 'Andrzej Sapkowski',
            gatunek: 'Fantastyka',
            available: true,
            cover: 'link_do_obrazka',
            summary: 'Krótkie streszczenie książki Wiedźmin...',
            publishDate: '1992'
        },
        // ...
    ]);

    // Pozostałe pola stanu...

    const handleAddBook = () => {
        setBooks([...books, {
            tytul: bookTitle,
            autor: bookAuthor,
            gatunek: bookGenre,
            available: true,
            cover: bookCover,
            summary: bookSummary,
            publishDate: bookPublishDate,
        }]);
        setBookTitle('');
        setBookAuthor('');
        setBookGenre('');
        setBookCover('');
        setBookSummary('');
        setBookPublishDate('');
    };

    // Pozostałe funkcje...

    return (
        <div>
            {/* Pozostały kod... */}

            {role === 'bibliotekarz' && (
                <div>
                    <h2>Dodaj książkę</h2>
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
                        placeholder="Link do okładki książki"
                    />
                    <input
                        value={bookSummary}
                        onChange={e => setBookSummary(e.target.value)}
                        placeholder="Streszczenie książki"
                    />
                    <input
                        type="date"
                        value={bookPublishDate}
                        onChange={e => setBookPublishDate(e.target.value)}
                        placeholder="Data publikacji"
                    />
                    <button onClick={handleAddBook}>Dodaj książkę</button>
                    {/* Pozostały kod... */}
                </div>
            )}

            {/* Wyświetlanie szczegółów książki */}
            <div>
                <h2>Lista dostępnych książek</h2>
                {books.map((book, i) => (
                    <div key={i}>
                        <h3>{book.tytul}</h3>
                        <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                        <p>Autor: {book.autor}</p>
                        <p>Gatunek: {book.gatunek}</p>
                        <p>Data publikacji: {book.publishDate}</p>
                        <p>Streszczenie: {book.summary}</p>
                    </div>
                ))}
            </div>

            {/* Pozostały kod... */}
        </div>
    );
}

export default App;




User
Zmodyfikuj kod tak, aby użytkownikowi też się wyświetlały szczegółowe informacje o każdej książce

ChatGPT
Poniżej znajduje się zmodyfikowany kod, który umożliwia wyświetlanie szczegółowych informacji o książkach dla wszystkich użytkowników, niezależnie od roli:

jsx
Copy code
import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function App() {
    // Nowe pola stanu dla szczegółów książki
    const [bookCover, setBookCover] = useState('');
    const [bookSummary, setBookSummary] = useState('');
    const [bookPublishDate, setBookPublishDate] = useState('');

    const [books, setBooks] = useState([
        {
            tytul: 'Wiedźmin',
            autor: 'Andrzej Sapkowski',
            gatunek: 'Fantastyka',
            available: true,
            cover: 'link_do_obrazka',
            summary: 'Krótkie streszczenie książki Wiedźmin...',
            publishDate: '1992'
        },
        // ...
    ]);

    // Pozostałe pola stanu...

    const handleAddBook = () => {
        setBooks([...books, {
            tytul: bookTitle,
            autor: bookAuthor,
            gatunek: bookGenre,
            available: true,
            cover: bookCover,
            summary: bookSummary,
            publishDate: bookPublishDate,
        }]);
        setBookTitle('');
        setBookAuthor('');
        setBookGenre('');
        setBookCover('');
        setBookSummary('');
        setBookPublishDate('');
    };

    // Pozostałe funkcje...

    return (
        <div>
            {/* Pozostały kod... */}

            {role === 'bibliotekarz' && (
                <div>
                    <h2>Dodaj książkę</h2>
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
                        placeholder="Link do okładki książki"
                    />
                    <input
                        value={bookSummary}
                        onChange={e => setBookSummary(e.target.value)}
                        placeholder="Streszczenie książki"
                    />
                    <input
                        type="date"
                        value={bookPublishDate}
                        onChange={e => setBookPublishDate(e.target.value)}
                        placeholder="Data publikacji"
                    />
                    <button onClick={handleAddBook}>Dodaj książkę</button>
                    {/* Pozostały kod... */}
                </div>
            )}

            {/* Wyświetlanie szczegółów książki dla wszystkich użytkowników */}
            <div>
                <h2>Lista książek</h2>
                {books.map((book, i) => (
                    <div key={i}>
                        <h3>{book.tytul}</h3>
                        <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                        <p>Autor: {book.autor}</p>
                        <p>Gatunek: {book.gatunek}</p>
                        <p>Data publikacji: {book.publishDate}</p>
                        <p>Streszczenie: {book.summary}</p>
                        {/* Pozostały kod... */}
                    </div>
                ))}
            </div>

            {/* Pozostały kod... */}
        </div>
    );
}

export default App;
W tym kodzie dodano nowe pola stanu dla szczegółów książki, takie jak bookCover, bookSummary i bookPublishDate. Te nowe pola stanu są ustawiane przy dodawaniu nowej książki do stanu aplikacji. Dodatkowo, sekcja wyświetlająca listę książek została przeniesiona poza warunek zależny od roli, więc będzie widoczna dla wszystkich użytkowników.





User
import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
    const [dueDate, setDueDate] = useState('');
    const [borrowedBooks, setBorrowedBooks] = useState({});
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const[bookCover, setBookCover] = useState('');
    const [bookSummary, setBookSummary] = useState('');
    const [bookPublishDate, setBookPublishDate] = useState('');


    const handleLogin = () => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            setIsLoggedIn(true);
            setRole(user.role);
        }
        else alert('Niepoprawna nazwa użytkownika lub hasło');
    };
    const  handleRegister = (role) => {
        setUsers([...users, {username, password, role}]);
        setUsername('');
        setPassword('');
    };
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
        if (newUsername && !users.find(user => user.username === newUsername)) {
            setUsers(users.map(user => user.username === username ? {...user, username: newUsername} : user));
            setUsername(newUsername);
            setNewUsername('');
        } else {
            alert('Nazwa użytkownika jest pusta lub zajęta');
        }
    }

    const handleChangePassword = () => {
        if (newPassword) {
            setUsers(users.map(user => user.username === username ? {...user, password: newPassword} : user));
            setPassword(newPassword);
            setNewPassword('');
        } else {
            alert('Hasło jest puste')
        }
    };
    const handleAddAnnouncement = () => {
        setAnnouncements([...announcements, newAnnouncement]);
        setNewAnnouncement('');
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
    const handleEditBook = (index) => {
        setEditBook(index);
        setBookTitle(books[index].tytul);
        setBookAuthor(books[index].autor);
        setBookGenre('');
    }
    const handleEditApproval = () => {
        const newBooks = [...books];
        newBooks[editBook] = {tytul: bookTitle, autor: bookAuthor, gatunek: bookGenre};
        setBooks(newBooks);
        setEditBook(null);
        setBookTitle('');
        setBookAuthor('');
        setBookGenre('');
    }
    const handleBorrowBook = (index) => {
        const newBooks = [...books];
        newBooks[index] = {...newBooks[index], available: false, dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1))};
        setBooks(newBooks);
        setBorrowedBooks({...borrowedBooks, [username]: (borrowedBooks[username] || []).concat(newBooks[index])})
    };
    const handleReturnBook = (index) => {
        const newBooks = [...books];
        newBooks[index] = {...newBooks[index], available:true, dueDate: null};
        setBooks(newBooks);
        setBorrowedBooks({...borrowedBooks, [username]: (borrowedBooks[username] || []).filter(book => book.tytul !== newBooks[index].tytul)});
    };


    const filteredBooks = books.filter((book) => {
        return book.tytul.includes(search) || book.autor.includes(search) || book.gatunek.includes(search);
    })

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h1> Witaj, {username}</h1>
                    <h2>Jesteś zalogowany jako: {role}</h2>
                    <button onClick={handleLogOut}>Wyloguj</button>
                    <div>
                        <h2>Ogłoszenia</h2>
                        {announcements.map((announcements, i) => (
                            <div key={i}>{announcements}</div>
                        ))}
                    </div>

                    <div>
                        <h2>Zarządzanie kontem</h2>
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
                        />
                        <button onClick={handleChangePassword}>Zmień hasło</button>
                        <button onClick={handleDeleteAccount}>Usuń konto</button>
                    </div>
                    <div>
                        <h2>Wyszukaj książkę</h2>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Szukaj książki"
                        />
                    </div>
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Dodaj ogłoszenie</h2>
                            <input
                                value={newAnnouncement}
                                onChange={e => setNewAnnouncement(e.target.value)}
                                placeholder="Nowe ogłoszenie"
                            />
                            <button onClick={handleAddAnnouncement}>Dodaj ogłoszenie</button>
                        </div>
                    )}
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Dodaj książkę</h2>
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
                    )}
                    {role === 'czytelnik' && (
                        <>
                            <div>
                                <h2>Lista dostępnych książek</h2>
                                {books.map((book,i) => (
                                    book.available && (
                                        <div key={i}>
                                            <h3>{book.tytul}</h3>
                                            <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                            <p>Autor: {book.autor}</p>
                                            <p>Gatunek: {book.gatunek}</p>
                                            <p>Data publikacji: {book.publishDate}</p>
                                            <p>Streszczenie: {book.summary}</p>
                                            <button onClick={() => handleBorrowBook(i)}>Wypożycz</button>
                                        </div>
                                    )
                                ))}
                            </div>
                            <div>
                                <h2>Twoje wypożyczone książki</h2>
                                {borrowedBooks[username]?.map((book, i) => (
                                    <div key={i}>
                                        {!book.available && <p>Termin zwrotu: {book.dueDate?.toLocaleDateString()}</p>}
                                        <h3>{book.tytul}</h3>
                                        <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                        <p>Autor: {book.autor}</p>
                                        <p>Gatunek: {book.gatunek}</p>
                                        <p>Data publikacji: {book.publishDate}</p>
                                        <p>Streszczenie: {book.summary}</p>
                                        <button onClick={() => handleReturnBook(books.findIndex(b => b.tytul === book.tytul))}>Zwróć</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Lista książek</h2>
                            {books.map((book, i) => (
                                <div key={i}>
                                    <h3>{book.tytul}</h3>
                                    <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                    <p>Autor: {book.autor}</p>
                                    <p>Gatunek: {book.gatunek}</p>
                                    <p>Data publikacji: {book.publishDate}</p>
                                    <p>Streszczenie: {book.summary}</p>
                                    <>
                                        <button onClick={() => handleEditBook(i)}>Edytuj</button>
                                        <button onClick={() => handleDeleteBook(i)}>Usuń</button>
                                    </>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div>
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
                    <button onClick={handleLogin}>Zaloguj</button>
                    <button onClick={() => handleRegister('czytelnik')}>Zarejestruj jako czytelnik</button>
                    <button onClick={() => handleRegister('bibliotekarz')}>Zarejestruj jako bibliotekarz</button>
                </div>
            )}
        </div>
    );
}

export default App;

Dlaczego kod nie wyświetla u czytelnika aktualnie wypożyczonych książek, popraw kod !

ChatGPT
Wydaje się, że problemem jest sposób, w jaki zarządzasz stanem "borrowedBooks" - a konkretnie jego strukturą.

W zależności od struktury "books", powinieneś być w stanie zaindeksować daną książkę na podstawie jej właściwości, a nie indeksu. To jest dlatego, że indeks książki może ulec zmianie w miarę jak książki są dodawane i usuwane, a jest używany do identyfikacji konkretnej książki.

Proponuję niewielką zmianę w kodzie:

javascript
Copy code
const handleBorrowBook = (book) => {
    const newBooks = [...books];
    const index = newBooks.indexOf(book);
    newBooks[index] = {...newBooks[index], available: false, dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1))};
    setBooks(newBooks);
    setBorrowedBooks({...borrowedBooks, [username]: (borrowedBooks[username] || []).concat(newBooks[index])})
};

const handleReturnBook = (book) => {
    const newBooks = [...books];
    const index = newBooks.indexOf(book);
    newBooks[index] = {...newBooks[index], available:true, dueDate: null};
    setBooks(newBooks);
    setBorrowedBooks({...borrowedBooks, [username]: (borrowedBooks[username] || []).filter(b => b.tytul !== book.tytul)});
};
Oraz zmiany w renderowaniu książek dla czytelnika:

javascript
Copy code
    <div>
        <h2>Lista dostępnych książek</h2>
        {books.map((book,i) => (
            book.available && (
                <div key={i}>
                    {/* reszta kodu */}
                    <button onClick={() => handleBorrowBook(book)}>Wypożycz</button>
                </div>
            )
        ))}
    </div>
    <div>
        <h2>Twoje wypożyczone książki</h2>
        {borrowedBooks[username]?.map((book, i) => (
            <div key={i}>
                {/* reszta kodu */}
                <button onClick={() => handleReturnBook(book)}>Zwróć</button>
            </div>
        ))}
    </div>
Teraz w przypadku funkcji "handleBorrowBook" oraz "handleReturnBook", zamiast korzystać z indeksu tablicy, przekazujesz cały obiekt "book", dzięki czemu masz pewność, że działasz na właściwej książce.

Podobna zmiana powinna być zastosowana również dla bibliotekarza w funkcji "handleDeleteBook", "handleEditBook", "handleEditApproval".





User
import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
    const [dueDate, setDueDate] = useState('');
    const [borrowedBooks, setBorrowedBooks] = useState({});
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const[bookCover, setBookCover] = useState('');
    const [bookSummary, setBookSummary] = useState('');
    const [bookPublishDate, setBookPublishDate] = useState('');


    const handleLogin = () => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            setIsLoggedIn(true);
            setRole(user.role);
        }
        else alert('Niepoprawna nazwa użytkownika lub hasło');
    };
    const  handleRegister = (role) => {
        setUsers([...users, {username, password, role}]);
        setUsername('');
        setPassword('');
    };
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
        if (newUsername && !users.find(user => user.username === newUsername)) {
            setUsers(users.map(user => user.username === username ? {...user, username: newUsername} : user));
            setUsername(newUsername);
            setNewUsername('');
        } else {
            alert('Nazwa użytkownika jest pusta lub zajęta');
        }
    }

    const handleChangePassword = () => {
        if (newPassword) {
            setUsers(users.map(user => user.username === username ? {...user, password: newPassword} : user));
            setPassword(newPassword);
            setNewPassword('');
        } else {
            alert('Hasło jest puste')
        }
    };
    const handleAddAnnouncement = () => {
        setAnnouncements([...announcements, newAnnouncement]);
        setNewAnnouncement('');
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
    const handleEditBook = (index) => {
        setEditBook(index);
        setBookTitle(books[index].tytul);
        setBookAuthor(books[index].autor);
        setBookGenre('');
        setBookCover('');
        setBookSummary('');
        setBookPublishDate('')
    }
    const handleEditApproval = () => {
        const newBooks = [...books];
        newBooks[editBook] = {tytul: bookTitle, autor: bookAuthor, gatunek: bookGenre, okladka:bookCover, streszczenie:bookSummary, data: setBookPublishDate()};
        setBooks(newBooks);
        setEditBook(null);
        setBookTitle('');
        setBookAuthor('');
        setBookGenre('');
        setBookCover()
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


    const filteredBooks = books.filter((book) => {
        return book.tytul.includes(search) || book.autor.includes(search) || book.gatunek.includes(search);
    })

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h1> Witaj, {username}</h1>
                    <h2>Jesteś zalogowany jako: {role}</h2>
                    <button onClick={handleLogOut}>Wyloguj</button>
                    <div>
                        <h2>Ogłoszenia</h2>
                        {announcements.map((announcements, i) => (
                            <div key={i}>{announcements}</div>
                        ))}
                    </div>

                    <div>
                        <h2>Zarządzanie kontem</h2>
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
                        />
                        <button onClick={handleChangePassword}>Zmień hasło</button>
                        <button onClick={handleDeleteAccount}>Usuń konto</button>
                    </div>
                    <div>
                        <h2>Wyszukaj książkę</h2>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Szukaj książki"
                        />
                    </div>
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Dodaj ogłoszenie</h2>
                            <input
                                value={newAnnouncement}
                                onChange={e => setNewAnnouncement(e.target.value)}
                                placeholder="Nowe ogłoszenie"
                            />
                            <button onClick={handleAddAnnouncement}>Dodaj ogłoszenie</button>
                        </div>
                    )}
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Dodaj książkę</h2>
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
                    )}
                    {role === 'czytelnik' && (
                        <>
                            <div>
                                <h2>Lista dostępnych książek</h2>
                                {filteredBooks.map((book,i) => (
                                    book.available && (
                                        <div key={i}>
                                            <h3>{book.tytul}</h3>
                                            <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                            <p>Autor: {book.autor}</p>
                                            <p>Gatunek: {book.gatunek}</p>
                                            <p>Data publikacji: {book.publishDate}</p>
                                            <p>Streszczenie: {book.summary}</p>
                                            <button onClick={() => handleBorrowBook(i)}>Wypożycz</button>
                                        </div>
                                    )
                                ))}
                            </div>
                            <div>
                                <h2>Twoje wypożyczone książki</h2>
                                {borrowedBooks[username]?.map((book, i) => (
                                    <div key={i}>
                                        {!book.available && <p>Termin zwrotu: {book.dueDate?.toLocaleDateString()}</p>}
                                        <h3>{book.tytul}</h3>
                                        <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                        <p>Autor: {book.autor}</p>
                                        <p>Gatunek: {book.gatunek}</p>
                                        <p>Data publikacji: {book.publishDate}</p>
                                        <p>Streszczenie: {book.summary}</p>
                                        <button onClick={() => handleReturnBook(books.findIndex(b => b.tytul === book.tytul))}>Zwróć</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Lista książek</h2>
                            {books.map((book, i) => (
                                <div key={i}>
                                    <h3>{book.tytul}</h3>
                                    <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                    <p>Autor: {book.autor}</p>
                                    <p>Gatunek: {book.gatunek}</p>
                                    <p>Data publikacji: return book.tytul{book.publishDate}</p>
                                    <p>Streszczenie: {book.summary}</p>
                                    <>
                                        <button onClick={() => handleEditBook(i)}>Edytuj</button>
                                        <button onClick={() => handleDeleteBook(i)}>Usuń</button>
                                    </>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div>
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
                    <button onClick={handleLogin}>Zaloguj</button>
                    <button onClick={() => handleRegister('czytelnik')}>Zarejestruj jako czytelnik</button>
                    <button onClick={() => handleRegister('bibliotekarz')}>Zarejestruj jako bibliotekarz</button>
                </div>
            )}
        </div>
    );
}

export default App;

Dlaczego w tym kodzie nie wyświelta okładki, daty publikacji i streszczenia książki

ChatGPT
This code is the main component of a React library management application. The user can log in either as a reader ('czytelnik') or as a librarian ('bibliotekarz'). The functionalities for each role vary:

The reader can:

Borrow a book.
Return a borrowed book.
Browse the list of available books.
Search for a book based on title, author, or genre.
View their borrowed books and the due dates.
Manage their account (change username, password, delete account).
The librarian can:

Add, edit, and delete books.
Add announcements.
Manage their account (change username, password, delete account).
View all the books in the library.
The component uses React's useState hook to manage its state. The state includes variables such as isLoggedIn, username, password, users, role, books, editBook, bookTitle, bookAuthor, bookGenre, search, dueDate, borrowedBooks, newUsername, newPassword, announcements, newAnnouncement, bookCover, bookSummary, and bookPublishDate.

The functions in this component handle different actions like logging in, logging out, registering a user, deleting an account, changing username, changing password, adding an announcement, adding a book, deleting a book, editing a book, borrowing a book, and returning a book.

Finally, it returns the corresponding JSX based on whether the user is logged in or not, and if they are, whether they are a reader or a librarian.

Please let me know if you want to dive deeper into the code, any part of the application, or if you need help with something specific.





User
Po polsku i po prostu pokaż zmiany w kodzie

ChatGPT
Dobrze, poniżej przedstawiam zmienioną funkcję handleEditApproval oraz fragment kodu odpowiedzialny za wyświetlanie szczegółów książki podczas edycji.

jsx
Copy code
const handleEditApproval = () => {
    const newBooks = [...books];
    newBooks[editBook] = {tytul: bookTitle, autor: bookAuthor, gatunek: bookGenre, cover:bookCover, summary:bookSummary, publishDate: bookPublishDate};
    setBooks(newBooks);
    setEditBook(null);
    setBookTitle('');
    setBookAuthor('');
    setBookGenre('');
    setBookCover('');
    setBookSummary('');
    setBookPublishDate('');
}
Aby poprawnie wyświetlać dane książki podczas edycji, zmieniłem tę część kodu:

jsx
Copy code
{role === 'bibliotekarz' && (
        <div>
            <h2>Dodaj książkę</h2>
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
    )}
Powyższe zmiany powinny naprawić problem z edycją książki. W funkcji handleEditApproval wprowadzam wszystkie pola książki, które są edytowane, a nie tylko jej tytuł. Podobnie, w sekcji dotyczącej edycji książki wprowadzam aktualne wartości do pól input, dzięki czemu użytkownik widzi pełne informacje o książce, którą edytuje.





User
import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
    const [dueDate, setDueDate] = useState('');
    const [borrowedBooks, setBorrowedBooks] = useState({});
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    const [newAnnouncement, setNewAnnouncement] = useState('');
    const[bookCover, setBookCover] = useState('');
    const [bookSummary, setBookSummary] = useState('');
    const [bookPublishDate, setBookPublishDate] = useState('');


    const handleLogin = () => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            setIsLoggedIn(true);
            setRole(user.role);
        }
        else alert('Niepoprawna nazwa użytkownika lub hasło');
    };
    const  handleRegister = (role) => {
        setUsers([...users, {username, password, role}]);
        setUsername('');
        setPassword('');
    };
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
        if (newUsername && !users.find(user => user.username === newUsername)) {
            setUsers(users.map(user => user.username === username ? {...user, username: newUsername} : user));
            setUsername(newUsername);
            setNewUsername('');
        } else {
            alert('Nazwa użytkownika jest pusta lub zajęta');
        }
    }

    const handleChangePassword = () => {
        if (newPassword) {
            setUsers(users.map(user => user.username === username ? {...user, password: newPassword} : user));
            setPassword(newPassword);
            setNewPassword('');
        } else {
            alert('Hasło jest puste')
        }
    };
    const handleAddAnnouncement = () => {
        setAnnouncements([...announcements, newAnnouncement]);
        setNewAnnouncement('');
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
    const handleEditBook = (index) => {
        setEditBook(index);
        setBookTitle(books[index].tytul);
        setBookAuthor(books[index].autor);
        setBookGenre('');
        setBookCover('');
        setBookSummary('');
        setBookPublishDate('')
    }
    const handleEditApproval = () => {
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


    const filteredBooks = books.filter((book) => {
        return book.tytul.includes(search) || book.autor.includes(search) || book.gatunek.includes(search);
    })

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h1> Witaj, {username}</h1>
                    <h2>Jesteś zalogowany jako: {role}</h2>
                    <button onClick={handleLogOut}>Wyloguj</button>
                    <div>
                        <h2>Ogłoszenia</h2>
                        {announcements.map((announcements, i) => (
                            <div key={i}>{announcements}</div>
                        ))}
                    </div>

                    <div>
                        <h2>Zarządzanie kontem</h2>
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
                        />
                        <button onClick={handleChangePassword}>Zmień hasło</button>
                        <button onClick={handleDeleteAccount}>Usuń konto</button>
                    </div>
                    <div>
                        <h2>Wyszukaj książkę</h2>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Szukaj książki"
                        />
                    </div>
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Dodaj ogłoszenie</h2>
                            <input
                                value={newAnnouncement}
                                onChange={e => setNewAnnouncement(e.target.value)}
                                placeholder="Nowe ogłoszenie"
                            />
                            <button onClick={handleAddAnnouncement}>Dodaj ogłoszenie</button>
                        </div>
                    )}
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Dodaj książkę</h2>
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
                    )}
                    {role === 'czytelnik' && (
                        <>
                            <div>
                                <h2>Lista dostępnych książek</h2>
                                {filteredBooks.map((book,i) => (
                                    book.available && (
                                        <div key={i}>
                                            <h3>{book.tytul}</h3>
                                            <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                            <p>Autor: {book.autor}</p>
                                            <p>Gatunek: {book.gatunek}</p>
                                            <p>Data publikacji: {book.publishDate}</p>
                                            <p>Streszczenie: {book.summary}</p>
                                            <button onClick={() => handleBorrowBook(i)}>Wypożycz</button>
                                        </div>
                                    )
                                ))}
                            </div>
                            <div>
                                <h2>Twoje wypożyczone książki</h2>
                                {borrowedBooks[username]?.map((book, i) => (
                                    <div key={i}>
                                        {!book.available && <p>Termin zwrotu: {book.dueDate?.toLocaleDateString()}</p>}
                                        <h3>{book.tytul}</h3>
                                        <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                        <p>Autor: {book.autor}</p>
                                        <p>Gatunek: {book.gatunek}</p>
                                        <p>Data publikacji: {book.publishDate}</p>
                                        <p>Streszczenie: {book.summary}</p>
                                        <button onClick={() => handleReturnBook(books.findIndex(b => b.tytul === book.tytul))}>Zwróć</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Lista książek</h2>
                            {books.map((book, i) => (
                                <div key={i}>
                                    <h3>{book.tytul}</h3>
                                    <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                    <p>Autor: {book.autor}</p>
                                    <p>Gatunek: {book.gatunek}</p>
                                    <p>Data publikacji: return book.tytul{book.publishDate}</p>
                                    <p>Streszczenie: {book.summary}</p>
                                    <>
                                        <button onClick={() => handleEditBook(i)}>Edytuj</button>
                                        <button onClick={() => handleDeleteBook(i)}>Usuń</button>
                                    </>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div>
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
                    <button onClick={handleLogin}>Zaloguj</button>
                    <button onClick={() => handleRegister('czytelnik')}>Zarejestruj jako czytelnik</button>
                    <button onClick={() => handleRegister('bibliotekarz')}>Zarejestruj jako bibliotekarz</button>
                </div>
            )}
        </div>
    );
}

export default App;

Zmień kod tak, aby po kliknięciu na daną książkę wyświetlało o niej szczegółowe informacje(zdjęcie okładki, streszczenie, date publikacji)

ChatGPT
!
The message you submitted was too long, please reload the conversation and submit something shorter.

2 / 2





There was an error generating a response

Regenerate response
ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 24 Version
ChatGPT

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
                    )}
                    {role === 'czytelnik' && (
                        <>
                            <div>
                                <h2>Lista dostępnych książek</h2>
                                {filteredBooks.map((book,i) => (
                                    book.available && (
                                        <div key={i}>
                                            <h3>{book.tytul}</h3>
                                            <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                            <p>Autor: {book.autor}</p>
                                            <p>Gatunek: {book.gatunek}</p>
                                            <p>Data publikacji: {book.publishDate}</p>
                                            <p>Streszczenie: {book.summary}</p>
                                            <button onClick={() => handleBorrowBook(i)}>Wypożycz</button>
                                        </div>
                                    )
                                ))}
                            </div>
                            <div>
                                <h2>Twoje wypożyczone książki</h2>
                                {borrowedBooks[username]?.map((book, i) => (
                                    <div key={i}>
                                        {!book.available && <p>Termin zwrotu: {book.dueDate?.toLocaleDateString()}</p>}
                                        <h3>{book.tytul}</h3>
                                        <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                        <p>Autor: {book.autor}</p>
                                        <p>Gatunek: {book.gatunek}</p>
                                        <p>Data publikacji: {book.publishDate}</p>
                                        <p>Streszczenie: {book.summary}</p>
                                        <button onClick={() => handleReturnBook(books.findIndex(b => b.tytul === book.tytul))}>Zwróć</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    {role === 'bibliotekarz' && (
                        <div>
                            <h2>Lista książek</h2>
                            {books.map((book, i) => (
                                <div key={i}>
                                    <h3>{book.tytul}</h3>
                                    <img src={book.cover} alt={`Okładka książki ${book.tytul}`} />
                                    <p>Autor: {book.autor}</p>
                                    <p>Gatunek: {book.gatunek}</p>
                                    <p>Data publikacji: return book.tytul{book.publishDate}</p>
                                    <p>Streszczenie: {book.summary}</p>
                                    <>
                                        <button onClick={() => handleEditBook(i)}>Edytuj</button>
                                        <button onClick={() => handleDeleteBook(i)}>Usuń</button>
                                    </>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div>
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
                    <button onClick={handleLogin}>Zaloguj</button>
                    <button onClick={() => handleRegister('czytelnik')}>Zarejestruj jako czytelnik</button>
                    <button onClick={() => handleRegister('bibliotekarz')}>Zarejestruj jako bibliotekarz</button>
                </div>
            )}
        </div>
    );
}

export default App;

