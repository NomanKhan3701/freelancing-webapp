import React from "react";
import { Footer, Navbar } from "../../components/import";
import "./FindWork.scss";
import { Link } from "react-router-dom";

const skills = ["HTML", "CSS", "JavaScript", "ReactJs", "NodeJs"];
const Bids = [
  {
    title: 'Javascript Coder',
    desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
    skills: ['HTML','JavaScript','Jquery'],
    rangeMin: '555',
    rangeMax: '1000',
    averageBid: '896',
    totalBid: '14',
  },
  {
    title: 'AWS Jquery / Javascript Authentication',
    desc: `AWS need to authenticate and post HTTP API with json value. API Generation done only authentication need to be complete. I'll provide all client certificate and key path. just need to be set in code. Less than 2 hour work.`,
    skills: ['HTML','JavaScript','Jquery','ReactJS','NodeJs','MongoDB'],
    rangeMin: '5000',
    rangeMax: '20000',
    averageBid: '17489',
    totalBid: '4'
  },
  {
    title: 'Javascript Coder',
    desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
    skills: ['HTML','JavaScript','Jquery'],
    rangeMin: '555',
    rangeMax: '1000',
    averageBid: '896',
    totalBid: '14',
  },
  {
    title: 'AWS Jquery / Javascript Authentication',
    desc: `AWS need to authenticate and post HTTP API with json value. API Generation done only authentication need to be complete. I'll provide all client certificate and key path. just need to be set in code. Less than 2 hour work.`,
    skills: ['HTML','JavaScript','Jquery','ReactJS','NodeJs','MongoDB'],
    rangeMin: '5000',
    rangeMax: '20000',
    averageBid: '17489',
    totalBid: '4'
  },
  {
    title: 'Javascript Coder',
    desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
    skills: ['HTML','JavaScript','Jquery'],
    rangeMin: '555',
    rangeMax: '1000',
    averageBid: '896',
    totalBid: '14',
  },
  {
    title: 'AWS Jquery / Javascript Authentication',
    desc: `AWS need to authenticate and post HTTP API with json value. API Generation done only authentication need to be complete. I'll provide all client certificate and key path. just need to be set in code. Less than 2 hour work.`,
    skills: ['HTML','JavaScript','Jquery','ReactJS','NodeJs','MongoDB'],
    rangeMin: '5000',
    rangeMax: '20000',
    averageBid: '17489',
    totalBid: '4'
  },
  {
    title: 'Javascript Coder',
    desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
    skills: ['HTML','JavaScript','Jquery'],
    rangeMin: '555',
    rangeMax: '1000',
    averageBid: '896',
    totalBid: '14',
  },
  {
    title: 'AWS Jquery / Javascript Authentication',
    desc: `AWS need to authenticate and post HTTP API with json value. API Generation done only authentication need to be complete. I'll provide all client certificate and key path. just need to be set in code. Less than 2 hour work.`,
    skills: ['HTML','JavaScript','Jquery','ReactJS','NodeJs','MongoDB'],
    rangeMin: '5000',
    rangeMax: '20000',
    averageBid: '17489',
    totalBid: '4'
  },
  {
    title: 'Javascript Coder',
    desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
    skills: ['HTML','JavaScript','Jquery'],
    rangeMin: '555',
    rangeMax: '1000',
    averageBid: '896',
    totalBid: '14',
  },
  {
    title: 'AWS Jquery / Javascript Authentication',
    desc: `AWS need to authenticate and post HTTP API with json value. API Generation done only authentication need to be complete. I'll provide all client certificate and key path. just need to be set in code. Less than 2 hour work.`,
    skills: ['HTML','JavaScript','Jquery','ReactJS','NodeJs','MongoDB'],
    rangeMin: '5000',
    rangeMax: '20000',
    averageBid: '17489',
    totalBid: '4'
  },
  {
    title: 'Javascript Coder',
    desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
    skills: ['HTML','JavaScript','Jquery'],
    rangeMin: '555',
    rangeMax: '1000',
    averageBid: '896',
    totalBid: '14',
  },
  {
    title: 'AWS Jquery / Javascript Authentication',
    desc: `AWS need to authenticate and post HTTP API with json value. API Generation done only authentication need to be complete. I'll provide all client certificate and key path. just need to be set in code. Less than 2 hour work.`,
    skills: ['HTML','JavaScript','Jquery','ReactJS','NodeJs','MongoDB'],
    rangeMin: '5000',
    rangeMax: '20000',
    averageBid: '17489',
    totalBid: '4'
  },
  {
    title: 'Javascript Coder',
    desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
    skills: ['HTML','JavaScript','Jquery'],
    rangeMin: '555',
    rangeMax: '1000',
    averageBid: '896',
    totalBid: '14',
  },
  {
    title: 'AWS Jquery / Javascript Authentication',
    desc: `AWS need to authenticate and post HTTP API with json value. API Generation done only authentication need to be complete. I'll provide all client certificate and key path. just need to be set in code. Less than 2 hour work.`,
    skills: ['HTML','JavaScript','Jquery','ReactJS','NodeJs','MongoDB'],
    rangeMin: '5000',
    rangeMax: '20000',
    averageBid: '17489',
    totalBid: '4'
  },
  {
    title: 'Javascript Coder',
    desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
    skills: ['HTML','JavaScript','Jquery'],
    rangeMin: '555',
    rangeMax: '1000',
    averageBid: '896',
    totalBid: '14',
  },
  {
    title: 'AWS Jquery / Javascript Authentication',
    desc: `AWS need to authenticate and post HTTP API with json value. API Generation done only authentication need to be complete. I'll provide all client certificate and key path. just need to be set in code. Less than 2 hour work.`,
    skills: ['HTML','JavaScript','Jquery','ReactJS','NodeJs','MongoDB'],
    rangeMin: '5000',
    rangeMax: '20000',
    averageBid: '17489',
    totalBid: '4'
  },
  {
    title: 'Javascript Coder',
    desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
    skills: ['HTML','JavaScript','Jquery'],
    rangeMin: '555',
    rangeMax: '1000',
    averageBid: '896',
    totalBid: '14',
  },
  {
    title: 'AWS Jquery / Javascript Authentication',
    desc: `AWS need to authenticate and post HTTP API with json value. API Generation done only authentication need to be complete. I'll provide all client certificate and key path. just need to be set in code. Less than 2 hour work.`,
    skills: ['HTML','JavaScript','Jquery','ReactJS','NodeJs','MongoDB'],
    rangeMin: '5000',
    rangeMax: '20000',
    averageBid: '17489',
    totalBid: '4'
  },
  {
    title: 'Javascript Coder',
    desc: `I need the Javascript coder for multiple jobs. Details will be discussed`,
    skills: ['HTML','JavaScript','Jquery'],
    rangeMin: '555',
    rangeMax: '1000',
    averageBid: '896',
    totalBid: '14',
  },
  {
    title: 'AWS Jquery / Javascript Authentication',
    desc: `AWS need to authenticate and post HTTP API with json value. API Generation done only authentication need to be complete. I'll provide all client certificate and key path. just need to be set in code. Less than 2 hour work.`,
    skills: ['HTML','JavaScript','Jquery','ReactJS','NodeJs','MongoDB'],
    rangeMin: '5000',
    rangeMax: '20000',
    averageBid: '17489',
    totalBid: '4'
  },
]

