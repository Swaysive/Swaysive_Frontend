import React from 'react';
import './TrustSection.css';

import Trust1 from '../../../assets/icons/Trust1.svg';
import Trust2 from '../../../assets/icons/Trust2.svg';
import Trust3 from '../../../assets/icons/Trust3.svg';
import Trust4 from '../../../assets/icons/Trust4.svg';
import Trust5 from '../../../assets/icons/Trust5.svg';

const trustItems = [
  { icon: Trust1, label: 'GDPR Compliant' },
  { icon: Trust2, label: 'Two-Factor Authentication' },
  { icon: Trust3, label: '99.9% Uptime SLA' },
  { icon: Trust4, label: 'Transparent Revenue Tracking' },
  { icon: Trust5, label: 'Encrypted data & secure payments' },
];

const TrustSection = () => {
  return (
    <section className="trust-section text-center py-5">
      <h2 className="trust-title">Built for Trust – At Scale</h2>
      <div className="trust-items mt-4">
        {trustItems.map((item, index) => (
          <div className="trust-item" key={index}>
            <img src={item.icon} alt={item.label} className="trust-icon mb-3" />
            <p className="trust-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
