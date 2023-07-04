import React from 'react';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import '../Home.css';
const Home = () => {
    return (
        <div className="container" id={"home-container"}>
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Welcome to SmartLibrary!</h2>
                            <div className="carousel-container">
                                <Carousel interval={2500}>
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
                            <Link to="/AboutUs">
                            <button className="btn btn-primary btn-lg" id="learn">Learn more</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
