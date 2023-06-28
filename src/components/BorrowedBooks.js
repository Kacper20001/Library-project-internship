import React, { useContext } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { UserContext } from '../UserContext';
import { BooksContext } from '../BooksContext';
import { Button } from 'react-bootstrap';

const BorrowedBooks = () => {
    const { loggedInUser, setUsers, users, setLoggedInUser } = useContext(UserContext);
    const { books, setBooks } = useContext(BooksContext);

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
            formatter: (cell, row) => {
                return (
                    <Button onClick={() => returnBook(row)}>Return</Button>
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
        </div>
    );
};
export default BorrowedBooks;
