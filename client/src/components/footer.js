import React from "react";

const Footer = () => {
    return (
        <div>
            <footer className="bg-dark">
                <div className="container py-4 py-lg-5">
                    <div className="row justify-content-center">
                        <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                            <h3 className="fs-6 fw-bold">ECI - Website & Portals</h3>
                            <ul className="list-unstyled">
                                <li><a href="https://www.eci.gov.in/" target="blank">ECI</a></li>
                                <li><a href="https://voters.eci.gov.in/" target="blank">Voter service portal</a></li>
                                <li><a href="https://rti.eci.nic.in/" target="blank">RTI</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                            <h3 className="fs-6 fw-bold">ECI - Mobile Apps</h3>
                            <ul className="list-unstyled">
                                <li><a href="https://play.google.com/store/apps/details?id=com.eci.citizen&hl=en_IN&gl=US&pli=1" target="blank">Voter helpline app</a></li>
                                <li><a href="https://play.google.com/store/apps/details?id=pwd.eci.com.pwdapp&hl=en_IN&gl=US" target="blank">Saksham app</a></li>
                                <li><a href="https://play.google.com/store/apps/details?id=suvidha.eci.gov.in.candidateapp&hl=en_IN&gl=US" target="blank">Suvidha app</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                            <h3 className="fs-6 fw-bold">Social Media</h3>
                            <ul className="list-unstyled">
                                <li><a href="https://www.instagram.com/jashwanth_reddy9/" target="blank">Instagram</a></li>
                                <li><a href="https://www.linkedin.com/in/jashwanth-geereddy/" target="blank">Linkedin</a></li>
                                <li><a href="https://x.com/Jashwanth_09" target="blank">Twitter</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 text-center text-lg-start d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last">
                            <div className="fw-bold d-flex align-items-center mb-2">
                                <span className="bs-icon-sm bs-icon-circle bs-icon-primary d-flex justify-content-center align-items-center bs-icon me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier">
                                        <path fillRule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
                                        <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
                                    </svg>
                                </span>
                                <span>PsephologistLLM</span>
                            </div>
                            <p className="text-muted">Your Queries, Our Response!</p>
                        </div>
                    </div>
                    <hr />
                    <div className="text-muted d-flex justify-content-between align-items-center pt-3">
                        <p className="mb-0">Copyright © PsephologistLLM batch-1 2024</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
