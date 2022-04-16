import React from 'react'
import './LimitCharHoverReveal.scss'

const LimitCharHoverReveal = (props) => {

    return (
        <div className='limit-char-hover-reveal'>
            {
                props.word.length > props.limit ? props.word.substring(0, props.limit) + "..." : props.word
            }
            {
                props.word.length > props.limit ? <div className="reveal">
                    {props.word}
                </div> : ''
            }
        </div>
    )
}

export default LimitCharHoverReveal