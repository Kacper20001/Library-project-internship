import React, { createContext, useState } from 'react';

export const ContestsContext = createContext();

export const ContestsProvider = ({ children }) => {
    const [contestsData, setContestsData] = useState([
        {
            title: 'Recitation contest',
            description: 'We invite you to participate in a recitation competition where you can present your acting skills.',            deadline: '2023-07-10'
        },
        {
            title: 'Literary competition',
            description: 'Send your stories and poems about love and the best works will be published in our newsletter.',            deadline: '2023-07-05'
        },
        {
            title: 'Quizz contest',
            description: 'Test your knowledge in various fields by taking part in our quiz competition. Attractive prizes await.',            deadline: '2023-07-15'
        }
    ]);

    const updateContestsData = (index, updatedContest) => {
        setContestsData(prevContestsData => {
            const updatedContestsData = [...prevContestsData];
            updatedContestsData[index] = updatedContest;
            return updatedContestsData;
        });
    };

    const addContest = (newContest) => {
        setContestsData((prevContestsData) => [...prevContestsData, newContest]);
    };

    const deleteContest = (index) => {
        setContestsData((prevContestsData) => {
            const updatedContestsData = [...prevContestsData];
            updatedContestsData.splice(index, 1);
            return updatedContestsData;
        });
    };

    return (
        <ContestsContext.Provider value={{ contestsData, updateContestsData, addContest, deleteContest }}>
            {children}
        </ContestsContext.Provider>
    );
};
