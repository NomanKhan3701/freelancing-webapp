import React from "react";
import './EditBasicInfo.scss'

const EditBasicInfo = () => {
    return (
        <div className="edit-info-title">
            <h3>Enter Full Name</h3>
            <input type="text" placeholder="Full Name" className="input" />
            <h3>Enter Email</h3>
            <input type="text" placeholder="Email ID" className="input" />
            <div className="btn">Change Information</div>
        </div>
    );
};

export default EditBasicInfo;
