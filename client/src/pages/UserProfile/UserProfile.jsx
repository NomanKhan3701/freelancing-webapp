import React from "react";
import { Navbar } from "../../components/import";
import "./UserProfile.scss";
import userBanner from "../../assets/images/bgUser.jpg";
import userImg from "../../assets/images/Cha2.jpg";

const UserProfile = () => {
  return (
    <div className="user-profile-container">
      <Navbar />
      <div className="user-profile-info">
        <div className="profile-header">
          {/* <div className="profile-banner">
            <img src={userBanner} alt="banner" />
          </div> */}
          <div className="user-img">
            <img src={userImg} alt="" />
          </div>
          <div className="user-info">
            <h1 className="user-name">BNC</h1>
            <div className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem in suscipit corporis voluptatibus. Tempore, fugiat non
              distinctio ipsa, commodi amet veritatis, molestias porro libero
              dolorum itaque voluptatibus at explicabo! Fugiat!
            </div>
          </div>
        </div>
        <div className="profile-main">
          <div className="contact-info">
            <div className="contact">
              <div className="contact-item">
                <i class="bx bxs-phone"></i>
                <div>9278237823</div>
              </div>
              <div className="contact-item">
                <i class="bx bxl-gmail"></i>
                <div>BNC.rules3701@gmail.com</div>
              </div>
              <div className="contact-item">
                <i class="bx bxs-home"></i>
                <div>
                  Bhavans Campus, Old D N Nagar, Munshi Nagar, Andheri West,
                  Mumbai, Maharashtra 400058
                </div>
              </div>
            </div>
          </div>
          <div className="main-container"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
