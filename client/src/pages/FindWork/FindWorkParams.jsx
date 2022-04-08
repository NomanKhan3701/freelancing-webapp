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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/findwork/${state.category}`)
      .then(function (response) {
        if (works === undefined) {
          // setworks(response.data.items);
          setOriginalWorks(response.data.items);
          const newWorks = [];
          console.log(originalWorks);
          for (let i = 0; i < response.data.items.length; i++) {
            if (response.data.items[i].category === state.category) {
              newWorks.push(response.data.items[i]);
            }
          }
          setworks(newWorks);
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

  const bid = (event) => {
    const target =
      event.target.parentNode.parentNode.getElementsByClassName("bid-left")[0];
    const workId = target.parentNode.id;
    const title = target.getElementsByClassName("title")[0].textContent;
    const desc = target.getElementsByClassName("description")[0].textContent;
    const skills = target.getElementsByClassName("skill");
    let skillArray = [];

    for (let i = 0; i < skills.length; i++) {
      skillArray.push(skills[i].textContent);
    }

    const work = {
      id: workId,
      title: title,
      desc: desc,
      skills: skillArray,
    };

    navigate("/findwork/bid", {
      state: {
        work: work,
      },
    });
  };

  const renderBidBody = (work) => {
    return (
      <div id={work._id} key={work._id} className="user-bid">
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
          <div className="btn" onClick={bid}>
            Bid now
          </div>
        </div>
      </div>
    );
  };

  const call = (event) => {
    const category = event.target.value;
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
    let newWorks = [];

    for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray[i].getElementsByTagName("input")[0].checked) {
        selectedSkills.push(
          checkboxArray[i].getElementsByTagName("label")[0].textContent
        );
      }
    }
    if (selectedSkills.length === 0) {
      setworks(originalWorks);
      return;
    }
    for (let k = 0; k < originalWorks.length; k++) {
      const work = originalWorks[k];
      if (selectedSkills.length === 0) {
        setworks(originalWorks);
        break;
      }
      const isPresent = (array, element) => {
        for (let i = 0; i < array.length; i++) {
          if (array[i].toLowerCase() === element.toLowerCase()) {
            return true;
          }
        }

        return false;
      };

      for (let i = 0; i < selectedSkills.length; i++) {
        if (!isPresent(work.qualifications, selectedSkills[i])) {
          break;
        }
        if (i === selectedSkills.length - 1) {
          newWorks.push(work);
        }
      }
    }

    setworks(newWorks);
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
