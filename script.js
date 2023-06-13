import React, { useState } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');
    const [books, setBooks] = useState([]);
    const [editBook, setEditBook] = useState(null);
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [cart,setCart] = useState([]);
    const [filterBooks, setFilterBooks] = useState([]);
    const [search, setSearch] = useState('');

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
    const handleAddtoCart = (book) => {
        setCart([...cart, book]);
    };
    const handleDeletefromCart = (index) => {
        setCart(cart.filter((_,i) => i !== index));
    };
    const handleSearching = (e) => {
        const szukaj = e.target.value;
        setSearch(search);
        if(search === '') {
            setFilterBooks(books);
        } else {
            setFilterBooks(books.filter(book => book.tytul.toLowerCase().includes(szukaj.toLowerCase())));
        }
    };
    const handleAddBook = () => {
        setBooks([...books, {tytul: bookTitle, autor: bookAuthor}]);
        setBookTitle('');
        setBookAuthor('');
    };

    const handleDeleteBook = (index) => {
        setBooks(books.filter((_,i) => i !== index));
    };
    const handleEditBook = (index) => {
        setEditBook(index);
        setBookTitle(books[index].tytul);
        setBookAuthor(books[index].autor);
    }
    const handleEditApproval = () => {
        const newBooks = [...books];
        newBooks[editBook] = {tytul: bookTitle, autor: bookAuthor};
        setBooks(newBooks);
        setEditBook(null);
        setBookTitle('');
        setBookAuthor('');
    }
    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h1> Witaj, {username}</h1>
                    <h2>Jesteś zalogowany jako: {role}</h2>
                    <button onClick={handleLogOut}>Wyloguj</button>
                    {rola === 'bibliotekarz' && (
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
                            <button onClick={handleAddBook}>Dodaj książkę</button>
                            {editBook !== null && (
                                <button onClick={handleEditApproval}>Zatwierdź edycję</button>
                            )}
                        </div>
                    )}
                    <h2>Lista książek</h2>
                    {books.map((book, i) => (
                        <div key{i}>
                            <span>{book.tytul} - {book.autor}</span>
                            {rola === 'bibliotekarz' && (
                                <>
                                    <button onClick={() => handleEditBook(i)}>Edytuj</button>
                                    <button onClick={() => handleDeleteBook(i)}>Usuń</button>
                                </>
                            )}
                        </div>
                    ))}
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
                    <button onClick={() => handleRegister('bibliotekarz')}>Zarejestruj jako użytkownik</button>
                </div>
            )}
        </div>
    );
}


export default App;