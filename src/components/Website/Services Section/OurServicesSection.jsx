import React from 'react';
import './OurServicesSection.css';
import CheckIcon from '../../../assets/icons/Check.svg'; // Use a white check icon

const services = [
  {
    title: 'Extended Discount Codes',
    description: 'Generate Amazon promo codes that last beyond 30 days with full control over discounts and timelines.',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Track sales, conversions, and commissions per SKU, per store, and per campaign – instantly.',
  },
  {
    title: 'Multi-Store Management',
    description: 'Manage multiple Amazon stores from one dashboard, complete with team permissions and store-specific codes.',
  },
  {
    title: 'Automated Payouts',
    description: 'Affiliates and influencers get paid automatically based on performance. No delays, no confusion.',
  },
  {
    title: 'Secure & Compliant',
    description: 'Fully GDPR compliant, encrypted, and built on Amazon’s SP-API with 2FA and advanced role-based access.',
  },
];

const OurServicesSection = ({id}) => {
  return (
    <section id={id} className="our-services-section text-white px-4 py-5 rounded-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3">Our Services</h2>
        <p className="text-light">
          Swaysive empowers Amazon store owners to take full control of their affiliate marketing with extended discount codes, real-time analytics, and automated commission tracking.
        </p>
      </div>

      <div className="services-grid row">
        {services.map((service, index) => (
          <div key={index} className="service-item col-md-6 d-flex gap-3">
            <div className="check-icon-wrapper">
              <img src={CheckIcon} alt="check" className="check-icon" />
            </div>
            <div>
              <h6 className="fw-semibold mb-1">{service.title}</h6>
              <p className="text-light mb-0">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <button className="cta-btn">Get started</button>
      </div>
    </section>
  );
};

export default OurServicesSection;
