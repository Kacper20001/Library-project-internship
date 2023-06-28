import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const News = () => {
    const newsData = [
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
        }
    ];

    const newsCards = newsData.map((news, index) => (
        <div className="card" key={index}>
            <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                <p className="card-text">{news.content}</p>
            </div>
        </div>
    ));

    return (
        <div className="library-news">
            <h3>Aktualności biblioteczne</h3>
            <div className="card-container">{newsCards}</div>
        </div>
    );
};

export default News;