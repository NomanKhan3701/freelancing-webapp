import React, { useState, useEffect } from "react";
import { DragAndDropImg, Navbar } from "../../components/import";
import { Multiselect } from "multiselect-react-dropdown";
import "../PostWork/PostWork.scss";
import axios from "axios";
import LoadingSpinner from "../PostWork/LoadingSpinner";
import { Select } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {

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

        axios.get(`http://localhost:8080/findtalent/postwork`)
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
            })
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const onDataChange = (event) => {

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

        changeSkills(selectedItem.Category);
        setPostWorkData((previousWorkData) => {
            return (
                {
                    ...previousWorkData,
                    category: selectedItem.Skill,
                }
            );
        });
    }

    const onRemoveCategory = (selectedList, selectedItem) => {

        setPostWorkData((previousWorkData) => {
            return (
                {
                    ...previousWorkData,
                    category: "",
                }
            );
        });
    }

    const changeSkills = (category) => {

        let skills = [];
        for (let i = 0; i < originalData.length; i++) {
            if (originalData[i].category === category) {
                for (let j = 0; j < originalData[i].skills.length; j++) {
                    skills.push({ Skill: originalData[i].skills[j] });
                }
                setSkills(skills);
            }
        }
    }

    const onSelectSkills = (selectedList, selectedItem) => {

        let skillsList = [];
        for (let i = 0; i < selectedList.length; i++) {
            skillsList.push(selectedList[i].Skill);
        }
        setPostWorkData((previousWorkData) => {
            return (
                {
                    ...previousWorkData,
                    skills: skillsList,
                }
            );
        });
    }

    const onRemoveSkills = (selectedList, selectedItem) => {
        let skillsList = [];
        for (let i = 0; i < selectedList.length; i++) {
            skillsList.push(selectedList[i].Skill);
        }
        setPostWorkData((previousWorkData) => {
            return (
                {
                    ...previousWorkData,
                    skills: skillsList,
                }
            );
        });
    }

    const isValidToNavigate = () => {

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
            navigate("/");
            return true;
        }
        return false;
    }

    const newPostForWork = (event) => {

        const goAhead = isValidToNavigate();
        if (!goAhead) {
            return;
        }
        axios
            .post(`http://localhost:8080/findtalent/postwork`, { postWorkData: postWorkData })
            .then((response) => {
                //response is the object that contains data sent from server
                //response.data is that data
            })
            .catch((err) => {
                console.log(err);
            });

    }


    return (
        <div className="post-request-form">
            <Navbar />
            <div className="form">
                <div className="title">
                    <h1>Enter your Name:</h1>
                    <input
                        name="title"
                        type="text"
                        placeholder="Name"
                        onChange={onDataChange}
                    />
                </div>
                <div className="desc">
                    <h1>Enter your Description</h1>
                    <textarea
                        type="text"
                        name="desc"
                        placeholder="Give your description here..."
                        onChange={onDataChange} />
                </div>
                <div className="title">
                    <h1>Enter your email id:</h1>
                    <input
                        name="title"
                        type="text"
                        placeholder="email"
                        onChange={onDataChange}
                    />
                </div>
                <div className="title">
                    <h1>Enter your phone number:</h1>
                    <input
                        name="title"
                        type="text"
                        placeholder="phone number"
                        onChange={onDataChange}
                    />
                </div>
                <div className="desc">
                    <h1>Enter your Address</h1>
                    <textarea
                        type="text"
                        name="desc"
                        placeholder="Give your address here..."
                        onChange={onDataChange} />
                </div>
                <div className="dragDrop">
                    <h1>{"{Profile Image}"}</h1>
                </div>
                {/* <div className = "category-select">
          <h1>Select a category</h1>
          <Select
            options = {sOptions}
          />
        </div> */}
                {/* <div className="skills-required">
                    <h1>Category</h1>
                    <Multiselect id="category" options={categories} displayValue="Category" onSelect={onSelectCategory} onRemove={onRemoveCategory} name="category" />
                </div>
                <div className="skills-required">
                    <h1>What skills are required</h1>
                    <Multiselect id="skills" options={skills} displayValue="Skill" onSelect={onSelectSkills} onRemove={onRemoveSkills} name="skills" />
                </div>
                <div className="budget">
                    <h1>Enter your budget</h1>
                    <input type="text" placeholder="min" onChange={onDataChange} name="minBid" />
                    <span>to</span>
                    <input type="text" placeholder="max" onChange={onDataChange} name="maxBid" />
                </div> */}
                <div className="btn" onClick={newPostForWork}>Submit Description
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
