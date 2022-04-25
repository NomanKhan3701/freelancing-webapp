import React, { useEffect, useState } from "react";
import {
  FindPartnerPagination,
  Navbar,
  Footer,
  FullScreenLoader,
} from "../../components/import";
import "./FindPartner.scss";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const FindPartner = () => {
  const [talents, settalents] = useState();
  const [originalTalents, setOriginalTalents] = useState();
  let [category, setCategory] = useState();
  const [categoryTalents, setCategoryTalents] = useState([]);
  const [filterData, setFilterData] = useState();
  const [skills, setSkills] = useState();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/findpartner`).then(function (response) {
      if (talents === undefined) {
        setOriginalTalents(response.data.items);
        const newTalents = [];
        setCategory("designer");
        for (let i = 0; i < response.data.items.length; i++) {
          for (let k = 0; k < response.data.items[i].category.length; k++) {
            if (
              response.data.items[i].category[k]
                .replace(/\W/g, "")
                .toLowerCase() === "designer"
            ) {
              newTalents.push(response.data.items[i]);
            }
          }
        }
        console.log("newTalents");
        console.log(newTalents);
        settalents(newTalents);
        setCategoryTalents(newTalents);
        setFilterData(response.data.filterData);
      }
      if (skills === undefined) {
        for (let i = 0; i < response.data.filterData.length; i++) {
          //removing all non-alphanumeric characters.
          if (
            response.data.filterData[i].category
              .replace(/\W/g, "")
              .toLowerCase() === "designer"
          ) {
            setSkills(response.data.filterData[i].skills);
            break;
          }
        }
      }
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }
  const renderPartnerBody = (partner, index) => {
    const chat = (event) => {
      navigate("/chat", {
        state: {
          receiver: partner.username,
          image: partner.image,
        },
      });
    };
    return (
      <div className="partner" key={index}>
        <div className="top">
          {/* <img src={partner.image} alt="userImg" /> */}
          <Link to={`/userprofile/${partner.username}`}>
            <img src={partner.image} alt="client img" />
          </Link>
          <Link to={`/userprofile/${partner.username}`}>
            <div className="user-name">{partner.fullname}</div>
          </Link>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="categories">
              <h2>Category : </h2>
              {partner.category.map((category, idx) => (
                <div className="category" index={idx}>
                  {category}
                </div>
              ))}
            </div>
            <div className="skills">
              <h2>Skills : </h2>
              {partner.skills.map((skill, idx) => (
                <div className="skill" index={idx}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <div
              className="chat-btn"
              onClick={chat}
              datausername={partner.username}
            >
              Chat
            </div>
          </div>
        </div>
      </div>
    );
  };

  const call = (event) => {
    let category = event.target.value;
    setCategory(category);
    let skillsForcategory;
    for (let i = 0; i < filterData.length; i++) {
      if (filterData[i].category === category) {
        skillsForcategory = filterData[i].skills;
        break;
      }
    }
    setSkills(skillsForcategory);
    const newTalents = [];
    for (let i = 0; i < originalTalents.length; i++) {
      for (let k = 0; k < originalTalents[i].category.length; k++) {
        if (
          category === "Backend Web Developer" ||
          category === "Frontend Web Developer"
        ) {
          setCategory(
            category === "Backend Web Developer"
              ? "backend developer"
              : "frontend developer"
          );
          category =
            category === "Backend Web Developer"
              ? "backend developer"
              : "frontend developer";
        }
        if (
          originalTalents[i].category[k].replace(/\W/g, "").toLowerCase() ===
          category.replace(/\W/g, "").toLowerCase()
        ) {
          newTalents.push(originalTalents[i]);
          break;
        }
      }
    }
    setCategoryTalents(newTalents);
    settalents(newTalents);
  };

  const dropdown = (data) => {
    if (
      data.category.replace(/\W/g, "").toLowerCase() ===
      "designer".replace(/\W/g, "").toLowerCase()
    ) {
      return (
        <option value={data.category} key={data.category} selected>
          {data.category}
        </option>
      );
    } else {
      return (
        <option value={data.category} key={data.category}>
          {data.category}
        </option>
      );
    }
  };

  const applyExternalSetting = (name, value) => {
    let newTalentsV4 = [];
    let skills = value;
    if (skills.length === 0) {
      newTalentsV4 = categoryTalents;
    } else {
      for (let k = 0; k < talents.length; k++) {
        const talent = talents[k];
        const isPresent = (array, element) => {
          for (let i = 0; i < array.length; i++) {
            if (array[i].toLowerCase() === element.toLowerCase()) {
              return true;
            }
          }
          return false;
        };
        for (let i = 0; i < skills.length; i++) {
          if (!isPresent(talent.skills, skills[i])) {
            break;
          }
          if (i === skills.length - 1) {
            newTalentsV4.push(talent);
          }
        }
      }
    }
    settalents(newTalentsV4);
  };

  const changeTalentData = (event) => {
    const checkboxArray = document.getElementsByClassName("checkbox");
    let selectedSkills = [];

    for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray[i].getElementsByTagName("input")[0].checked) {
        selectedSkills.push(
          checkboxArray[i].getElementsByTagName("label")[0].textContent
        );
      }
    }
    applyExternalSetting("skills", selectedSkills);
  };

  return (
    <>
      <div className="find-partner">
        <Navbar />
        <div className="find-partner-filter">
          <div className="categories">
            <h2>Category</h2>
            <select
              className="select-filter"
              name="category"
              id="category"
              onChange={call}
            >
              {filterData.map((data) => {
                return dropdown(data);
              })}
            </select>
          </div>
          <div className="checkbox-container">
            <h2>Skills</h2>
            <div className="checkbox-container">
              {skills.map((skill, index) => (
                <div key={index} className="checkbox">
                  <input
                    type="checkbox"
                    id={`skill-checkbox-${index}`}
                    onChange={changeTalentData}
                  />
                  <label htmlFor={`skill-checkbox-${index}`}>{skill}</label>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="similar-skills">
            <h2 className="toggle-content">Use Github</h2>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div> */}
        </div>
        <div className="partner-main-body">
          <FindPartnerPagination
            limit="4"
            bodyData={talents}
            renderBody={(item, index) => renderPartnerBody(item, index)}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindPartner;
