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
                                <button className="btn btn-primary btn-lg">Dowiedz się o nas więcej</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
