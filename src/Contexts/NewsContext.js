import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [newsData, setNewsData] = useState([
        {
            title: 'New Books',
            content: 'We have expanded our book collection with the latest titles'
        },
        {
            title: 'Reading competition',
            content: 'We invite you to participate in a reading competition in which you can win attractive prizes',
        },
        {
            title: 'Author\'s meeting',
            content: 'On Friday, 07-07-2023 at 16:00 there will be a meeting with the author of the best-selling series of crime novels',
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
