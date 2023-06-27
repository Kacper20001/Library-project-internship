import React, { createContext, useState } from 'react';

export const BooksContext = createContext();

export const BooksProvider = props => {
    const [books,setBooks] = useState([
        { id:1, tytul: 'Wiedźmin', autor: 'Andrzej Sapkowski', gatunek: 'Fantastyka', available: true, cover:'https://www.gloskultury.pl/wp-content/uploads/2019/12/wied%C5%BAmin-plakat.jpg', summary:'Świat Ciri i wiedźmina ogarniają płomienie. Nastał zapowiadany przez Ithlinne czas miecza i topora. Czas pogardy. A w czasach pogardy na powierzchnię wypełzają Szczury. Szczury atakujące po szczurzemu, cicho, zdradziecko i okrutnie. Szczury uwielbiające dobrą zabawę i zabijanie. To maruderzy z rozbitych armii, zabłąkane dzieciaki, zgwałcone dziewczyny, wieśniacy, których obejścia spalono, a rodziny wymordowano. Wyrzutki, dziwna zbieranina stworzona przez wojnę i na wojennym nieszczęściu żerująca. Ludzie, którzy wszystko przeżyli, wszystko utracili, którym śmierć już niestraszna. Przyodziani w zrabowane błyskotki, solidarni w biedzie i nieszczęściu, dla obcych zaś mający tylko to, czego sami zaznali od pogrążającego się w chaosie świata. Pogardę.', publishDate: '2012'  },
        { id:2, tytul: '1984', autor: 'George Orwell', gatunek: 'Fikcja dystopijna', available: true, cover:'https://ecsmedia.pl/c/14973575652531918-jpg-gallery.big-iext49966708.jpg', summary:'Okrutna i sugestywna wizja świata, w którym rządzi przemoc i strach, a władza panuje nie tylko nad losem człowieka, ale też nad jego myślami i uczuciami. Boleśnie aktualna opowieść o pragnieniu władzy i konsekwencjach jej nadużywania.', publishDate: 2000 },
        { id:3, tytul: 'Hobbit', autor: 'J.R.R. Tolkien', gatunek: 'Fantastyka', available: true, cover: 'https://ecsmedia.pl/c/hobbit-b-iext120945557.jpg', summary:'“Hobbit, czyli tam i z powrotem” to historia fantastycznego świata pełnego krasnoludów, elfów i smoków. Przeżyj wraz z Bilbo Bagginsem przygodę życia i sprawdź, czy odzyska wielki skarb!', publishDate: 1940  }
    ])

    return (
        <BooksProvider value={{books, setBooks}}>
            {props.children}
        </BooksProvider>
    );
};