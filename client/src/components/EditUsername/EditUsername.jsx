import React from "react";

const EditUsername = () => {
  return (
    <div className="edit-info-title">
      <h3>Enter UserName</h3>
      <input type="text" placeholder="Edit Username" className="input" />
      <h3>Enter New Password</h3>
      <input type="text" placeholder="Edit Password" className="input" />
      <h3>Confirm New Password</h3>
      <input type="text" placeholder="Confirm Password" className="input" />
      <div className="btn">Submit</div>
    </div>
  );
};

export default EditUsername;
