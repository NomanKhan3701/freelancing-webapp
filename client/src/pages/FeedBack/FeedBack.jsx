import { useState } from 'react'
import './FeedBack.scss'
import { FaStar } from "react-icons/fa";

const colours = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};

function FeedBack() {
    const [currentValue, setCurrentValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value);
    }

    const handleMouseOver = value => {
        setHoverValue(value)
    }

    const handleMouseLeave = value => {
        setHoverValue(undefined)
    }

    return (

        <div className="container">
            <div className="form">
                <div className="title">
                    FeedBack for the Freelancer.
                </div>
                <div className="stars">
                    {stars.map((_, index) => {
                        return (
                            <FaStar
                                key={index}
                                size={36}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={() => handleMouseLeave(index + 1)}
                                color={(hoverValue || currentValue) > index ? colours.orange : colours.grey}
                            >
                            </FaStar>
                        )
                    })}
                </div>
                <div className="desc">
                    <textarea name="feedback" id="feedback" cols="50" rows="10" placeholder='Enter the feedback for the freelancer here:'>
                    </textarea>
                </div>
                <div className="btn">
                    Submit
                </div>
            </div>
        </div>
    )
}

export default FeedBack