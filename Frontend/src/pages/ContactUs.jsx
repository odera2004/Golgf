import React from "react";
import { Link } from "react-router-dom";
import "./ContactUs.css";

export default function ContactUs() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-dark text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Contact Golf Cooperation</h1>
          <p className="lead mb-4">
            Let's Connect & Elevate Your Golf Experience!
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="text-primary fw-bold text-center mb-4">Get in Touch</h2>
              <p className="text-muted text-center">
                Whether you're looking for golf partnerships, tournaments, or
                membership inquiries, we're here to assist you.
              </p>
              <ul className="list-unstyled text-center mt-4">
                <li>
                  <i className="fas fa-map-marker-alt text-primary"></i> 123 Golf Avenue, Green Valley, USA
                </li>
                <li>
                  <i className="fas fa-envelope text-primary"></i> contact@golfcooperation.com
                </li>
                <li>
                  <i className="fas fa-phone text-primary"></i> +1 555-123-4567
                </li>
                <li>
                  <i className="fas fa-clock text-primary"></i> Mon - Fri: 9:00 AM - 6:00 PM
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="map">
        <div className="container">
          <iframe
            title="Golf Cooperation Location"
            className="rounded shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345098075!2d144.95373631531697!3d-37.8162797797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1a0b1c1%3A0x3b554d3ed0d67dbd!2sGolf%20Cooperation!5e0!3m2!1sen!2sus!4v1613973462485!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p>&copy; 2025 Golf Cooperation. All rights reserved.</p>
        <Link to="/" className="text-light">Back to Home</Link>
      </footer>
    </div>
  )
}
