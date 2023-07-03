import React, { createContext, useState } from 'react';

export const BranchesContext = createContext();
export const BranchesProvider = ({ children }) => {
    const [newsData, setNewsData] = useState([
        {
            address: 'ul. Niepodległości 5, 35-012 Rzeszów',
            image: "https://cdn.pixabay.com/photo/2013/04/30/15/29/woburn-108205_1280.jpg",
            description: 'The Knowledge Exploratory department in the heart of Rzeszów! This library is home to unique science and technology collections. Discover fascinating exhibits, interactive exhibitions and the latest science and technology publications. Experience a great adventure of learning and exploring knowledge in a dynamic city setting.',
        },
        {
            address: 'Ul. Małopolska 8, 32-012 Kraków',
            image: 'https://cdn.pixabay.com/photo/2016/08/23/00/31/university-of-alabama-1613275_1280.jpg',
            description: '\'Oasis of Literature\': Welcome to our \'Oasis of Literature\' in magical Krakow! This library is a place where literature meets aesthetics and tranquility. Discover the wealth of Japanese and world literature, immerse yourself in the culture and traditions of this fascinating country. Enjoy the atmosphere of silence and contemplation that will allow you to discover new worlds away from the hustle and bustle of the city.',
        },
        {
            address: 'Ul. Średnia 15, 12-060 Warszawa',
            image: 'https://cdn.pixabay.com/photo/2013/08/19/22/33/geisel-library-174106_1280.jpg',
            description: 'Land of Fairy Tales and Legends\'  Welcome to the Land of Fairy Tales and Legends section in charming Warsaw! This library will take you to the world of magic, myths and fairy tales. Discover ancient texts, tales of Scottish legends and stories of castles and knights. Immerse yourself in the atmosphere of mystical Scotland and let your imagination run wild as you follow in the footsteps of the heroes of fantastic stories. Get ready for unforgettable journeys through time and space.',
        },
    ]);

    const updateNewsData = (updatedNewsData) => {
        setNewsData(updatedNewsData);
    };

    return (
        <BranchesContext.Provider value={{ newsData, updateNewsData }}>
            {children}
        </BranchesContext.Provider>
    );
};
