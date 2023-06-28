import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Contests = () => {
    const contestsData = [
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
    ];

    const contestCards = contestsData.map((contest, index) => (
        <div className="card" key={index}>
            <div className="card-body">
                <h5 className="card-title">{contest.title}</h5>
                <p className="card-text">{contest.description}</p>
                <p className="card-deadline">Termin zgłoszeń: {contest.deadline}</p>
            </div>
        </div>
    ));

    return (
        <div className="contests">
            <h3>Aktualne konkursy</h3>
            <div className="card-container">{contestCards}</div>
        </div>
    );
};

export default Contests;
