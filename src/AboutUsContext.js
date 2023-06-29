import React, { createContext, useState } from 'react';

export const AboutUsContext = createContext();

export const AboutProvider = ({ children }) => {
    const [text, setText] = useState(`Witamy w Sieci Bibliotek, miejscu, w którym wiedza, fantazja i odkrywanie spotykają się w harmonii. Jesteśmy siecią bibliotek, które oferują unikalne działy tematyczne, zapewniające niezwykłe doświadczenia czytelnicze dla każdego.
    
Nasze biblioteki są pełne pasjonujących książek, zasobów cyfrowych i innych materiałów, które wzbogacają umysł i prowadzą nas w podróż poznania. Od magicznych światów i legend po naukę i technologię, od przygód historycznych po wieczne dzieła literatury - mamy wszystko, czego potrzebujesz, aby zanurzyć się w fascynujących światach.
    
Nasza sieć bibliotekarzy to zespół oddanych i kompetentnych profesjonalistów, którzy są gotowi służyć Ci pomocą. Z przyjemnością pomożemy Ci znaleźć odpowiednie materiały, udzielimy wskazówek czytelniczych i zapewnimy inspirującą atmosferę dla Twojej przygody czytelniczej.
    
Nie ważne, czy jesteś miłośnikiem magii, odkrywającym naukowe sekrety czy snującym się po historii - w Sieci Bibliotek znajdziesz odpowiedni dział dla siebie. Zapraszamy do odkrywania niezliczonych możliwości, które czekają na Ciebie w naszych bibliotekach.
    
Dołącz do naszej bibliotecznej społeczności i daj się ponieść fascynującym światom, które czekają na Ciebie. Zapraszamy do wspólnego odkrywania, uczenia się i czerpania radości z literatury. Niech każda wizyta w Sieci Bibliotek stanie się wyjątkowym doświadczeniem, które otworzy drzwi do nieskończonych możliwości wiedzy i wyobraźni.`);

    return (
        <AboutUsContext.Provider value={{ text, setText }}>
            {children}
        </AboutUsContext.Provider>
    );
};
