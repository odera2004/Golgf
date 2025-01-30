import React from 'react'
import { Link } from 'react-router-dom';
import "./About.css"

function About() {
  return (
    <div>

      {/* Hero Section */}
      <section className="hero bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Golf Games Alley!</h1>
          <p className="lead mb-4">Your go-to platform for amazing services.</p>
          <Link to="/register" className="btn btn-light btn-lg">
            Get Started
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="fw-bold text-primary">About Us</h2>
              <p className="text-muted">
                We provide cutting-edge solutions to make your life easier. Our team is
                dedicated to offering high-quality services that will help you achieve your
                goals.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQujw0cY0YGTkbzk98jO9c4yV4zwt9OO0YanQ&s"
                alt="About Us"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services bg-light py-5">
        <div className="container">
          <h2 className="fw-bold text-center text-primary mb-4">Our Services</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card shadow-sm mb-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ6U0MW9trU2XXFOtRHvhqrW6oqZlZH4RH0wcBH07ZGkykufbwspkCHqPshVAMqhoc0dU&usqp=CAU"
                  alt="Service 1"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Service 1</h5>
                  <p className="card-text">
                    Description of the first service offered. We aim to provide top-notch
                    solutions to our clients.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm mb-4">
                <img
                  src="https://images.crazygames.com/golf-orbit_16x9/20240620070701/golf-orbit_16x9-cover?auto=format,compress&q=75&cs=strip"
                  alt="Service 2"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Service 2</h5>
                  <p className="card-text">
                    Description of the second service offered. We make sure to meet all your
                    needs with excellence.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm mb-4">
                <img
                  src="https://cliffsliving.com/wp-content/uploads/2023/02/CLF-Improve-Your-Golf-Game-e1599595647393.jpg"
                  alt="Service 3"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Service 3</h5>
                  <p className="card-text">
                    Description of the third service offered. Our approach is customer-centric
                    and results-oriented.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact py-5">
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-4">Get in Touch</h2>
          <p className="text-muted mb-4">
            Have any questions? Feel free to reach out to us, and we’ll get back to you as
            soon as possible!
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p>&copy; 2025 MyApp. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default About
