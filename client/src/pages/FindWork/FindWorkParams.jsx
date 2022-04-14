import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../../components/import";
import "./FindWork.scss";
import "./FindWorkParams.scss";
import { InfoPagination } from "../../components/import";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const FindWork = (props) => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [originalWorks, setOriginalWorks] = useState();
  const [works, setworks] = useState();
  const [filterData, setFilterData] = useState();
  const [skills, setSkills] = useState();
  let [category, setCategory] = useState();
  const [categoryWorks, setCategoryWorks] = useState([]);
  const [externalFilter, setExternalFilter] = useState({
    totalBudget: "All",
    numberOfBids: "All",
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
  const numberOfBids = ["All", "0-10", "10-30", "30- 60", "60-100", ">100"];
  useEffect(() => {
    axios
      .get(`http://localhost:8080/findwork/${state.category}`)
      .then(function (response) {
        if (works === undefined) {
          // setworks(response.data.items);
          setOriginalWorks(response.data.items);
          const newWorks = [];
          for (let i = 0; i < response.data.items.length; i++) {
            if (
              response.data.items[i].category
                .replace(/\W/g, "")
                .toLowerCase() ===
              state.category.replace(/\W/g, "").toLowerCase()
            ) {
              newWorks.push(response.data.items[i]);
            }
          }
          setworks(newWorks);
          setCategoryWorks(newWorks);
          setFilterData(response.data.filterData);
        }
        if (skills === undefined) {
          for (let i = 0; i < response.data.filterData.length; i++) {
            //removing all non-alphanumeric characters.
            if (
              response.data.filterData[i].category
                .replace(/\W/g, "")
                .toLowerCase() ===
              state.category.replace(/\W/g, "").toLowerCase()
            ) {
              setSkills(response.data.filterData[i].skills);
              break;
            }
          }
        }
        setLoading(false);
      });
  }, []);

  // const setWorkWithCategory = (category) => {
  //   const newWorks = [];
  //   console.log(originalWorks);
  //   for (let i = 0; i < originalWorks.length; i++) {
  //     if (originalWorks[i].category === category) {
  //       newWorks.push(originalWorks[i]);
  //     }
  //   }
  //   setworks(newWorks);
  // };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const bid = (event, workPassed) => {
    let image;
    try {
      image = workPassed.image;
      if (!image) {
        image = `https://ui-avatars.com/api/?name=${workPassed.username}`;
      }
    } catch (error) {
      image = `https://ui-avatars.com/api/?name=${workPassed.username}`;
    }
    const work = {
      id: workPassed._id,
      title: workPassed.title,
      desc: workPassed.desc,
      skills: workPassed.qualifications,
      username: workPassed.username,
      image: image,
    };
    navigate("/findwork/bid", {
      state: {
        work: work,
      },
    });
  };

  const seeBids = (work) => {
    navigate("/clientdashboard", {
      state: {
        work: work,
      },
    });
  };

  const renderBidBody = (work) => {
    return (
      <div
        id={work._id}
        username={work.username}
        key={work._id}
        className="user-bid"
      >
        <div className="bid-left">
          <div className="title">{work.title}</div>
          <div className="description">{work.desc}</div>
          <div className="skills">
            {work.qualifications.map((skill, index) => (
              <div key={index} className="skill">
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="bid-right">
          <div className="range">
            ₹{work.minBid} - ₹{work.maxBid}
          </div>
          <div className="total-bid">{work.numberOfBids} bids</div>
          {work.username !== localStorage.getItem("username") ? (
            <div
              className="btn"
              onClick={(event) => {
                bid(event, work);
              }}
            >
              Bid now
            </div>
          ) : (
            <div
              className="btn"
              onClick={() => {
                seeBids(work);
              }}
            >
              Posted By You
            </div>
          )}
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
    const newWorks = [];
    for (let i = 0; i < originalWorks.length; i++) {
      if (originalWorks[i].category === category) {
        newWorks.push(originalWorks[i]);
      }
    }
    setCategoryWorks(newWorks);
    setworks(newWorks);
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

  const changeWorkData = (event) => {
    const checkboxArray = document.getElementsByClassName("checkbox");
    let selectedSkills = [];

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

  const applyExternalSetting = (name, value) => {
    let { numberOfBids, totalBudget, skills } = externalFilter;
    if (name === "bids") {
      numberOfBids = value;
    } else if (name === "skills") {
      skills = value;
    } else {
      totalBudget = value;
    }
    let newWorks = [];
    if (totalBudget === "All") {
      newWorks = categoryWorks;
    } else if (totalBudget === ">10000") {
      for (let i = 0; i < categoryWorks.length; i++) {
        if (categoryWorks[i].minBid > 10000) {
          newWorks.push(categoryWorks[i]);
        }
      }
    } else {
      const splitArray = totalBudget.split("-");
      const min = parseInt(splitArray[0]),
        max = parseInt(splitArray[1]);
      for (let i = 0; i < categoryWorks.length; i++) {
        if (
          categoryWorks[i].minBid >= min ||
          (categoryWorks[i].maxBid <= max && categoryWorks[i].maxBid >= min)
        ) {
          newWorks.push(categoryWorks[i]);
        }
      }
    }
    let newWorksV2 = [];
    if (numberOfBids === "All") {
      newWorksV2 = newWorks;
    } else if (numberOfBids === ">100") {
      for (let i = 0; i < newWorks.length; i++) {
        if (newWorks[i].numberOfBids > 100) {
          newWorksV2.push(newWorks[i]);
        }
      }
    } else {
      const splitArray = numberOfBids.split("-");
      const min = parseInt(splitArray[0]),
        max = parseInt(splitArray[1]);
      for (let i = 0; i < newWorks.length; i++) {
        if (
          newWorks[i].numberOfBids >= min &&
          newWorks[i].numberOfBids <= max
        ) {
          newWorksV2.push(newWorks[i]);
        }
      }
    }
    let newWorksV3 = [];
    if (skills.length === 0) {
      newWorksV3 = newWorksV2;
    } else {
      for (let k = 0; k < newWorksV2.length; k++) {
        const work = newWorksV2[k];
        const isPresent = (array, element) => {
          for (let i = 0; i < array.length; i++) {
            if (array[i].toLowerCase() === element.toLowerCase()) {
              return true;
            }
          }
          return false;
        };

        for (let i = 0; i < skills.length; i++) {
          if (!isPresent(work.qualifications, skills[i])) {
            break;
          }
          if (i === skills.length - 1) {
            newWorksV3.push(work);
          }
        }
      }
    }
    setworks(newWorksV3);
  };

  const budgetCall = (event) => {
    const value = event.target.value;
    setExternalFilter((prevData) => {
      return { ...prevData, totalBudget: value };
    });
    applyExternalSetting("totalBudget", value);
  };

  const changeBids = (event) => {
    const value = event.target.value;
    setExternalFilter((prevData) => {
      return { ...prevData, numberOfBids: value };
    });
    applyExternalSetting("bids", value);
  };

  const dropdownForBudget = (data, index) => {
    return (
      <option value={data} key={index}>
        {data}
      </option>
    );
  };
  return (
    <>
      <div className="find-work">
        <Navbar />
        <div className="filter-container"></div>
        <div className="findwork-main-body">
          <div className="sidebar">
            <h1 className="filter">Filter by</h1>
            <div className="category-dropdown">
              <h1>Category</h1>
              <select name="languages" id="category" onChange={call}>
                {filterData.map((data) => {
                  return dropdown(data);
                })}
              </select>
            </div>
            <div className="budget-filter">
              <h1>Price</h1>
              <select name="budget" id="budget" onChange={budgetCall}>
                {totalBudgetData.map((data, index) => {
                  return dropdownForBudget(data, index);
                })}
              </select>
            </div>
            <div className="budget-filter">
              <h1>Number Of Bids</h1>
              <select name="bids" id="bids" onChange={changeBids}>
                {numberOfBids.map((data, index) => {
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
                      onChange={changeWorkData}
                    />
                    <label htmlFor={`skill-checkbox-${index}`}>{skill}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-btn">Filter</div>
          </div>
          <div className="user-bid-container">
            <InfoPagination
              limit="3"
              bodyData={works}
              renderBody={(item, index) => renderBidBody(item, index)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindWork;
