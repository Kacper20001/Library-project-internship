import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [newsData, setNewsData] = useState([
        {
            title: 'Nowe książki',
            content: 'Rozszerzyliśmy naszą kolekcję książek o najnowsze tytuły.',
        },
        {
            title: 'Konkurs czytelniczy',
            content: 'Zapraszamy do udziału w konkursie czytelniczym, w którym możesz wygrać atrakcyjne nagrody.',
        },
        {
            title: 'Spotkanie autorskie',
            content: 'W piątek 07-07-2023 o godzinie 16:00 odbędzie się spotkanie z autorem bestsellerowej serii powieści kryminalnych.',
        },
    ]);

    const updateNewsData = (updatedNewsData) => {
        setNewsData(updatedNewsData);
    };

    const addNewsPost = (newPost) => {
        setNewsData((prevNewsData) => [...prevNewsData, newPost]);
    };

    const deleteNewsPost = (index) => {
        setNewsData((prevNewsData) => {
            const updatedNewsData = [...prevNewsData];
            updatedNewsData.splice(index, 1);
            return updatedNewsData;
        });
    };

    return (
        <NewsContext.Provider value={{ newsData, updateNewsData, addNewsPost, deleteNewsPost }}>
            {children}
        </NewsContext.Provider>
    );
};
