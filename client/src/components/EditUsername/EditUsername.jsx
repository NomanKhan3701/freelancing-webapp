import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/userData/userData";

const EditUsername = () => {
  const data = useSelector(selectUserData);
  const [userData, setUserData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    cnfNewPassword: "",
  });

  useEffect(() => {
    setUserData((pData) => {
      return { ...pData, username: data.username };
    });
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((data) => {
      return { ...data, [name]: value };
    });
  };

  return (
    <div className="edit-info-title">
      <h3>Enter Username</h3>
      <input
        type="text"
        name="username"
        placeholder="Edit Username"
        value={userData.username}
        onChange={handleChange}
        className="input"
      />
      <h3>Enter Old Password</h3>
      <input
        type="text"
        name="oldPassword"
        placeholder="Old Password"
        value={userData.oldPassword}
        onChange={handleChange}
        className="input"
      />
      <h3>Enter New Password</h3>
      <input
        type="text"
        name="newPassword"
        placeholder="Edit Password"
        value={userData.newPassword}
        onChange={handleChange}
        className="input"
      />
      <h3>Confirm New Password</h3>
      <input
        type="text"
        name="cnfNewPassword"
        placeholder="Confirm Password"
        value={userData.cnfNewPassword}
        onChange={handleChange}
        className="input"
      />
      <div className="btn">Update Profile</div>
    </div>
  );
};

export default EditUsername;
