import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import axios from "axios";

const Contactus = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   message: ""
  // });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [responseMessage, setResponseMessage] = useState("");

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/contact", { name, email, message });

      if (response.data.success) {
        setResponseMessage("Message sent successfully!");
      } else {
        setResponseMessage("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <section className="py-5">
        <div className="container py-5">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <p className="fw-bold text-success mb-2">Contacts</p>
              <h2 className="fw-bold">How you can reach us</h2>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
              <div>
                <form className="p-3 p-xl-4" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      id="name-1"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="email"
                      id="email-1"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      id="message-1"
                      name="message"
                      rows="6"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary shadow d-block w-100"
                      type="submit"
                    >
                      Send
                    </button>
                  </div>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
              </div>
            </div>
            <div className="col-md-4 col-xl-4 d-flex justify-content-center justify-content-xl-start">
              <div className="d-flex flex-wrap flex-md-column justify-content-md-start align-items-md-start h-100">
                <div className="d-flex align-items-center p-3">
                  <div className="bs-icon-md bs-icon-circle bs-icon-primary shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="bi bi-telephone"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                    </svg>
                  </div>
                  <div className="px-2">
                    <h6 className="fw-bold mb-0">Phone</h6>
                    <p className="text-muted mb-0">+91 6281846862</p>
                  </div>
                </div>
                <div className="d-flex align-items-center p-3">
                  <div className="bs-icon-md bs-icon-circle bs-icon-primary shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="bi bi-envelope"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 1 .034 8.26L6.79 4.91 8 5.617l1.21-.707 6.757 3.35a1 1 0 0 1-.021 1.758z"></path>
                    </svg>
                  </div>
                  <div className="px-2">
                    <h6 className="fw-bold mb-0">Email</h6>
                    <p className="text-muted mb-0">jashwanthrgp@gmail.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center p-3">
                  <div className="bs-icon-md bs-icon-circle bs-icon-primary shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="bi bi-pin"
                    >
                      <path d="M4.146 2.146a.5.5 0 0 1 .708 0l.646.647V1.5a.5.5 0 0 1 1 0v2.293l.646-.647a.5.5 0 1 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 0-.708zM1 7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1H1V7zM1 11h14v-1H1v1zm2.5 3h9a.5.5 0 0 1 .5.5v1.5H3v-1.5a.5.5 0 0 1 .5-.5z"></path>
                    </svg>
                  </div>
                  <div className="px-2">
                    <h6 className="fw-bold mb-0">Address</h6>
                    <p className="text-muted mb-0">KMIT, Hyderabad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contactus;
