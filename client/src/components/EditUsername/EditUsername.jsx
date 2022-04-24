import React from "react";

const EditUsername = () => {
  return (
    <div className="edit-info-title">
      <h3>Enter Username</h3>
      <input
        type="text"
        name="username"
        placeholder="Edit Username"
        className="input"
      />
      <h3>Enter Old Password</h3>
      <input
        type="text"
        name="oldPassword"
        placeholder="Old Password"
        className="input"
      />
      <h3>Enter New Password</h3>
      <input
        type="text"
        name="newPassword"
        placeholder="Edit Password"
        className="input"
      />
      <h3>Confirm New Password</h3>
      <input
        type="text"
        name="cnfNewPassword"
        placeholder="Confirm Password"
        className="input"
      />
      <div className="btn">Submit</div>
    </div>
  );
};

export default EditUsername;
