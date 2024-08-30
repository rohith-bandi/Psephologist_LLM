import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import MapChart from './components/home/mapchart'; // Make sure the path is correct
import Persons from './components/home/persons';
import CardComponent from './components/home/cards';

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <br></br>
            <div className="col-md-8 col-lg-6 col-xl-6 text-center text-md-start mx-auto" style={{ overflow: 'hidden' }}>
                <div className="text-center">
                    <p className="fw-bold text-success mb-2">PsephologistLLM</p>
                    <h1 className="fw-bold">One stop solution for your election queries.</h1>
                    <br></br>
                    <br></br>
                </div>
            </div>
            <div id="carousel-1" class="carousel slide" data-bs-ride="false" style={{ marginLeft: '8%', marginRight: '8%', borderRadius: '20px' }}>
                <div class="carousel-inner">
                    <div class="carousel-item active"><img class="w-100 d-block" src="https://ceotelangana.nic.in/images/sliders/slider7.jpg" alt="Slide Image" /></div>
                    <div class="carousel-item"><img class="w-100 d-block" src="https://ceotelangana.nic.in/images/sliders/slide3.jpg" alt="Slide Image" /></div>
                    <div class="carousel-item"><img class="w-100 d-block" src="https://ceotelangana.nic.in/images/sliders/slide1.jpg" alt="Slide Image" /></div>
                </div>
                <div><a class="carousel-control-prev" href="#carousel-1" role="button" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></a><a class="carousel-control-next" href="#carousel-1" role="button" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></a></div>
                <div class="carousel-indicators"><button class="active" type="button" data-bs-target="#carousel-1" data-bs-slide-to="0"></button><button type="button" data-bs-target="#carousel-1" data-bs-slide-to="1"></button><button type="button" data-bs-target="#carousel-1" data-bs-slide-to="2"></button></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                <MapChart />
                <CardComponent />
            </div>
            <Persons />
            <Footer />
        </div>
    );
}

export default Home;
