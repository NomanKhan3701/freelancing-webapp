import React, { useState, useEffect } from "react";
import { Navbar, FullScreenLoader } from "../../components/import";
import { Multiselect } from "multiselect-react-dropdown";
import "./PostTalent.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();

const PostTalent = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [postTalentData, setPostTalentData] = useState({
    title: "",
    desc: "",
    category: "",
    skills: [],
    price: null,
    perHourRate: null,
  });
  const [categories, setCategories] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/findtalent/postwork`)
      .then(function (response) {
        setOriginalData(response.data.filterData);
        let category = [];
        for (let i = 0; i < response.data.filterData.length; i++) {
          category[i] = { Category: response.data.filterData[i].category };
        }
        if (categories.length === 0) {
          setCategories(category);
        }
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const onDataChange = (event) => {
    const { name, value } = event.target;
    setPostTalentData((previousTalentData) => {
      return { ...previousTalentData, [name]: value };
    });
  };

  const onSelectCategory = (selectedList, selectedItem) => {
    changeSkills(selectedItem.Category);
    setPostTalentData((previousTalentData) => {
      return { ...previousTalentData, category: selectedItem.Category };
    });
  };

  const onRemoveCategory = (selectedList, selectedItem) => {
    changeSkills("");
    setPostTalentData((previousTalentData) => {
      return { ...previousTalentData, category: "" };
    });
  };

  const changeSkills = (category) => {
    if (category === "") {
      setSkills([]);
      return;
    }
    let skills = [];
    for (let i = 0; i < originalData.length; i++) {
      if (originalData[i].category === category) {
        for (let j = 0; j < originalData[i].skills.length; j++) {
          skills.push({ Skill: originalData[i].skills[j] });
        }
        setSkills(skills);
      }
    }
  };

  const onSelectSkills = (selectedList, selectedItem) => {
    let skillsList = [];
    for (let i = 0; i < selectedList.length; i++) {
      skillsList.push(selectedList[i].Skill);
    }
    setPostTalentData((previousTalentData) => {
      return { ...previousTalentData, skills: skillsList };
    });
  };

  const onRemoveSkills = (selectedList, selectedItem) => {
    let skillsList = [];
    for (let i = 0; i < selectedList.length; i++) {
      skillsList.push(selectedList[i].Skill);
    }
    setPostTalentData((previousTalentData) => {
      return { ...previousTalentData, skills: skillsList };
    });
  };

  const isValidToNavigate = () => {
    let title, desc, category, perHourRate, price;
    let skills = [];
    try {
      title = document.querySelector("input[name = title]").value;
      desc = document.querySelector("textarea[name = desc]").value;

      perHourRate = document.querySelector("input[name = perHourRate]").value;
      price = document.querySelector("input[name = price]").value;
      if (!title || !desc || !perHourRate || !price) {
        toast.error("Input cannot be empty.", {
          position: "top-center",
        });
        return false;
      }
    } catch (err) {
      toast.error("Input cannot be empty.", {
        position: "top-center",
      });
      return false;
    }
    try {
      category = document
        .getElementById("category")
        .getElementsByTagName("span")[0].innerText;
    } catch (error) {
      toast.error("Select Category.", {
        position: "top-center",
      });
      return false;
    }
    if (title.length < 15) {
      toast.error("Title must be atleast 15 characters long.", {
        position: "top-center",
      });
      return false;
    }
    if (desc.length < 100) {
      toast.error("Description must be atleast 100 characters long.", {
        position: "top-center",
      });
      return false;
    }
    if (price < 0 || perHourRate < 0) {
      toast.error("Prices cannot be less than 0.", {
        position: "top-center",
      });
      return false;
    }

    for (
      let i = 0;
      i < document.getElementById("skills").getElementsByTagName("span").length;
      i++
    ) {
      skills.push(
        document.getElementById("skills").getElementsByTagName("span")[i]
          .innerText
      );
    }

    if (skills !== undefined && skills !== null && skills.length > 0) {
      return true;
    } else {
      toast.error("please select atleast one skill.", {
        position: "top-center",
      });
    }
    return false;
  };

  const newPostForTalent = (event) => {
    event.preventDefault();
    const goAhead = isValidToNavigate();
    if (!goAhead) {
      return;
    }
    const data = {
      ...postTalentData,
      username: localStorage.getItem("username"),
    };
    axios
      .post(`http://localhost:8080/findwork/posttalent`, {
        postTalentData: data,
      })
      .then((response) => {
        //response is the object that contains data sent from server
        //response.data is that data
        if (response.data.result === 3) {
          toast.error("User can only post talent once in each category.", {
            position: "top-center",
          });
        } else if (response.data.result === 1) {
          toast.error("Insufficient Data.", {
            position: "top-center",
          });
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="post-request">
      <Navbar />
      <div className="form">
        <div className="title">
          <h1>Title </h1>
          <input
            name="title"
            type="text"
            placeholder="e.g. Web Devloper"
            onChange={onDataChange}
          />
        </div>
        <div className="desc">
          <h1>Tell us more about you</h1>
          <textarea
            type="text"
            name="desc"
            placeholder="Describe yourself here in more than 100 characters"
            onChange={onDataChange}
          />
        </div>
        <div className="dragDrop">
          <h1>{"{Select Files}"}</h1>
        </div>
        {/* <div className = "category-select">
          <h1>Select a category</h1>
          <Select
            options = {sOptions}
          />
        </div> */}
        <div className="skills-required">
          <h1>Category</h1>
          <Multiselect
            id="category"
            options={categories}
            displayValue="Category"
            onSelect={onSelectCategory}
            onRemove={onRemoveCategory}
            name="category"
          />
        </div>
        <div className="skills-required">
          <h1>Your Skills</h1>
          <Multiselect
            id="skills"
            options={skills}
            displayValue="Skill"
            onSelect={onSelectSkills}
            onRemove={onRemoveSkills}
            name="skills"
          />
        </div>
        <div className="budget">
          <h1>Enter your budget</h1>
          <input
            type="text"
            placeholder="perHour"
            onChange={onDataChange}
            name="perHourRate"
          />
          <span>to</span>
          <input
            type="text"
            placeholder="total"
            onChange={onDataChange}
            name="price"
          />
        </div>
        <div className="btn" onClick={newPostForTalent}>
          Post Talent
        </div>
      </div>
    </div>
  );
};

export default PostTalent;
