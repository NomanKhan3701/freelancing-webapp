import React from 'react'
import { Navbar } from '../../components/import'
import './AboutUs.scss'
import Tarun from "../../assets/images/Tarun.jpg"
import Shreyash from "../../assets/images/Shreyash.jpeg"

const AboutUs = () => {
    return (
        <>
            <div className="about-base-container">
                <Navbar></Navbar>
                <div className="about-container">
                    <div className="about-data-container">
                        <div className="about-us">
                            ABOUT US
                        </div>
                        <div className="sub-title">
                            A marketplace for all works.
                        </div>

                        <div className="developers">
                            <div className="developer-container">
                                <div className="image">
                                    <img src={Tarun} alt="" />
                                </div>
                                <div className="nameandposition">
                                    <div className="name">
                                        Tarun Agrawal
                                    </div>
                                    <div className="position">
                                        Full Stack Developer
                                    </div>
                                </div>
                            </div>
                            <div className="developer-container two">
                                <div className="image">
                                    <img src={Shreyash} alt="" />
                                </div>
                                <div className="nameandposition">
                                    <div className="name">
                                        Shreyash Dhamane
                                    </div>
                                    <div className="position">
                                        Full Stack Developer
                                    </div>
                                </div>
                            </div>
                            <div className="developer-container">
                                <div className="image">
                                    <img src={Tarun} alt="" />
                                </div>
                                <div className="nameandposition">
                                    <div className="name">
                                        Noman Khan
                                    </div>
                                    <div className="position">
                                        Full Stack Developer
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default AboutUs