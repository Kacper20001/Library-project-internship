import React from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Witamy w SmartLibrary!</h2>
                            <Link to="/AboutUs">
                                <button className="btn btn-primary btn-lg">Dowiedz się więcej</button>
                            </Link>
                            <div className="carousel-container">
                                <Carousel>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100 carousel-image"
                                            src="https://cdn.pixabay.com/photo/2020/07/23/01/29/books-5430104_1280.jpg"
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100 carousel-image"
                                            src="https://cdn.pixabay.com/photo/2016/03/26/22/21/books-1281581_1280.jpg"
                                            alt="Second slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100 carousel-image"
                                            src="https://cdn.pixabay.com/photo/2015/10/10/13/03/prague-980732_1280.jpg"
                                            alt="Third slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100 carousel-image"
                                            src="https://cdn.pixabay.com/photo/2013/11/15/23/18/john-work-garrett-library-211375_1280.jpg"
                                            alt="Fourth slide"
                                        />
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
