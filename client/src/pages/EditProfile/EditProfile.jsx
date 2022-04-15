import React from 'react'
import { Navbar } from '../../components/import'
import './EditProfile.scss'

const EditProfile = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="sidebar">
                    <ul >
                        <li>Edit Username and Password</li>
                        <li>Edit Basic Information</li>
                        <li>Edit Profile</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default EditProfile