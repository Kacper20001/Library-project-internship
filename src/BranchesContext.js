import React, { createContext, useState } from 'react';

export const BranchesContext = createContext();

export const BranchesProvider = ({ children }) => {
    const [expandedCards, setExpandedCards] = useState([]);

    const toggleCardExpansion = (index) => {
        if (expandedCards.includes(index)) {
            setExpandedCards(expandedCards.filter((cardIndex) => cardIndex !== index));
        } else {
            setExpandedCards([...expandedCards, index]);
        }
    };

    return (
        <BranchesContext.Provider value={{ expandedCards, toggleCardExpansion }}>
            {children}
        </BranchesContext.Provider>
    );
};
