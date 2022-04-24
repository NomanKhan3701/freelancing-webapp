import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import "./LinearStepper.scss";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const skills = [
  { Skill: "HTML" },
  { Skill: "CSS" },
  { Skill: "JS" },
  { Skill: "ReactJs" },
  { Skill: "NodeJs" },
  { Skill: "SCSS" },
  { Skill: "VueJs" },
];

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
  { Category: "Cyber Security", skills: ["kali linux", "nmap", "Blockchain"] },
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

const category = [
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
const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Basic information",
    // "Contact Information",
    // "Personal Information",
    "Profile",
  ];
}

const LinearStepper = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  let tempImage = localStorage.getItem("image");
  if (
    !(
      tempImage &&
      tempImage !== "undefined" &&
      !tempImage.includes("ui-avatars")
    )
  ) {
    tempImage = `https://ui-avatars.com/api/?name=${localStorage.getItem(
      "username"
    )}`;
  }
  const [getUserData, setUserData] = useState({
    username: localStorage.getItem("username"),
    fullname: "",
    desc: "",
    email: "",
    linkdin: "",
    image: tempImage,
    category: [],
    skills: [],
    rating: 0,
  });
  const onChangeData = (event) => {
    const { name, value } = event.target;
    setUserData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const getStepContent = (step) => {
    const onSelectCategory = (event) => {
      let category = [];
      for (let i = 0; i < event.length; i++) {
        category.push(event[i].Category);
      }
      setUserData((prevData) => {
        return {
          ...prevData,
          category: category,
        };
      });
    };
    const onSelectSkills = (event) => {
      let skills = [];
      for (let i = 0; i < event.length; i++) {
        skills.push(event[i].Skill);
      }
      setUserData((prevData) => {
        return {
          ...prevData,
          skills: skills,
        };
      });
    };
    const onRemoveCategory = (event) => {
      let category = [];
      for (let i = 0; i < event.length; i++) {
        category.push(event[i].Category);
      }
      setUserData((prevData) => {
        return {
          ...prevData,
          category: category,
        };
      });
    };
    const onRemoveSkills = (event) => {
      let skills = [];
      for (let i = 0; i < event.length; i++) {
        skills.push(event[i].Skill);
      }
      setUserData((prevData) => {
        return {
          ...prevData,
          skills: skills,
        };
      });
    };
    return step === 0 ? (
      <>
        <Controller
          name="fullname"
          render={({ field }) => (
            <TextField
              id="fullname"
              label="Fullname"
              variant="outlined"
              placeholder="Enter your fullname"
              fullWidth
              margin="normal"
              {...field}
              value={getUserData.fullname}
              onChange={onChangeData}
            />
          )}
        />

        <Controller
          name="email"
          render={({ field }) => (
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              placeholder="Enter your email id"
              fullWidth
              margin="normal"
              {...field}
              value={getUserData.email}
              onChange={onChangeData}
            />
          )}
        />

        <Controller
          name="linkdin"
          render={({ field }) => (
            <TextField
              id="linkdin"
              label="Linkdin Link(Optional)"
              variant="outlined"
              placeholder="Enter Your linkidin profile link"
              fullWidth
              margin="normal"
              {...field}
              value={getUserData.linkdin}
              onChange={onChangeData}
            />
          )}
        />
      </>
    ) : (
      <>
        <Controller
          name="desc"
          render={({ field }) => (
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              placeholder="Tell me about yourself ..."
              fullWidth
              margin="normal"
              {...field}
              value={getUserData.desc}
              onChange={onChangeData}
            />
          )}
        />
        <Controller
          name="image"
          render={({ field }) => (
            <div>
              <label htmlFor="myfile">Profile Image:</label>
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setUserData((prevValue) => {
                    return { ...prevValue, image: base64 };
                  })
                }
              />
            </div>
          )}
        />
        <Controller
          name="category"
          render={({ field }) => (
            <Multiselect
              id="category"
              options={category}
              displayValue="Category"
              onSelect={onSelectCategory}
              onRemove={onRemoveCategory}
              name="category"
              placeholder="Select Category"
            />
          )}
        />
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
      </>
    );
  };
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      Name: "",
      email: "",
      Phone: "",
      Description: "",
      Image: "",
      Linkedin: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    if (activeStep == steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
          setActiveStep(activeStep + 1);
        });
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitUserProfile = (event) => {
    if (event.target.textContent === "Finish") {
      let username, fullname, email, desc, image;
      username = localStorage.getItem("username");
      fullname = getUserData.fullname;
      email = getUserData.email;
      desc = getUserData.desc;
      image = getUserData.image;
      if (!image) {
        image = `https://ui-avatars.com/api/?name=${username}`;
      }
      if (!fullname) {
        toast.error("please enter your full name.", {
          position: "top-center",
        });
        return;
      }
      if (!email) {
        toast.error("please enter your email address.", {
          position: "top-center",
        });
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Invalid email address.", {
          position: "top-center",
        });
        return;
      }
      if (!desc && desc.length < 100) {
        toast.error(
          "description is mandatory and has to be greater than 100 characters.",
          {
            position: "top-center",
          }
        );
        return;
      }
      axios
        .post("http://localhost:8080/userprofileinput", {
          userData: getUserData,
        })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
      localStorage.setItem("isDataTaken", "true");
      let UserImage = localStorage.getItem("image");
      if (!UserImage || UserImage === "undefined") {
        localStorage.setItem("image", image);
      }
      try {
        if (props.stateData && "work" in props.stateData) {
          navigate(props.stateData.goingTo, {
            state: {
              work: props.stateData.work,
            },
          });
          return;
        }
        navigate(state.goingTo);
      } catch (error) {
        navigate("/");
      }
    }
  };

  return (
    <div className="linear-stepper">
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                back
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                // onClick={handleNext}
                type="submit"
                onClick={submitUserProfile}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default LinearStepper;
