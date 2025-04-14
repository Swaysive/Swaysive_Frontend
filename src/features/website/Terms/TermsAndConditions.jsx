import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-bg bg-dark text-white min-vh-100 py-4">
      <div className="container bg-white text-dark p-5 rounded">
        <a href="/" className="btn btn-dark mb-4">&larr; Back to Home</a>
        <h1 className="mb-4">Swaysive Terms and Conditions</h1>
        <p><strong>Effective Date:</strong> April 12, 2025</p>

        <p>These Terms and Conditions govern the use of the Swaysive platform owned and operated by Swaysive. By accessing or using the Platform, you agree to comply with and be bound by these Terms. If you do not agree, you must not use the Platform.</p>

        <h5>1. Eligibility</h5>
        <ul>
          <li>Be at least 18 years of age;</li>
          <li>Possess a valid Amazon Seller or Amazon Associate account;</li>
          <li>Be authorized to act on behalf of any entity you register with Swaysive.</li>
        </ul>
        <p>You are fully responsible for all activities occurring under your account.</p>

        <h5>2. Services Overview</h5>
        <ul>
          <li>Generation of extended-duration Amazon promotional codes;</li>
          <li>Real-time conversion and SKU-level analytics;</li>
          <li>Automated affiliate tracking and commission payouts;</li>
          <li>Centralized management of multiple Amazon stores;</li>
          <li>Secure integration with Amazon’s SP-API.</li>
        </ul>
        <p>Services are intended to enhance Amazon affiliate campaign management within Amazon’s operational boundaries and policies.</p>

        <h5>3. Account Integration and Access</h5>
        <p>By connecting your Amazon account, you grant Swaysive access to the necessary data via Amazon’s SP-API.</p>
        <p>You retain full responsibility for compliance with Amazon’s terms and promotional policies.</p>
        <p>Swaysive does not alter or bypass Amazon’s native limitations or policies.</p>

        <h5>4. Campaign and Discount Code Management</h5>
        <p>Users may configure Amazon promotional codes including SKUs, duration, and discount values.</p>
        <p>You are solely responsible for ensuring codes comply with Amazon's promotion guidelines.</p>
        <p>Swaysive does not guarantee effectiveness, approval, or continued validity of any code.</p>

        <h5>5. Affiliate and Commission Features</h5>
        <p>Swaysive tracks affiliate-driven conversions and automates commission payouts based on performance.</p>
        <p>Affiliates must be authorized and compliant with Amazon’s affiliate program terms.</p>
        <p>All payout settings, commission rules, and thresholds must be clearly defined by the user.</p>
        <p>Swaysive is not liable for errors in campaign setup, tracking discrepancies due to third-party behavior, or changes made by Amazon.</p>

        <h5>6. Data Protection and Security</h5>
        <ul>
          <li>All user data is encrypted in transit and at rest.</li>
          <li>The platform includes Two-Factor Authentication (2FA) and granular role-based access control.</li>
          <li>Swaysive is fully compliant with the General Data Protection Regulation (GDPR).</li>
          <li>Data is never sold or shared with third parties, except as required by law or with user consent.</li>
        </ul>

        <h5>7. Availability and Uptime</h5>
        <ul>
          <li>Swaysive is backed by a 99.9% uptime commitment.</li>
          <li>We may perform scheduled maintenance or experience unforeseen outages.</li>
          <li>Downtime caused by Amazon services or third-party APIs is outside our control and liability.</li>
        </ul>

        <h5>8. Fees and Billing</h5>
        <ul>
          <li>Some features are available only through paid subscription plans. Details are listed on our pricing page.</li>
          <li>Fees are billed in advance on a recurring basis unless canceled prior to the renewal date.</li>
          <li>All payments are final and non-refundable unless explicitly stated.</li>
        </ul>

        <h5>9. Intellectual Property</h5>
        <p>All content, branding, code, and documentation on or within the Platform is the property of FutureNav, Inc.</p>
        <p>You may not copy, reproduce, distribute, or reverse engineer any part of the Platform without written permission.</p>

        <h5>10. Termination</h5>
        <p><strong>By You:</strong></p>
        <ul>
          <li>You may cancel your account at any time. Upon termination:</li>
          <ul>
            <li>Access to the platform will be revoked;</li>
            <li>Stored data and active campaigns will be deleted or rendered inactive.</li>
          </ul>
        </ul>
        <p><strong>By Us:</strong></p>
        <ul>
          <li>We reserve the right to suspend or terminate accounts for:</li>
          <ul>
            <li>Breach of these Terms;</li>
            <li>Misuse of services;</li>
            <li>Non-compliance with Amazon’s terms.</li>
          </ul>
        </ul>

        <h5>11. Disclaimer</h5>
        <p>Swaysive is provided “as is.” We do not guarantee increases in revenue, conversion rates, or affiliate performance. We do not make warranties, expressed or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.</p>

        <h5>12. Limitation of Liability</h5>
        <ul>
          <li>Indirect, incidental, or consequential damages;</li>
          <li>Loss of revenue or data;</li>
          <li>Platform downtime or errors due to third-party APIs (including Amazon).</li>
        </ul>

        <h5>13. Modifications to Terms</h5>
        <p>These Terms may be updated periodically. Changes will be posted on the Platform with an updated “Effective Date.” Continued use of the Platform constitutes acceptance of the updated Terms.</p>

        <h5>14. Governing Law</h5>
        <p>These Terms are governed by the laws of the State of Oregon, United States. All disputes will be resolved in the appropriate courts located in Oregon.</p>

        <h5>15. Contact Information</h5>
        <p><strong>Swaysive, LLC</strong><br />📧 admin@swaysive.com</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
