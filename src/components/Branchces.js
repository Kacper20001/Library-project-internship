import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Branchces = () => {
    const branchces = [
        {
            address: 'ul. Niepodległości 5, 35-012 Rzeszów',
            image : "https://cdn.pixabay.com/photo/2013/04/30/15/29/woburn-108205_1280.jpg",
            description: 'Dział "Eksploratorium Wiedzy" w naszym działu "Eksploratorium Wiedzy" w sercu Rzeszowa! Ta biblioteka jest domem dla unikalnych zbiorów naukowych i technologicznych. Odkryj fascynujące eksponaty, interaktywne wystawy i najnowsze publikacje z dziedziny nauki i technologii. Przeżyj wspaniałą przygodę poznawania i eksploracji wiedzy w otoczeniu dynamicznego miasta.',

        },
        {
            address: 'Ul. Małopolska 8, 32-012 Kraków',
            image: 'https://cdn.pixabay.com/photo/2016/08/23/00/31/university-of-alabama-1613275_1280.jpg',
            description: 'Dział "Oaza Literatury": Zapraszamy do naszego działa "Oaza Literatury" w magicznym Krakowie! Ta biblioteka to miejsce, gdzie literatura łączy się z estetyką i spokojem. Odkryj bogactwo japońskiej i światowej literatury, zanurz się w kulturze i tradycjach tego fascynującego kraju. Ciesz się atmosferą ciszy i kontemplacji, która umożliwi Ci odkrywanie nowych światów w odosobnieniu od miejskiego zgiełku.',
        },
        {
            address: 'Ul. Średnia 15, 12-060 Warszawa',
            image: 'https://cdn.pixabay.com/photo/2013/08/19/22/33/geisel-library-174106_1280.jpg',
            description: 'Dział "Kraina Baśni i Legend" (Edynburg, Szkocja): Witamy w dziale "Kraina Baśni i Legend" w urokliwej Warszawie! Ta biblioteka przeniesie Cię w świat magii, mitów i baśni. Odkryj starożytne teksty, opowieści szkockich legend i historii zamków i rycerzy. Zanurz się w atmosferze mistycznego Szkocji i pozostaw się ponieść wyobraźni, podążając śladami bohaterów fantastycznych opowieści. Przygotuj się na niezapomniane podróże przez czas i przestrzeń.',
        },
    ];

    const [expandedCards, setExpandedCards] = useState([]);

    const toggleCardExpansion = (index) => {
        if (expandedCards.includes(index)) {
            setExpandedCards(expandedCards.filter((cardIndex) => cardIndex !== index));
        } else {
            setExpandedCards([...expandedCards, index]);
        }
    };

    return (
        <div className="container">
            <div className="row">
                {branchces.map((branch, index) => (
                    <div key={index} className="col-md-3 mb-6">
                        <div className="card h-100" style={{maxWidth: "300px", margin: "auto"}}>
                            <img className="card-img-top" src={branch.image} alt="Branch" style={{ width: '100%', maxHeight: '200px' }} />
                            <div className="card-body">
                                <h4 className="card-title">{branch.address}</h4>
                                {expandedCards.includes(index) ? (
                                    <p className="card-text">{branch.description}</p>
                                ) : (
                                    <p className="card-text">{branch.description.substring(0, 100)}...</p>
                                )}
                                <button
                                    className="btn btn-primary"
                                    onClick={() => toggleCardExpansion(index)}
                                >
                                    {expandedCards.includes(index) ? 'Zwiń' : 'Rozwiń'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Branchces;
