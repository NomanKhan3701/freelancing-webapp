import React, { useState } from "react";
import { DragAndDropImg, Footer, Navbar } from "../../components/import";
import { Multiselect } from "multiselect-react-dropdown";
import Select from "react-dropdown-select";
import "./PostRequest.scss";

const PostRequest = () => {
  const data = [
    { Skill: "HTML" },
    { Skill: "CSS" },
    { Skill: "JavaScript" },
    { Skill: "React" },
    { Skill: "PHP" },
    { Skill: "NodeJs" },
    { Skill: "MongoDB" },
  ];

  const [sOptions, setSOptions] = useState([
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "ReactJs", label: "ReactJs" },
    { value: "NodeJs", label: "NodeJs" },
    { value: "MongoDB", label: "MongoDB" },
  ]);
  const [options, setOptions] = useState(data);

  const postRequest = () => {};
  return (
    <div className="post-request">
      <Navbar />
      <div className="form">
        <div className="title">
          <h1>Choose a name for your project</h1>
          <input
            type="text"
            placeholder="e.g. Build me a freelancing website"
          />
        </div>
        <div className="desc">
          <h1>Tell us more about your project</h1>
          <textarea type="text" placeholder="Describe your project here..." />
        </div>
        <div className="dragDrop">
          <h1>{"{Select Files}"}</h1>
        </div>
        <div className="category-select">
          <h1>Select a category</h1>
          <Select options={sOptions} />
        </div>
        <div className="skills-required">
          <h1>What skills are required</h1>
          <Multiselect options={options} displayValue="Skill" />
        </div>
        <div className="budget">
          <h1>Enter your budget</h1>
          <input type="text" placeholder="min" />
          <span>to</span>
          <input type="text" placeholder="max" />
        </div>
        <div className="btn" onClick={postRequest}>
          Post Project
        </div>
      </div>
    </div>
  );
};

export default PostRequest;
