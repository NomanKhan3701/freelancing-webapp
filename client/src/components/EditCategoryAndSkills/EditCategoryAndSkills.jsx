import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Controller } from "swiper";
import { selectUserData } from "../../features/userData/userData";
import "./EditCategoryAndSkills.scss";

const EditCategoryAndSkills = () => {
  const categoryAndSkills = [
    {
      Category: "Designer",
      skills: ["Branding", "Coding", "Illustrator", "Blender"],
    },
    {
      Category: "Frontend Web Developer",
      skills: ["HTML", "CSS", "JavaScript", "ReactJs", "VueJS"],
    },
    {
      Category: "Backend Web Developer",
      skills: ["NodeJS", "PHP", "SQL", "MongoDB", "Django"],
    },
    {
      Category: "App Developer",
      skills: ["Flutter", "Dart", "Android", "IOS", "Java"],
    },
    {
      Category: "UI/UX Designer",
      skills: ["Adobe photoshop", "Illustrator", "Figma", "CSS", "SEO"],
    },
    {
      Category: "Cyber Security",
      skills: ["kali linux", "nmap", "Blockchain"],
    },
    {
      Category: "Logo Creator",
      skills: ["Adobe Photoshop", "Illustrator", "Figma", "Canva"],
    },
    {
      Category: "Video Editor",
      skills: ["Adobe after effect", "Filmora", "Vimeo"],
    },
    {
      Category: "Models",
      skills: [
        "Good Physique",
        "No problem with camera",
        "Smiling face",
        "Communication",
      ],
    },
  ];

  const allCategory = [
    { Category: "Designer" },
    { Category: "Frontend Developer" },
    { Category: "Backend Developer" },
    { Category: "App Developer" },
    { Category: "Ui/Ux Designer" },
    { Category: "Cyber Security" },
    { Category: "Logo Creator" },
    { Category: "Video Editor" },
    { Category: "Models" },
  ];

  const allSkills = [
    { Skill: "HTML" },
    { Skill: "CSS" },
    { Skill: "JS" },
    { Skill: "ReactJs" },
    { Skill: "NodeJs" },
    { Skill: "SCSS" },
    { Skill: "VueJs" },
  ];

  const userData = useSelector(selectUserData);
  const [category, setCategory] = useState([]);
  const [skills, setSkills] = useState([]);
  console.log("userData");
  console.log(userData);
  const [catAndSkills, setCatAndSkills] = useState({
    category: [],
    skills: [],
  });
  useEffect(() => {
    setCatAndSkills((data) => {
      return { ...data, category: userData.category, skills: userData.skills };
    });
  }, [userData]);

  const onSelectCategory = (event) => {
    let category = [];
    for (let i = 0; i < event.length; i++) {
      category.push(event[i].Category);
    }
  };
  const onSelectSkills = (event) => {
    let skills = [];
    for (let i = 0; i < event.length; i++) {
      skills.push(event[i].Skill);
    }
  };
  const onRemoveCategory = (event) => {
    let category = [];
    for (let i = 0; i < event.length; i++) {
      category.push(event[i].Category);
    }
  };
  const onRemoveSkills = (event) => {
    let skills = [];
    for (let i = 0; i < event.length; i++) {
      skills.push(event[i].Skill);
    }
  };
  return (
    <div className="edit-info-title">
      <div className="skills-container">
        <h1>Category</h1>
        <div className="skills">
          {catAndSkills.category.map((category, index) => {
            return (
              <div className="skill" key={index}>
                {category}
              </div>
            );
          })}
        </div>
        <Controller
          name="category"
          render={({ field }) => (
            <Multiselect
              id="category"
              options={allCategory}
              displayValue="Category"
              onSelect={onSelectCategory}
              onRemove={onRemoveCategory}
              name="category"
              placeholder="Select Category"
            />
          )}
        />
      </div>
      <div className="skills-container">
        <h1>Skills</h1>
        <div className="skills">
          {catAndSkills.skills.map((skill, index) => {
            return (
              <div className="skill" key={index}>
                {skill}
              </div>
            );
          })}
        </div>
        <Controller
          name="skills"
          render={({ field }) => (
            <Multiselect
              id="skills"
              options={skills}
              displayValue="Skill"
              onSelect={onSelectSkills}
              onRemove={onRemoveSkills}
              name="skills"
              placeholder="Select skills"
            />
          )}
        />
      </div>{" "}
    </div>
  );
};

export default EditCategoryAndSkills;
