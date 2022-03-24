import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../../components/import";
import "./FindWork.scss";
import { InfoPagination } from "../../components/import";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const skills = ["HTML", "CSS", "JavaScript", "ReactJs", "NodeJs"];

const FindWork = () => {

  
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [works, setworks] = useState();

  useEffect(() => {
    axios.get('http://localhost:8080/findwork')
    .then(function (response) {
      setworks(response.data.items);
      setLoading(false);
    })
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const bid = (event) => {
    const target = event.target.parentNode.parentNode.getElementsByClassName("bid-left")[0];
    const workId = target.id;  
    const title = target.getElementsByClassName("title")[0].textContent;
    const desc = target.getElementsByClassName("description")[0].textContent;
    const skills = target.getElementsByClassName("skill");
    let skillArray = [];
    for(let i = 0 ; i < skills.length ; i++){
      skillArray.push(skills[i].textContent);
    }
    const work = {
      id: workId,
      title: title,
      desc: desc,
      skills: skillArray,
    }

    navigate("/findwork/bid",{
      state: {
        work: work
      }
    });
  }

  const renderBidBody = (work) => (
    <div id = {work._id} key = {work._id} className = "user-bid">
      <div className = "bid-left">
        <div className = "title">{work.title}</div>
        <div className = "description">{work.desc}</div>
        <div className = "skills">
          {work.qualifications.map((skill, index) => (
            <div key = {index} className="skill">
              {skill}
            </div>
          ))}
        </div>
      </div>
      <div className = "bid-right">
        <div className = "range">
          ₹{work.minBid} - ₹{work.maxBid}
        </div>
        <div className = "total-bid">{work.numberOfBids} bids</div>
        <div className = "btn" onClick = {bid}>
          Bid now
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className = "find-work">
        <Navbar />
        <div className = "filter-container"></div>
        <div className = "findwork-main-body">
          <div className = "sidebar">
            <h1 className = "filter">Filter by</h1>
            <div className = "budget-filter">
              <h1>Budget</h1>
              <input type = "text" placeholder="min" />
              <span>to</span>
              <input type = "text" placeholder="max" />
            </div>
            <div className = "skill-filter">
              <h1>Skills</h1>
              <div className = "checkbox-container">
                {skills.map((skill, index) => (
                  <div key = {index} className="checkbox">
                    <input type = "checkbox" id={`skill-checkbox-${index}`} />
                    <label htmlFor = {`skill-checkbox-${index}`}>{skill}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className = "filter-btn">Filter</div>
          </div>
          <div className = "user-bid-container">
            <InfoPagination
              limit = "7"
              bodyData = {works}
              renderBody = {(item, index) => renderBidBody(item, index)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindWork;
