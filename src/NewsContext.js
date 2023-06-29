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

    return (
        <NewsContext.Provider value={{ newsData, updateNewsData }}>
            {children}
        </NewsContext.Provider>
    );
};
