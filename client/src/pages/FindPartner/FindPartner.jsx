import React from 'react'
import { Navbar } from '../../components/import'
import './FindPartner.scss'

const FindPartner = () => {
  return (
    <div className='find-partner'>
      <Navbar />
        <div className="find-partner-filter">
          <div className="categories">
            <select name="category" id="">
              <option>Frontend web</option>
              <option>Backend web</option>
              <option>Logo Creator</option>
              <option>App developer</option>
            </select>
          </div>
          <div className="skills">
            <div className="skill">HTML</div>
            <div className="skill">CSS</div>
            <div className="skill">JavaScript</div>
            <div className="skill">React JS</div>
            <div className="skill">Node JS</div>
          </div>
          <div className="similar-skills">
            <div className="github">Use Github</div>
          </div>
        </div>
        <div className="main-body">
          
        </div>
    </div>
  )
}

export default FindPartner