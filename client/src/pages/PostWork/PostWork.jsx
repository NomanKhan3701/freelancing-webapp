import React, { useState, useEffect } from "react";
import { DragAndDropImg, Navbar } from "../../components/import";
import { Multiselect } from "multiselect-react-dropdown";
import "./PostWork.scss";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const PostWork = () => {

  const data = [
    { Skill: "HTML" },
    { Skill: "CSS" },
    { Skill: "JavaScript" },
    { Skill: "React" },
    { Skill: "PHP" },
    { Skill: "NodeJs" },
    { Skill: "MongoDB" },
  ];

  const [isLoading, setLoading] = useState(true);
  const [postWorkData ,setPostWorkData ] = useState({
    title: "",
    desc: "",
    category: "",
    skills: [],
    minBid: null,
    maxBid: null,
  });
  const [categories, setCategories] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    
    axios.get(`http://localhost:8080/findtalent/postwork`)
    .then(function (response) {
      setOriginalData(response.data.filterData);
      let category = [];
      for(let i = 0 ; i < response.data.filterData.length ; i++){
        category[i] = {Category: response.data.filterData[i].category};
      }
      if(categories.length === 0){
        setCategories(category);
      }
      setLoading(false);
    })
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const onDataChange = (event) => {
    
    const {name, value} = event.target;
    setPostWorkData((previousWorkData) => {
      return (
        {...previousWorkData,
          [name] : value,
        }
      );
    });
  }
  
  const onSelectCategory = (selectedList, selectedItem) => {

    changeSkills(selectedItem.Category);
    setPostWorkData((previousWorkData) => {
      return (
        {...previousWorkData,
          category : selectedItem.Skill,
        }
      );
    });
  }

  const onRemoveCategory = (selectedList, selectedItem) => {
    
    setPostWorkData((previousWorkData) => {
      return (
        {...previousWorkData,
          category : "",
        }
      );
    });
  }

  const changeSkills = (category) => {
    
    let skills = [];
    for(let i = 0 ; i < originalData.length ; i++){
      if(originalData[i].category === category){
        for(let j = 0 ; j < originalData[i].skills.length ; j++){
          skills.push({Skill: originalData[i].skills[j]});
        }
        setSkills(skills);
      }
    }  
  }

  const onSelectSkills = (selectedList, selectedItem) => {

    let skillsList = [];
    for(let i = 0 ; i < selectedList.length ; i++){
      skillsList.push(selectedList[i].Skill);
    }
    setPostWorkData((previousWorkData) => {
      return (
        {...previousWorkData,
          skills : skillsList,
        }
      );
    });
  }

  const onRemoveSkills = (selectedList, selectedItem) => {
    let skillsList = [];
    for(let i = 0 ; i < selectedList.length ; i++){
      skillsList.push(selectedList[i].Skill);
    }
    setPostWorkData((previousWorkData) => {
      return (
        {...previousWorkData,
          skills : skillsList,
        }
      );
    });
  }

  const newPostForWork = (event) => {

    axios
      .post(`http://localhost:8080/findtalent/postwork`, {postWorkData: postWorkData})
      .then((response) => {
          //response is the object that contains data sent from server
          //response.data is that data
          console.log(response.data);
          
      })
      .catch((err) => {
          console.log(err);
      });
  }

  return (
    <div className = "post-request">
      <Navbar />
      <div className = "form">
        <div className = "title">
          <h1>Choose a name for your project</h1>
          <input
            name = "title"
            type = "text"
            placeholder = "e.g. Build me a freelancing website"
            onChange = {onDataChange}
          />
        </div>
        <div className = "desc">
          <h1>Tell us more about your project</h1>
          <textarea 
            type = "text" 
            name = "desc"
            placeholder = "Describe your project here..." 
            onChange = {onDataChange} />
        </div>
        <div className = "dragDrop">
          <h1>{"{Select Files}"}</h1>
        </div>
        <div className = "skills-required">
          <h1>Category</h1>
          <Multiselect options = {categories} displayValue = "Category" onSelect = {onSelectCategory} onRemove = {onRemoveCategory} name = "category"/>
        </div>
        <div className = "skills-required">
          <h1>What skills are required</h1>
          <Multiselect options = {skills} displayValue = "Skill" onSelect = {onSelectSkills} onRemove = {onRemoveSkills} name = "skills"/>
        </div>
        <div className = "budget">
          <h1>Enter your budget</h1>
          <input type = "text" placeholder = "min" onChange = {onDataChange} name = "minBid"/>
          <span>to</span>
          <input type = "text" placeholder = "max" onChange = {onDataChange} name = "maxBid"/>
        </div>
        <div className = "btn" onClick = {newPostForWork}>Post Project</div>
      </div>
    </div>
  );
};

export default PostWork;
