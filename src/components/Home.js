import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Witamy w SmartLibrary!</h2>
                            <Link to="/AboutUs">
                                <button className="btn btn-primary btn-lg">Dowiedz się więcej o nas</button>
                            </Link>
                        </div>
                    </div>
                    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://cdn.pixabay.com/photo/2020/07/23/01/29/books-5430104_1280.jpg" className="d-block w-100" alt="Biblioteka wnętrze 1"/>
                            </div>
                            <div className="carousel-item">
                                <img src="https://cdn.pixabay.com/photo/2016/03/26/22/21/books-1281581_1280.jpg" className="d-block w-100" alt="Biblioteka wnętrze 2"/>
                            </div>
                            <div className="carousel-item">
                                <img src="https://cdn.pixabay.com/photo/2015/10/10/13/03/prague-980732_1280.jpg" className="d-block w-100" alt="Biblioteka wnętrze 3"/>
                            </div>
                            <div className="carousel-item">
                                <img src="https://cdn.pixabay.com/photo/2013/11/15/23/18/john-work-garrett-library-211375_1280.jpg" className="d-block w-100" alt="Biblioteka wnętrze 4"/>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;