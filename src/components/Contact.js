import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = () => {
    const contacts = [
        {
            image: "https://cdn.pixabay.com/photo/2013/04/30/15/29/woburn-108205_1280.jpg",
            name: "Dział \"Eksploratorium Wiedzy\"",
            address: 'ul. Niepodległości 5, 35-012 Rzeszów',
            phone: "666666666",
            email: "osoba1@example.com"
        },
        {
            image: 'https://cdn.pixabay.com/photo/2016/08/23/00/31/university-of-alabama-1613275_1280.jpg',
            name: "Dział \"Oaza Literatury\"",
            address: 'Ul. Małopolska 8, 32-012 Kraków',
            phone: "777777777",
            email: "osoba2@example.com"
        },
        {
            image: 'https://cdn.pixabay.com/photo/2013/08/19/22/33/geisel-library-174106_1280.jpg',
            name: "Dział \"Oaza Literatury\"",
            address: 'Ul. Średnia 15, 12-060 Warszawa',
            phone: "888888888",
            email: "osoba3@example.com"
        }
    ];

    const handleContactClick = (contactType, value) => {
        if (contactType === 'phone') {
            window.location.href = `tel:${value}`;
        } else if (contactType === 'email') {
            window.location.href = `mailto:${value}`;
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                {contacts.map((contact, index) => (
                    <div key={index} className="col-12 col-md-4">
                        <div className="card h-100 shadow-lg mb-2">
                            <img className="card-img-top" src={contact.image} alt="Branch" />
                            <div className="card-body" style={{ padding: '10px' }}>
                                <h5 className="card-title">{contact.name}</h5>
                                <p className="card-text">
                                    <strong>Address:</strong> {contact.address} <br />
                                    <strong>Phone:</strong>{" "}
                                    <a
                                        href={`tel:${contact.phone}`}
                                        onClick={() => handleContactClick('phone', contact.phone)}
                                        className="text-decoration-none text-dark"
                                    >
                                        {contact.phone}
                                    </a>
                                    <br />
                                    <strong>Email:</strong>{" "}
                                    <a
                                        href={`mailto:${contact.email}`}
                                        onClick={() => handleContactClick('email', contact.email)}
                                        className="text-decoration-none text-dark"
                                    >
                                        {contact.email}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contact;
