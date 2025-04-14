import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HowItWorks.css';
import step1Img from '../../../assets/images/Works1.svg';
import step2Img from '../../../assets/images/Works2.svg';
import step3Img from '../../../assets/images/Works3.svg';
// import step2Img from './assets/step2.png';
// import step3Img from './assets/step3.png';

const HowItWorks = ({id}) => {
  return (
    <div id={id} className="how-it-works bg-white py-5 text-center">
      <p className="text-uppercase text-muted mb-2">How it works</p>
      <h2 className="fw-bold mb-5 text-dark">From Code to Conversion In 3 Easy Steps</h2>

      <div className="container">
        <div className="row align-items-center justify-content-center mb-5">
          <div className="col-md-5 text-md-end mb-3 mb-md-0" style={{width:'300px'}}>
            <h5 className="fw-bold">Connect Your Amazon Store</h5>
            <p className="text-muted">
              Plug into Amazon SP-API in minutes. We guide you through every step.
            </p>
          </div>
          <div className="col-md-1">
            <div className="step-number">01</div>
          </div>
          <div className="col-md-5 text-md-start" style={{width:'300px'}}>
            <img src={step1Img} alt="Step 1 - Amazon Store Connected" className="img-fluid rounded " />
          </div>
        </div>

        <div className="row align-items-center justify-content-center mb-5">
           <div className="col-md-5 text-md-start" style={{width:'300px'}}>
            <img src={step2Img} alt="Step 2 - Smart Discount Campaigns" className="img-fluid rounded " />
          </div>
          <div className="col-md-1">
            <div className="step-number">02</div>
          </div>
         <div className="col-md-5 text-md-start mb-3 mb-md-0" style={{width:'300px'}}>
            <h5 className="fw-bold">Create Smart Discount Campaigns</h5>
            <p className="text-muted">
              Select SKUs, set your discount percentage, and go live.
            </p>
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          <div className="col-md-5 text-md-end mb-3 mb-md-0" style={{width:'300px'}}>
            <h5 className="fw-bold">Track, Optimize, and Get Paid</h5>
            <p className="text-muted">
              Real-time data + payout automation = more revenue, less stress.
            </p>
          </div>
          <div className="col-md-1">
            <div className="step-number">03</div>
          </div>
          <div className="col-md-5 text-md-start" style={{width:'300px'}}>
            <img src={step3Img} alt="Step 3 - Track and Get Paid" className="img-fluid rounded " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
