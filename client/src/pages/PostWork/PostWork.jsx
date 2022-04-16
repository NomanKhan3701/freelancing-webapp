import React, { useState, useEffect } from "react";
import { Navbar, FullScreenLoader } from "../../components/import";
import { Multiselect } from "multiselect-react-dropdown";
import "./PostWork.scss";
import axios from "axios";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { toast } from "react-toastify";
toast.configure();

const PostWork = () => {
  let image = localStorage.getItem("image");
  if (!image) {
    image = `https://ui-avatars.com/api/?name=${localStorage.getItem(
      "username"
    )}`;
  }
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

  const [category, setCategory] = useState();

  const [userUploadedImage, setUserUploadedImage] = useState();
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
          const newSOptions = [];
          for (let i = 0; i < category.length; i++) {
            newSOptions.push({
              value: category[i].Category,
              label: category[i].Category,
            });
          }
          setSOptions(newSOptions);
        }
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const onDataChange = (event) => {
    const { name, value } = event.target;
    setPostWorkData((previousWorkData) => {
      return { ...previousWorkData, [name]: value };
    });
  };
  const categoryChange = (event) => {
    setCategory(event[0].value);
    changeSkills(event[0].value);
    setPostWorkData((previousWorkData) => {
      return { ...previousWorkData, category: event[0].value };
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
    setPostWorkData((previousWorkData) => {
      return { ...previousWorkData, skills: skillsList };
    });
  };

  const onRemoveSkills = (selectedList, selectedItem) => {
    let skillsList = [];
    for (let i = 0; i < selectedList.length; i++) {
      skillsList.push(selectedList[i].Skill);
    }
    setPostWorkData((previousWorkData) => {
      return { ...previousWorkData, skills: skillsList };
    });
  };

  const isValidToNavigate = () => {
    let title, desc, minBid, maxBid;
    let skills = [];
    try {
      title = document.querySelector("input[name = title]").value;
      desc = document.querySelector("textarea[name = desc]").value;

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
    if (!category) {
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
    if (/\s/.test(minBid) || /\s/.test(maxBid)) {
      toast.error("Amount cannot contain space.", {
        position: "top-center",
      });
      return false;
    }
    if (!/^\d+$/.test(minBid) || !/^\d+$/.test(maxBid)) {
      toast.error("Amount needs to be numerical value.", {
        position: "top-center",
      });
      return false;
    }
    if (!parseInt(maxBid) || !parseInt(minBid)) {
      toast.error("Amount needs to be numerical value.", {
        position: "top-center",
      });
      return false;
    }
    if (parseInt(maxBid) < 0 || parseInt(minBid) < 0) {
      toast.error("Bid cannot be less than 0.", {
        position: "top-center",
      });
      return false;
    }
    if (parseInt(maxBid) <= parseInt(minBid)) {
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
      toast.success("Work Posted successfully.", {
        position: "top-center",
      });
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
    if (userUploadedImage && "image" in userUploadedImage) {
      setUserUploadedImage(userUploadedImage.image);
    } else {
      setUserUploadedImage("");
    }
    const data = {
      ...postWorkData,
      username: localStorage.getItem("username"),
      workImage: userUploadedImage,
      image: image,
    };
    axios
      .post(`http://localhost:8080/findtalent/postwork`, {
        postWorkData: data,
      })
      .then((response) => {
        //response is the object that contains data sent from server
        //response.data is that data
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            placeholder="Describe your project here in more than 100 characters"
            onChange={onDataChange}
          />
        </div>
        <div className="dragDrop">
          <h1>{"Select a file(jpeg/png/pdf)"}</h1>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setUserUploadedImage({ image: base64 })}
          />
          {userUploadedImage && (
            <embed
              src={userUploadedImage.image}
              type="application/pdf"
              width="100%"
            ></embed>
          )}
        </div>
        <div className="category-select">
          <h1>Category</h1>
          <Select options={sOptions} onChange={categoryChange} />
        </div>
        <div className="skills-required">
          <h1>What skills are required</h1>
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
        </div>
      </div>
    </div>
  );
};

export default PostWork;
