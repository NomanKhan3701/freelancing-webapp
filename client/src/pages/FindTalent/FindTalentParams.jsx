import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Footer,
  Navbar,
  FullDivLoader,
  InfoPagination,
  FullScreenLoader,
} from "../../components/import";
import "./FindTalent.scss";
import "./FindWork.scss";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { LocalGasStation } from "@material-ui/icons";
import { useFieldArray } from "react-hook-form";

const FindTalentParams = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [originalTalents, setOriginalTalents] = useState();
  const [talents, settalents] = useState();
  const [filterData, setFilterData] = useState();
  const [categoryTalents, setCategoryTalents] = useState([]);
  const [externalFilter, setExternalFilter] = useState({
    totalBudget: "All",
    perHourRate: "All",
    rating: "All",
    skills: [],
  });
  const totalBudgetData = [
    "All",
    "0-1000",
    "1000-2000",
    "2000-5000",
    "5000-10000",
    ">10000",
  ];
  const hourlyRatesTable = [
    "All",
    "0-100",
    "100-300",
    "300- 600",
    "600-1000",
    ">1000",
  ];
  const ratingTable = ["All", ">=1", ">=2", ">=3", ">=4", "5"];
  const [skills, setSkills] = useState();
  let [category, setCategory] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/findtalent/${state.category}`)
      .then(function (response) {
        // if (talents === undefined) {
        //   settalents(response.data.items);
        //   setOriginalTalents(response.data.items);
        //   setFilterData(response.data.filterData);
        // }
        // if (skills === undefined) {
        //   for (let i = 0; i < response.data.filterData.length; i++) {
        //     //removing all non-alphanumeric characters.
        //     if (
        //       response.data.filterData[i].category
        //         .replace(/\W/g, "")
        //         .toLowerCase() === state.category
        //     ) {
        //       setSkills(response.data.filterData[i].skills);
        //       break;
        //     }
        //   }
        // }
        // console.log(state.category);
        if (talents === undefined) {
          // setworks(response.data.items);
          // console.log(response.data.items);
          setOriginalTalents(response.data.items);
          const newTalents = [];
          setCategory(state.category);
          for (let i = 0; i < response.data.items.length; i++) {
            // console.log(response.data.items[i].category);
            if (
              response.data.items[i].category
                .replace(/\W/g, "")
                .toLowerCase() === state.category
            ) {
              newTalents.push(response.data.items[i]);
            }
          }
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
                .toLowerCase() === state.category
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

  const visitProfile = (event) => {
    const username = event.target.getAttribute("datausername");
    navigate(`/userprofile`, {
      state: {
        username: username,
      },
    });
  };

  const renderBidBody = (talent) => {
    return (
      <div id={talent._id} key={talent._id} className="user-bid">
        <div className="bid-left">
          <div className="title">{talent.title}</div>
          <div className="description">{talent.desc}</div>
          <div className="skills">
            {talent.qualifications.map((skill, index) => (
              <div key={index} className="skill">
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="bid-right">
          <div>PerHourRate: ₹{talent.perHourRate}</div>
          <div>Total: ₹{talent.price}</div>
          <div>
            Rating: {talent.rating == 0 ? "New Freelancer" : talent.rating}
          </div>
          <div
            className="btn"
            datausername={talent.username}
            onClick={visitProfile}
          >
            Visit Profile{" "}
            {localStorage.getItem("username") === talent.username &&
              "(Posted By You)"}
          </div>
        </div>
      </div>
    );
  };

  const call = (event) => {
    const category = event.target.value;
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
      if (originalTalents[i].category === category) {
        newTalents.push(originalTalents[i]);
        // setCategoryTalents(newTalents);
      }
    }
    setCategoryTalents(newTalents);
    settalents(newTalents);
  };

  const changeTalentData = (event) => {
    const checkboxArray = document.getElementsByClassName("checkbox");
    let selectedSkills = [];
    let newTalents = [];

    for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray[i].getElementsByTagName("input")[0].checked) {
        selectedSkills.push(
          checkboxArray[i].getElementsByTagName("label")[0].textContent
        );
      }
    }
    setExternalFilter((prevData) => {
      return { ...prevData, skills: selectedSkills };
    });
    applyExternalSetting("skills", selectedSkills);
  };

  const dropdown = (data) => {
    if (
      data.category.replace(/\W/g, "").toLowerCase() ===
      state.category.replace(/\W/g, "").toLowerCase()
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

  const dropdownForBudget = (data, index) => {
    return (
      <option value={data} key={index}>
        {data}
      </option>
    );
  };

  const setFinalDataForCategory = (category) => {
    const newTalents = [];
    for (let i = 0; i < originalTalents.length; i++) {
      if (
        category.replace(/\W/g, "").toLowerCase() ===
        originalTalents[i].category.replace(/\W/g, "").toLowerCase()
      ) {
        newTalents.push(originalTalents[i]);
      }
    }
    settalents(newTalents);
    return newTalents;
  };

  const applyExternalSetting = (name, value) => {
    let { perHourRate, rating, totalBudget, skills } = externalFilter;
    if (name === "perHourRate") {
      perHourRate = value;
    } else if (name === "rating") {
      rating = value;
    } else if (name === "skills") {
      skills = value;
    } else {
      totalBudget = value;
    }
    let newTalents = [];
    if (totalBudget === "All") {
      newTalents = categoryTalents;
    } else if (totalBudget === ">10000") {
      for (let i = 0; i < categoryTalents.length; i++) {
        if (categoryTalents[i].price > 10000) {
          newTalents.push(categoryTalents[i]);
        }
      }
    } else {
      const splitArray = totalBudget.split("-");
      const min = parseInt(splitArray[0]),
        max = parseInt(splitArray[1]);
      for (let i = 0; i < categoryTalents.length; i++) {
        if (
          categoryTalents[i].price >= min &&
          categoryTalents[i].price <= max
        ) {
          newTalents.push(categoryTalents[i]);
        }
      }
    }
    let newTalentsV2 = [];
    if (perHourRate === "All") {
      newTalentsV2 = newTalents;
    } else if (perHourRate === ">1000") {
      for (let i = 0; i < newTalents.length; i++) {
        if (newTalents[i].perHourRate > 1000) {
          newTalentsV2.push(newTalents[i]);
        }
      }
    } else {
      const splitArray = perHourRate.split("-");
      const min = parseInt(splitArray[0]),
        max = parseInt(splitArray[1]);
      for (let i = 0; i < newTalents.length; i++) {
        if (
          newTalents[i].perHourRate >= min &&
          newTalents[i].perHourRate <= max
        ) {
          newTalentsV2.push(newTalents[i]);
        }
      }
    }

    let newTalentsV3 = [];
    if (rating === "All") {
      newTalentsV3 = newTalentsV2;
    } else if (rating === "5") {
      const newtalents = [];
      for (let i = 0; i < newTalentsV2.length; i++) {
        if (newTalentsV2[i].rating == 5) {
          //dont do === for this particular case
          newTalentsV3.push(newTalentsV2[i]);
        }
      }
    } else {
      const min = parseInt(rating.charAt(2));
      const newtalents = [];
      for (let i = 0; i < newTalentsV2.length; i++) {
        if (newTalentsV2[i].rating >= min) {
          newTalentsV3.push(newTalentsV2[i]);
        }
      }
    }

    let newTalentsV4 = [];
    if (skills.length === 0) {
      newTalentsV4 = newTalentsV3;
    } else {
      for (let k = 0; k < newTalentsV3.length; k++) {
        const talent = newTalentsV3[k];
        const isPresent = (array, element) => {
          for (let i = 0; i < array.length; i++) {
            if (array[i].toLowerCase() === element.toLowerCase()) {
              return true;
            }
          }
          return false;
        };

        for (let i = 0; i < skills.length; i++) {
          if (!isPresent(talent.qualifications, skills[i])) {
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

  const budgetCall = (event) => {
    const value = event.target.value;
    setExternalFilter((prevData) => {
      return { ...prevData, totalBudget: value };
    });
    applyExternalSetting("totalBudget", value);
  };

  const adjustHourlyRate = (event) => {
    const value = event.target.value;
    setExternalFilter((prevData) => {
      return { ...prevData, perHourRate: value };
    });
    applyExternalSetting("perHourRate", value);
  };
  const adjustRating = (event) => {
    const value = event.target.value;
    setExternalFilter((prevData) => {
      return { ...prevData, rating: value };
    });
    applyExternalSetting("rating", value);
  };

  return (
    <>
      {/* //same css as fint work */}
      <div className="find-work-talent">
        <Navbar />
        <div className="filter-container"></div>
        <div className="findwork-main-body">
          <div className="sidebar">
            <h1 className="filter">Filter by</h1>
            <div className="category-dropdown">
              <h1>Category</h1>
              <select className="select-filter" name="category" id="category" onChange={call}>
                {filterData.map((data) => {
                  return dropdown(data);
                })}
              </select>
            </div>
            <div className="budget-filter">
              <h1>Total Budget</h1>

              <select className="select-filter" name="budget" id="budget" onChange={budgetCall}>
                {totalBudgetData.map((data, index) => {
                  return dropdownForBudget(data, index);
                })}
              </select>
              <h1>PerHourRate</h1>
              <select
                name="hourlyRate"
                id="hourlyRate"
                onChange={adjustHourlyRate}
                className="select-filter"
              >
                {hourlyRatesTable.map((data, index) => {
                  return dropdownForBudget(data, index);
                })}
              </select>
              <h1>Rating</h1>
              <select className="select-filter" name="hourlyRate" id="hourlyRate" onChange={adjustRating}>
                {ratingTable.map((data, index) => {
                  return dropdownForBudget(data, index);
                })}
              </select>
            </div>
            <div className="skill-filter">
              <h1>Skills</h1>
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
          </div>
          <div className="user-bid-container">
            <InfoPagination
              limit="3"
              bodyData={talents}
              renderBody={(item, index) => renderBidBody(item, index)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindTalentParams;
