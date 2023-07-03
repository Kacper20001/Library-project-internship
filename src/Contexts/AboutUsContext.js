import React, { createContext, useState } from 'react';

export const AboutUsContext = createContext();

export const AboutProvider = ({ children }) => {
    const [text, setText] = useState(`Welcome to the Library Network, a place where knowledge, fantasy and discovery meet in harmony. We are a network of libraries that offer unique thematic sections, providing an extraordinary reading experience for everyone.
    
Our libraries are full of exciting books, digital resources and other materials that enrich the mind and lead us on a journey of discovery. From magical worlds and legends to science and technology, from historical adventures to eternal works of literature, we have everything you need to immerse yourself in fascinating worlds.
    
Our network of librarians is a team of dedicated and knowledgeable professionals who are ready to serve you. We are happy to help you find the right materials, provide reading tips and provide an inspiring atmosphere for your reading adventure.
    
It doesn't matter if you are a magic lover, discovering scientific secrets or wandering around history - in the Libraries Network you will find the right section for you. We invite you to explore the countless possibilities that await you in our libraries.
    
Join our library community and let yourself be carried away by the fascinating worlds that await you. We invite you to discover, learn and enjoy literature together. Let each visit to the Libraries Network become a unique experience that will open the door to infinite possibilities of knowledge and imagination.`);
    return (
        <AboutUsContext.Provider value={{ text, setText }}>
            {children}
        </AboutUsContext.Provider>
    );
};
