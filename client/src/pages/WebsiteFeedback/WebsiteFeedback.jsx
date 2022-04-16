import React from 'react'
import { Navbar } from '../../components/import'
import './WebsiteFeedback.scss'

const WebsiteFeedback = () => {

    const feedbacks = [{ votes: 4, title: "Dark Mode", description: "Please release a dark mode MongoDB Atlas interface. Thank you." }, { votes: 4, title: "Dark Mode", description: "Please release a dark mode MongoDB Atlas interface. Thank you." }]

    return (
        <>
            <div className="feedback-base-container">
                <Navbar />
                <div className="desc-container">
                    <div className="feedback-input">
                        <div className="title">
                            How can we Make this website better for you?
                        </div>
                        <input type="text" placeholder='Enter your idea' className='input' />
                    </div>

                    <div className="desc">
                        <div className="desc-title">Share your idea.</div>
                        <ol>
                            <li>A brief description of what you are looking to do</li>
                            <li>How you think this will help</li>
                            <li>Why this matters to you</li>
                        </ol>
                    </div>
                </div>
                <div className="feedback-container">
                    {feedbacks.map((elem, index) => {
                        return (<div className="each-feedback-container" key={index}>
                            <div className="votes">
                                <div className="number">
                                    {elem.votes}
                                </div>
                                <div className="vote-button">
                                    VOTE
                                </div>
                            </div>
                            <div className="feedback-titleanddesc">
                                <div className="feedback-title">
                                    {elem.title}
                                </div>
                                <div className="feedback-desc">
                                    {elem.description}
                                </div>
                            </div>
                        </div>)
                    })}

                </div>
            </div>
        </>
    )
}

export default WebsiteFeedback