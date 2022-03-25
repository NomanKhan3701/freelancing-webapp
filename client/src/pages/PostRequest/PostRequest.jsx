import React from 'react'
import { DragAndDropImg, Navbar } from '../../components/import'
import './PostRequest.scss'

const PostRequest = () => {
  return (
    <div className='post-request'>
        <Navbar/>
        <div className="form">
          <div className="title">
            <h1>Choose a name for your project</h1>
            <input type="text" placeholder='e.g. Build me a freelancing website'/>
          </div>
          <div className="desc">
            <h1>Tell us more about your project</h1>
            <input type="text" placeholder='Describe your project here...'/>
          </div>
          <div className="dragDrop">
            <DragAndDropImg/>
          </div>
        </div>
    </div>
  )
}

export default PostRequest