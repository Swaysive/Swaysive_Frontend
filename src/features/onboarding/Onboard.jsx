import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';
import AmazonLogo from '../../assets/icons/amazon-icon.png';
import Hello from '../../assets/icons/hello-icon.png'
import OrDivider from '../../components/Divider/OrDivider';
import { GlobalStyles,Colors } from '../../styles/styles';

const Onboard = () => {
  const [formData, setFormData] = useState({ storeName: '', storeURL: '' });
  const [formVisible, setFormVisible] = useState(false); // To control form visibility
  const [showDashboard, setShowDashboard] = useState(false); // To control dashboard view
  const [formOpacity, setFormOpacity] = useState(0); // To control form opacity (fade-in effect)
  const [copied, setCopied] = useState(false); // To track whether the link was copied
  const [amazonButtonClicked, setAmazonButtonClicked] = useState(false); // To hide Amazon button after clicking

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Store Data:', formData);
    setFormVisible(false); // Close form after submission
    setShowDashboard(true); // Show dashboard after form submission
  };

  const handleAmazonButtonClick = () => {
    setFormVisible(true); // Show the form when Amazon button is clicked
    setAmazonButtonClicked(true); // Hide the Amazon button after it's clicked
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formData.storeURL); // Copy the URL to clipboard
    setCopied(true); // Set copied to true
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  useEffect(() => {
    if (formVisible) {
      setFormOpacity(1); // Fade-in the form when it's made visible
    }
  }, [formVisible]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={GlobalStyles.card}>
        <p className='text-secondary'>Welcome, John Doe <img src={Hello} alt="Logo" /></p>
        
        
        {/* Amazon Button - Hide after clicking */}
        {!amazonButtonClicked && (
          <div style={{width:'100%',textAlign:'center'}}>
          <h4 className='fw-bold'>Add New Store</h4>
          <p className='text-secondary'>You have to add a new store to your merchant account.</p>
          <div className="text-center">
            <Button 
              variant="contained" 
              size="large" 
              color="secondary"
              style={{ backgroundColor: Colors.light, color: Colors.black, width:'100%',padding:10 }}
              onClick={handleAmazonButtonClick}
              startIcon={<img src={AmazonLogo} alt="Amazon Logo" style={{ width: 24, height: 24 }} />}
            >
              Amazon
            </Button>
          </div>
          </div>
        )}

        {/* Conditional rendering of the form with fade-in effect */}
        {formVisible && (
          <div 
            className="mt-4" 
            style={{
              opacity: formOpacity, 
              transition: 'opacity 1s ease-in-out', // Apply fade-in effect with a 1-second duration
              width:'100%',
            }}
          >
            <h4 className='fw-bold text-center'>Add New Store</h4>
            {/* <OrDivider /> */}
            <form onSubmit={handleSubmit} style={GlobalStyles.customForm}>
              <div className="mb-3">
                <label style={GlobalStyles.inputLabel}>Store Name</label>
                <TextField
                  label="Store Name"
                  type="text"
                  name="storeName"
                  fullWidth
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label style={GlobalStyles.inputLabel}>Store URL</label>
                <TextField
                  label="Store URL"
                  type="url"
                  name="storeURL"
                  fullWidth
                  value={formData.storeURL}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid">
                <Button type="submit" variant="contained" size="large" style={GlobalStyles.button} fullWidth>
                  Save
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Display store name and URL after form submission */}
        {showDashboard && formData.storeName && formData.storeURL && (
          <div className="mt-4" style={{backgroundColor:'#F8F8F8'}}>
            <div className="store-info-box" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
              <div className='d-flex justify-content-between'>
             <strong>{formData.storeName}</strong>
             <>
             <IconButton 
                  onClick={handleCopyLink} 
                  style={{ marginLeft: '10px' }}
                  color={copied ? 'primary' : 'default'}
                >
                  <ContentCopy />{copied && <span style={{ color: 'green', marginLeft: '5px' }}>Copied!</span>}
                </IconButton>
                </>
             </div>
              <span>
              {formData.storeURL}
              </span>
            </div>

            <div className="text-center">
              <Button 
                variant="contained" 
                color="primary"
                style={GlobalStyles.button}
                onClick={() => window.location.href = '/dashboard'} // Redirect to the dashboard
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}

        <div className="text-center mt-3">
          <p className='text-secondary'>Already installed app on your store? <a href="/register" style={GlobalStyles.customLink}>Contact us</a> to get the app added to your account.</p>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
