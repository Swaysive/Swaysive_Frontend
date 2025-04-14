import React from 'react';
import './AffiliateWarningSection.css';
import Icon1 from '../../../assets/icons/Amazon1.svg';
import Icon2 from '../../../assets/icons/Amazon2.svg';
import Icon3 from '../../../assets/icons/Amazon3.svg';
import Icon4 from '../../../assets/icons/Amazon4.svg';

const features = [
  {
    icon: Icon1,
    title: 'Short 30-day cookie windows',
    dark: false,
  },
  {
    icon: Icon2,
    title: 'Missed conversions and lost revenue',
    dark: false,
  },
  {
    icon: Icon3,
    title: 'No SKU-level attribution or analytics',
    dark: false,
  },
  {
    icon: Icon4,
    title: 'Manual tracking and payout headaches',
    dark: false,
  },
];

const AffiliateWarningSection = () => {
  return (
    <div className='affiliate-warning-section py-5'>
    <div className=" container d-flex flex-column flex-lg-row align-items-start justify-content-between gap-5">
      {/* Left Side */}
      <div className="affiliate-text">
        <h1 className="fw-bold text-dark-blue mb-4">
          Amazon’s 30-Day Window Is Killing Your Affiliate Potential
        </h1>
        <p className="text-muted">
          Most Amazon affiliate links expire after 30 days – leaving sales on
          the table. Swaysive changes that. We unlock extended validity codes,
          real-time conversion tracking, and SKU-level analytics to help you
          maximize commissions across every campaign.
        </p>
      </div>

      {/* Right Side */}
      <div className="affiliate-boxes d-grid gap-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)',width:'100%' }}>
        {features.map((item, idx) => (
        <div
        key={idx}
        className={`affiliate-box p-4 d-flex flex-column align-items-start gap-3 rounded-4 shadow-sm`}
      >
        <div className="icon-circle">
          <img src={item.icon} alt="" className="icon" />
        </div>
        <p className="mb-0 fw-medium">{item.title}</p>
      </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AffiliateWarningSection;
