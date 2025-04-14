import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AffiliateMarketingComponent.css'; // Create this CSS file
import abstractLeft from '../../../assets/images/website-top-left.png'; // Import your left image
import abstractRight from '../../../assets/images/website-bottom-right.png'; // Import your right image
import bgLeft from '../../../assets/images/website-bottom-left.png'; // Import your left background image
import bgRight from '../../../assets/images/website-top-right.png'; // Import your right background image

function AffiliateMarketingComponent() {
  return (
    <div className='container py-5'>
    <div className="bg-gradient-custom py-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <h2 className="mb-4 text-dark">Ready to Unlock the Next Level of Affiliate Marketing?</h2>
          <div className="d-flex justify-content-center">
            <button className="btn btn-dark me-3">Get Started Now</button>
            <button className="btn btn-outline-dark">Book a Personalized Demo</button>
          </div>
        </div>
      </div>
      <div className="abstract-image left" style={{ backgroundImage: `url(${abstractLeft})` }}></div>
      <div className="abstract-image right" style={{ backgroundImage: `url(${abstractRight})` }}></div>
      {/* <div className="bg-image left" style={{ backgroundImage: `url(${bgLeft})` }}></div> */}
      {/* <div className="bg-image right" style={{ backgroundImage: `url(${bgRight})` }}></div> */}
    </div>
    </div>
  );
}

export default AffiliateMarketingComponent;