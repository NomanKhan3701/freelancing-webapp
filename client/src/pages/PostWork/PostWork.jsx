import React, { useState, useEffect } from "react";
import { DragAndDropImg, Navbar } from "../../components/import";
import { Multiselect } from "multiselect-react-dropdown";
import "./PostWork.scss";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { Select } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

const PostWork = () => {
  const navigate = useNavigate();
  const [sOptions, setSOptions] = useState([
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "ReactJs", label: "ReactJs" },
    { value: "NodeJs", label: "NodeJs" },
    { value: "MongoDB", label: "MongoDB" },
  ]);
  const [isLoading, setLoading] = useState(true);
  const [postWorkData, setPostWorkData] = useState({
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
<<<<<<< HEAD

    axios.get(`http://localhost:8080/findtalent/postwork`)
=======
    axios
      .get(`http://localhost:8080/findtalent/postwork`)
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
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
<<<<<<< HEAD
      })
=======
      });
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const onDataChange = (event) => {
<<<<<<< HEAD

    const { name, value } = event.target;
    setPostWorkData((previousWorkData) => {
      return (
        {
          ...previousWorkData,
          [name]: value,
        }
      );
    });
  }

  const onSelectCategory = (selectedList, selectedItem) => {
=======
    const { name, value } = event.target;
    setPostWorkData((previousWorkData) => {
      return { ...previousWorkData, [name]: value };
    });
  };
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d

  const onSelectCategory = (selectedList, selectedItem) => {
    changeSkills(selectedItem.Category);
    setPostWorkData((previousWorkData) => {
<<<<<<< HEAD
      return (
        {
          ...previousWorkData,
          category: selectedItem.Skill,
        }
      );
=======
      return { ...previousWorkData, category: selectedItem.Skill };
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
    });
  };

  const onRemoveCategory = (selectedList, selectedItem) => {
<<<<<<< HEAD

    setPostWorkData((previousWorkData) => {
      return (
        {
          ...previousWorkData,
          category: "",
        }
      );
=======
    setPostWorkData((previousWorkData) => {
      return { ...previousWorkData, category: "" };
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
    });
  };

  const changeSkills = (category) => {
<<<<<<< HEAD

=======
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
    let skills = [];
    for (let i = 0; i < originalData.length; i++) {
      if (originalData[i].category === category) {
        for (let j = 0; j < originalData[i].skills.length; j++) {
          skills.push({ Skill: originalData[i].skills[j] });
        }
        setSkills(skills);
      }
    }
<<<<<<< HEAD
  }
=======
  };
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d

  const onSelectSkills = (selectedList, selectedItem) => {
    let skillsList = [];
    for (let i = 0; i < selectedList.length; i++) {
      skillsList.push(selectedList[i].Skill);
    }
    setPostWorkData((previousWorkData) => {
<<<<<<< HEAD
      return (
        {
          ...previousWorkData,
          skills: skillsList,
        }
      );
=======
      return { ...previousWorkData, skills: skillsList };
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
    });
  };

  const onRemoveSkills = (selectedList, selectedItem) => {
    let skillsList = [];
    for (let i = 0; i < selectedList.length; i++) {
      skillsList.push(selectedList[i].Skill);
    }
    setPostWorkData((previousWorkData) => {
<<<<<<< HEAD
      return (
        {
          ...previousWorkData,
          skills: skillsList,
        }
      );
=======
      return { ...previousWorkData, skills: skillsList };
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
    });
  };

  const isValidToNavigate = () => {
    let title, desc, category, minBid, maxBid;
    let skills = [];
    try {
      title = document.querySelector("input[name = title]").value;
      desc = document.querySelector("textarea[name = desc]").value;

<<<<<<< HEAD
    const title = document.querySelector('input[name = title]').value;
    const desc = document.querySelector('textarea[name = desc]').value;
    const category = document.getElementById("category").getElementsByTagName("span")[0].innerText;
    const skills = [];
    const minBid = document.querySelector('input[name = minBid]').value;
    const maxBid = document.querySelector('input[name = maxBid]').value;

    for (let i = 0; i < document.getElementById("skills").getElementsByTagName("span").length; i++) {
      skills.push(document.getElementById("skills").getElementsByTagName("span")[i].innerText);
    }

    if (title && desc && category && minBid && maxBid && skills !== undefined && skills !== null && skills.length > 0) {
=======
      minBid = document.querySelector("input[name = minBid]").value;
      maxBid = document.querySelector("input[name = maxBid]").value;
      if (!title || !desc || !minBid || !maxBid) {
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
    if (maxBid < 0 || minBid < 0) {
      toast.error("Bid cannot be less than 0.", {
        position: "top-center",
      });
      return false;
    }
    if (maxBid <= minBid) {
      toast.error("Max bid has to be greater than min bid.", {
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
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
      navigate("/");
      return true;
    } else {
      toast.error("please select atleast one skill.", {
        position: "top-center",
      });
    }
    return false;
  };

  const newPostForWork = (event) => {
    const goAhead = isValidToNavigate();
    if (!goAhead) {
      return;
    }
    axios
<<<<<<< HEAD
      .post(`http://localhost:8080/findtalent/postwork`, { postWorkData: postWorkData })
=======
      .post(`http://localhost:8080/findtalent/postwork`, {
        postWorkData: postWorkData,
      })
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
      .then((response) => {
        //response is the object that contains data sent from server
        //response.data is that data
      })
      .catch((err) => {
        console.log(err);
      });
<<<<<<< HEAD

  }

=======
  };
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d

  return (
    <div className="post-request-form">
      <Navbar />
      <div className="form">
        <div className="title">
          <h1>Choose a name for your project</h1>
          <input
            name="title"
            type="text"
            placeholder="e.g. Build me a freelancing website"
            onChange={onDataChange}
          />
        </div>
        <div className="desc">
          <h1>Tell us more about your project</h1>
          <textarea
            type="text"
            name="desc"
<<<<<<< HEAD
            placeholder="Describe your project here..."
            onChange={onDataChange} />
=======
            placeholder="Describe your project here in more than 100 characters"
            onChange={onDataChange}
          />
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
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
          <Select id="category" options={categories} displayValue="Category" onSelect={onSelectCategory} onRemove={onRemoveCategory} name="category" />
        </div>
        <div className="skills-required">
          <h1>What skills are required</h1>
<<<<<<< HEAD
          <Multiselect id="skills" options={skills} displayValue="Skill" onSelect={onSelectSkills} onRemove={onRemoveSkills} name="skills" />
        </div>
        <div className="budget">
          <h1>Enter your budget</h1>
          <input type="text" placeholder="min" onChange={onDataChange} name="minBid" />
          <span>to</span>
          <input type="text" placeholder="max" onChange={onDataChange} name="maxBid" />
        </div>
        <div className="btn" onClick={newPostForWork}>Post Project
=======
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
            placeholder="min"
            onChange={onDataChange}
            name="minBid"
          />
          <span>to</span>
          <input
            type="text"
            placeholder="max"
            onChange={onDataChange}
            name="maxBid"
          />
        </div>
        <div className="btn" onClick={newPostForWork}>
          Post Project
>>>>>>> fae37e3682b96f65cec387c83f2788f225c6b64d
        </div>
      </div>
    </div>
  );
};

export default PostWork;
