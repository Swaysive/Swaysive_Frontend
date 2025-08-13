import './HelloHorizontal.css';
import amazonIcon from '../../assets/icons/amazon-icon.svg'; 
import helloIcon from '../../assets/icons/hello-icon.svg'; 
const HelloHorizontal = () => {
  return (
    <div className="modal-like-box">
      <h1 className="top-heading">Welcome, John Doe
        <span><img src={helloIcon} alt="" /></span>
      </h1>
      <h3 className='mt-2'>Login to Amazon</h3>
      <p className="gilroy-text">
        You have to add a new store to your merchant account.
      </p>

      <button className=" mt-2 amazon-btn fw-bold">
        <img src={amazonIcon} alt="" />
        Amazon
      </button>

      <p className=" mt-3 subtitle-text">
        Already installed app on your store? Contact us to get the app added to your account.
      </p>
    </div>
  );
};

export default HelloHorizontal;
