import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TestimonialCarousel.css';

import person1 from '../../../assets/images/Testimonial1.png';
import person2 from '../../../assets/images/Testimonial1.png';
import person3 from '../../../assets/images/Testimonial2.png';
import jamesImg from '../../../assets/images/Testimonial3.png';
import quoteIcon from '../../../assets/icons/Apostrophe.svg';

const testimonials = [
  {
    name: 'James R',
    title: 'Junior Software Developer',
    text:
      'I wanted to switch from retail to tech but didn’t know where to start. The career resources and AI-driven job matching helped me land a junior developer role that fits my goals perfectly.',
    image: jamesImg,
  },
  {
    name: 'James R',
    title: 'Senior Software Developer',
    text:
      'I wanted to switch from retail to tech but didn’t know where to start. The career resources and AI-driven job matching helped me land a junior developer role that fits my goals perfectly.',
    image: jamesImg,
  }
  // Add more testimonial objects here
];

const TestimonialCarousel = () => {
  return (
    <div className="testimonial-wrapper bg-white py-5">
      <h2 className="text-center fw-bold text-dark mb-4">Testimonial</h2>
      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {testimonials.map((testimonial, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={index}
            >
              <div className="container d-flex flex-column flex-md-row align-items-center justify-content-center">
                <div className="text-center text-md-start mb-4 mb-md-0 me-md-5">
                  <h4 className="fw-bold text-dark">Real<br />Results.<br />Real<br/> Revenue.</h4>
                  <div className="d-flex justify-content-center justify-content-md-start mt-3">
                    <img src={person1} className="avatar mx-1" alt="avatar1" />
                    <img src={person2} className="avatar mx-1" alt="avatar2" />
                    <img src={person3} className="avatar mx-1" alt="avatar3" />
                  </div>
                </div>
                <div className="testimonial-box d-flex align-items-center bg-light rounded p-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="img-fluid rounded me-4 testimonial-img"
                  />
                  <div>
                    <img src={quoteIcon} alt="quote" className="quote-icon mb-3" />
                    <p className="text-secondary">{testimonial.text}</p>
                    <h6 className="fw-bold text-dark mb-0">{testimonial.name}</h6>
                    <small className="text-muted">{testimonial.title}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