const FindWork = () => {
  return (<>
    <div className="find-work">
      <Navbar />
      <div className="filter-container"></div>
      <div className="findwork-main-body">
        <div className="sidebar">
          <h1 className="filter">Filter by</h1>
          <div className="budget-filter">
            <h1>Budget</h1>
            <input type="text" placeholder="min" />
            <span>to</span>
            <input type="text" placeholder="max" />
          </div>
          <div className="skill-filter">
            <h1>Skills</h1>
            <div className="checkbox-container">
              {skills.map((skill, index) => (
                <div key={index} className="checkbox">
                  <input type="checkbox" id={`skill-checkbox-${index}`} />
                  <label htmlFor={`skill-checkbox-${index}`}>{skill}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="filter-btn">Filter</div>
        </div>
        <div className="user-bid-container">
          {Bids.map((bid,index)=> (
            <div key={index} className="user-bid">
              <div className="bid-left">
                <div className="title">{bid.title}</div>
                <div className="description">{bid.desc}</div>
                <div className="skills">
                  {bid.skills.map((skill, index)=> (
                    <div key={index} className="skill">{skill}</div>
                  ))}
                </div>
              </div>
              <div className="bid-right">
                <div className="range">₹{bid.rangeMin} - ₹{bid.rangeMax}</div>
                <div className="total-bid">{bid.totalBid} bids</div>
                <div className="btn"><Link to = '/bid'>Bid now</Link></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default FindWork;
