import React from "react";
import styles from './EditProfileInfo.scss'
import FileBase64 from "react-file-base64";
// import "./EditProfileInfo.scss";
// import "../EditBasicInfo/EditBasicInfo.scss";
const EditProfileInfo = () => {
    return (
        <div className="edit-info-title">
            <h3>Enter Description</h3>
            <input type="text" placeholder="Edit Description" className="input" />
            <h3>Edit Profile Image</h3>
            <div className="file-input">
                {/* <label htmlFor="myfile">Profile Image:</label> */}
                <FileBase64
                    type="file"
                    multiple={false}
                    className="file-input"
                // onDone={({ base64 }) =>
                //     setUserData((prevValue) => {
                //         return { ...prevValue, image: base64 };
                //     })
                // }
                />
            </div>
            <div className="btn">Change Profile</div>
        </div>
    );
};

export default EditProfileInfo;
