import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/userData/userData";
import "./EditBasicInfo.scss";

const EditBasicInfo = () => {
  const userData = useSelector(selectUserData);
  const [basicInfo, setBasicInfo] = useState({
    fullname: "",
    email: "",
    linkdinUrl: "",
  });

  useEffect(() => {
    setBasicInfo({
      fullname: userData.fullname,
      email: userData.email,
      linkdinUrl: userData.linkdinUrl,
    });
  }, [userData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBasicInfo((pData) => {
      return { ...pData, [name]: value };
    });
  };

  return (
    <div className="edit-info-title">
      <h3>Enter Full Name</h3>
      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        value={basicInfo.fullname}
        onChange={handleChange}
        className=" input"
      />
      <h3>Enter Email</h3>
      <input
        type="text"
        name="email"
        placeholder="Email ID"
        value={basicInfo.email}
        onChange={handleChange}
        className="input"
      />
      <h3>Enter Linkdin Url</h3>
      <input
        type="text"
        name="linkdin"
        value={basicInfo.linkdinUrl}
        placeholder="Linkdin url"
        onChange={handleChange}
        className="input"
      />
      <div className="btn">Update Information</div>
    </div>
  );
};

export default EditBasicInfo;
