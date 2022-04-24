import React, { useState, useEffect } from "react";
import FileBase64 from "react-file-base64";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/userData/userData";
// import "./EditProfileInfo.scss";
// import "../EditBasicInfo/EditBasicInfo.scss";
const EditProfileInfo = () => {
  const userData = useSelector(selectUserData);
  const [profileInfo, setProfileInfo] = useState({
    desc: "",
    image: "",
  });
  useEffect(() => {
    setProfileInfo((pData) => {
      return { ...pData, desc: userData.desc, image: userData.image };
    });
  }, [userData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileInfo((pData) => {
      return { ...pData, [name]: value };
    });
  };

  return (
    <div className="edit-info-title">
      <h3>Enter Description</h3>
      <textarea
        type="text"
        placeholder="Edit Description"
        name="desc"
        value={profileInfo.desc}
        onChange={handleChange}
        className="input"
      />
      <h3>Edit Profile Image</h3>
      <div className="file-input">
        {/* <label htmlFor="myfile">Profile Image:</label> */}
        {profileInfo.image && (
          <img
            src={profileInfo.image}
            width="100px"
            hegiht="100px"
            style={{ "border-radius": "50%" }}
          ></img>
        )}
        <FileBase64
          type="file"
          multiple={false}
          className="file-input"
          onDone={({ base64 }) =>
            setProfileInfo((prevValue) => {
              return { ...prevValue, image: base64 };
            })
          }
        />
      </div>
      <div className="btn">Update Profile</div>
    </div>
  );
};

export default EditProfileInfo;
