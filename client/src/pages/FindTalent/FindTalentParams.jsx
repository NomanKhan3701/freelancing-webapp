import React, { useState, useEffect } from "react";
import { Dropdown, Footer, Navbar } from "../../components/import";
import "./FindWork.scss";
import { InfoPagination } from "../../components/import";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const FindTalentParams = () => {

  let navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [originalTalents, setOriginalTalents] = useState();
  const [talents, settalents] = useState();
  const [filterData, setFilterData] = useState();
  const [skills, setSkills] = useState();

  useEffect(() => {
    
    axios.get(`http://localhost:8080/findtalent/${state.category}`)
    .then(function (response) {
      if(talents === undefined){
        settalents(response.data.items);
        setOriginalTalents(response.data.items);
        setFilterData(response.data.filterData);
      }
      if(skills === undefined){
        for(let i = 0 ; i < response.data.filterData.length ; i++){
          //removing all non-alphanumeric characters.
          if(response.data.filterData[i].category.replace(/\W/g, '').toLowerCase() === state.category){
            setSkills(response.data.filterData[i].skills);
            break;
          }
        }
      }
      setLoading(false);
    })
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const visitProfile = (event) => {
    let username;
    const target = event.target;
    //   navigate("/profile", {
    //       state: {
    //           username: username;
    //       }
    //   });
    navigate("/userProfile");
  }

  const renderBidBody = (work) => {
    
    return (
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
        <div className = "btn" onClick = {visitProfile}>
          Visite Profile
        </div>
      </div>
    </div>
    );
  };

  const call = (event) => {

    const category = event.target.value;
    let skillsForcategory;

    for(let i = 0 ; i < filterData.length ; i++){
      if(filterData[i].category === category){
        skillsForcategory = filterData[i].skills;
        break;
      }
    }

    setSkills(skillsForcategory);
  }

  const changeWorkData = (event) => {

    const checkboxArray = document.getElementsByClassName("checkbox");  
    let selectedSkills = [];
    let newWorks = [];
    
    for(let i = 0 ; i < checkboxArray.length ; i++){
      if(checkboxArray[i].getElementsByTagName("input")[0].checked){
        selectedSkills.push(checkboxArray[i].getElementsByTagName("label")[0].textContent);
      }
    }

    for(let k = 0 ; k < originalTalents.length ; k++){
      const work = originalTalents[k];
      if(selectedSkills.length === 0){
        settalents(originalTalents);
        break;
      }
      const isPresent = (array, element) => {

        for(let i = 0 ; i < array.length ; i++){
          if(array[i].toLowerCase() === element.toLowerCase()){
            return true;
          }
        }

        return false;
      }

      for(let i = 0 ; i < selectedSkills.length ; i++){
        if(!isPresent(work.qualifications, selectedSkills[i])){
          break;
        }
        if(i === selectedSkills.length - 1 ){
          newWorks.push(work);
        }
      }

    }

    settalents(newWorks);
  }

  const dropdown = (data) => {
      
    if(data.category.replace(/\W/g, '').toLowerCase() === state.category.replace(/\W/g, '').toLowerCase()){
      return (<option value = {data.category} key = {data.category} selected>{data.category}</option>);
    }else{
      return (<option value = {data.category} key = {data.category}>{data.category}</option>);
    }
  }

  return (
    <>
      <div className = "find-work">
        <Navbar />
        <div className = "filter-container"></div>
        <div className = "findwork-main-body">
          <div className = "sidebar">
            <h1 className = "filter">Filter by</h1>
            <div className = "category-dropdown">
              <h1>Category</h1>
              <select name = "languages" id = "category" onChange = {call} >
                {filterData.map((data) => {
                  return dropdown(data);
                })}
              </select>
            </div>
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
                  <div key = {index} className = "checkbox"> 
                    <input type = "checkbox" id = {`skill-checkbox-${index}`} onChange = {changeWorkData}/>
                    <label htmlFor = {`skill-checkbox-${index}`}>{skill}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className = "user-bid-container">
            <InfoPagination
              limit = "3"
              bodyData = {talents}
              renderBody = {(item, index) => renderBidBody(item, index)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindTalentParams;
