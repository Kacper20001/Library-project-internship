import React, { createContext, useState } from "react";

export const ContestsContext = createContext();

export const ContestsProvider = ({ children }) => {
    const [contestsData, setContestsData] = useState([
        {
            title: 'Konkurs recytatorski',
            description: 'Zapraszamy do udziału w konkursie recytatorskim, gdzie możesz zaprezentować swoje umiejętności aktorskie.',
            deadline: '2023-07-10'
        },
        {
            title: 'Konkurs literacki',
            description: 'Nadsyłaj swoje opowiadania i wiersze na temat miłości, a najlepsze prace zostaną opublikowane w naszej gazetce.',
            deadline: '2023-07-05'
        },
        {
            title: 'Konkurs quizowy',
            description: 'Sprawdź swoją wiedzę z różnych dziedzin, biorąc udział w naszym konkursie quizowym. Czekają atrakcyjne nagrody.',
            deadline: '2023-07-15'
        }
    ]);

    const updateContestsData = (updatedContestsData) => {
        setContestsData(updatedContestsData);
    };

    const addContest = (newContest) => {
        setContestsData((prevContestsData) => [...prevContestsData, newContest]);
    };

    const editContest = (index, editedContest) => {
        setContestsData((prevContestsData) => {
            const updatedContestsData = [...prevContestsData];
            updatedContestsData[index] = editedContest;
            return updatedContestsData;
        });
    };

    const deleteContest = (index) => {
        setContestsData((prevContestsData) => {
            const updatedContestsData = [...prevContestsData];
            updatedContestsData.splice(index, 1);
            return updatedContestsData;
        });
    };

    return (
        <ContestsContext.Provider
            value={{ contestsData, updateContestsData, addContest, editContest, deleteContest }}
        >
            {children}
        </ContestsContext.Provider>
    );
};
