import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PrivacyPolicy.css'; // Custom styles

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page bg-dark text-white min-vh-100 py-5">
      <div className="container bg-white text-dark rounded p-5 shadow">
        <div className="mb-4 ">
          <a href="/" className="btn btn-dark">← Back to Home</a>
        </div>
        <h1 className="mb-4">Swaysive Privacy Policy</h1>
        <p><strong>Effective Date:</strong> April 12, 2025</p>
        <p>Swaysive respects your privacy and is committed to protecting your personal and business data. This Privacy Policy explains how we collect, use, store, and disclose information when you use the Swaysive platform.</p>

        <h5>1. Scope</h5>
        <p>This Privacy Policy applies to:</p>
        <ul>
          <li>Visitors to our website;</li>
          <li>Registered users of the Swaysive platform;</li>
          <li>Connected Amazon sellers and affiliates using our services.</li>
        </ul>
        <p>By accessing or using Swaysive, you consent to the data practices described herein.</p>

        <h5>2. Information We Collect</h5>
        <strong>a. User-Provided Information</strong>
        <p>When you register or use the Platform, we collect:</p>
        <ul>
          <li>Full name and email address;</li>
          <li>Company name and role;</li>
          <li>Login credentials (stored securely);</li>
          <li>Payment and billing information (processed by secure third-party providers);</li>
          <li>Contact details for customer support.</li>
        </ul>

        <strong>b. Amazon-Connected Data</strong>
        <p>Upon connecting your Amazon account:</p>
        <ul>
          <li>Store data and SKU-level information;</li>
          <li>Sales, orders, and conversions;</li>
          <li>Discount codes and promotions;</li>
          <li>Affiliate campaign performance.</li>
        </ul>
        <p>We access only the data necessary to provide Swaysive services and features through Amazon’s SP-API.</p>

        <strong>c. Usage Data</strong>
        <p>We automatically collect:</p>
        <ul>
          <li>Log data (IP address, browser type, timestamps);</li>
          <li>Pages visited, features used, and navigation flow;</li>
          <li>Device and connection information.</li>
        </ul>

        <h5>3. How We Use Your Data</h5>
        <ul>
          <li>Deliver, maintain, and improve the Swaysive platform;</li>
          <li>Enable features like analytics, discount code creation, and affiliate tracking;</li>
          <li>Communicate with you (support, updates, promotions if opted-in);</li>
          <li>Enforce our Terms and prevent misuse;</li>
          <li>Comply with legal obligations.</li>
        </ul>
        <p>We do not use your Amazon data for any purpose outside the scope of the services you explicitly authorize.</p>

        <h5>4. Data Sharing and Disclosure</h5>
        <p>We do not sell or rent your personal or Amazon data. We may share your information:</p>
        <ul>
          <li>With Amazon, strictly through SP-API, based on your permissions;</li>
          <li>With trusted service providers (e.g., cloud infrastructure, billing) under strict confidentiality agreements;</li>
          <li>When legally required, such as under a court order or to prevent fraud or abuse.</li>
        </ul>

        <h5>5. Data Security</h5>
        <ul>
          <li>End-to-end encryption for data in transit and at rest;</li>
          <li>Two-Factor Authentication (2FA);</li>
          <li>Role-based access controls;</li>
          <li>Regular security audits and compliance monitoring.</li>
        </ul>
        <p>Despite these measures, no system is 100% secure. You are responsible for keeping your credentials confidential.</p>

        <h5>6. Your Rights and Choices</h5>
        <p>Depending on your location and applicable laws (e.g., GDPR), you may:</p>
        <ul>
          <li>Access, update, or delete your personal data;</li>
          <li>Withdraw consent for certain uses of your data;</li>
          <li>Object to processing or request data portability.</li>
        </ul>
        <p>To exercise any of these rights, contact us at: <a href="mailto:privacy@swaysive.com">privacy@swaysive.com</a></p>

        <h5>7. Data Retention</h5>
        <ul>
          <li>As long as your account is active;</li>
          <li>As necessary to comply with legal, accounting, or reporting obligations;</li>
          <li>For a limited period after termination for recovery or legal purposes, unless deletion is requested.</li>
        </ul>

        <h5>8. International Transfers</h5>
        <p>Your information may be processed in the United States or other jurisdictions. Where required, we implement Standard Contractual Clauses or similar safeguards for international data transfers.</p>

        <h5>9. Children’s Privacy</h5>
        <p>Swaysive is not intended for use by individuals under the age of 18. We do not knowingly collect or process personal data from children.</p>

        <h5>10. Cookies and Tracking</h5>
        <p>We use cookies and similar technologies to:</p>
        <ul>
          <li>Enable secure logins;</li>
          <li>Remember user preferences;</li>
          <li>Analyze usage patterns for product improvement.</li>
        </ul>
        <p>You can control cookie preferences via your browser settings.</p>

        <h5>11. Policy Updates</h5>
        <p>We may update this Privacy Policy periodically. We will notify users of material changes via the Platform or email. Continued use of Swaysive constitutes acceptance of the updated policy.</p>

        <h5>12. Contact Us</h5>
        <address>
          <strong>Privacy Office</strong><br />
          Swaysive<br />
          12345 California, Amerika, OR 97103<br />
          <a href="mailto:privacy@swaysive.com">privacy@swaysive.com</a><br />
          (802) 509-9504
        </address>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
