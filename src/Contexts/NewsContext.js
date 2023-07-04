import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const [newsData, setNewsData] = useState([
        {
            title: 'New Books',
            content: 'We have expanded our book collection with the latest titles and bestsellers, offering a diverse range of genres and subjects. Our goal is to provide our readers with a wide selection of books to cater to their interests and preferences. Whether you\'re a fan of fiction, non-fiction, thrillers, romance, or self-help, you\'ll find something new and exciting in our expanded collection. We continuously strive to stay up-to-date with the literary world, ensuring that our readers have access to the most popular and sought-after books available. Explore our expanded collection and embark on new reading adventures today.'
        },
        {
            title: 'Reading competition',
            content: 'We cordially invite you to take part in our thrilling reading competition, where you have the chance to win incredible prizes. Engage in a captivating literary journey as you explore a diverse selection of books and showcase your reading prowess. Immerse yourself in intriguing stories, thought-provoking narratives, and fascinating characters as you compete with fellow book enthusiasts. With attractive rewards awaiting the winners, this competition promises an exciting and rewarding experience for all participants. Join us in this literary adventure and test your reading skills for a chance to claim fantastic prizes.',
        },
        {
            title: 'Author\'s meeting',
            content: 'Mark your calendars for a special event! On Friday, 07-07-2023, at 16:00, we are delighted to announce a captivating meeting with the esteemed author behind the best-selling series of crime novels. Prepare to dive into the thrilling world of mystery and suspense as the author shares insights into their creative process, characters, and the inspiration behind their acclaimed works. This exclusive opportunity allows you to interact directly with the mastermind behind the gripping narratives that have captured the imaginations of readers worldwide. Don\'t miss out on this extraordinary event and the chance to gain valuable insights from the brilliant mind behind the best-selling crime series.'
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
