import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { UserProfile } from "../import";

const skills = [
  { Skill: "HTML" },
  { Skill: "CSS" },
  { Skill: "JS" },
  { Skill: "ReactJs" },
  { Skill: "NodeJs" },
  { Skill: "SCSS" },
  { Skill: "VueJs" },
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

const LinearStepper = () => {
  const [getUserData, setUserData] = useState({
    username: localStorage.getItem("username"),
    fullname: "",
    desc: "",
    email: "",
    linkdin: "",
    image: "",
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
    // const Profile = () => {
    //   const { control } = useFormContext();
    //   const onSelectSkills = (selectedList, selectedItem) => {};

    //   const onRemoveSkills = (selectedList, selectedItem) => {};

    //   const onSelectCategory = (selectedList, selectedItem) => {};

    //   const onRemoveCategory = (selectedList, selectedItem) => {};
    //   return (
    //     <>
    //       <Controller
    //         control={control}
    //         name="description"
    //         render={({ field }) => (
    //           <TextField
    //             id="description"
    //             label="Description"
    //             variant="outlined"
    //             placeholder="Tell me about yourself ..."
    //             fullWidth
    //             margin="normal"
    //             {...field}
    //           />
    //         )}
    //       />
    //       <Controller
    //         control={control}
    //         name="image"
    //         render={({ field }) => (
    //           <div>
    //             <label for="myfile">Profile Image:</label>
    //             <input type="file" id="image" name="image" />
    //           </div>
    //         )}
    //       />
    //       <Controller
    //         control={control}
    //         name="category"
    //         render={({ field }) => (
    //           <Multiselect
    //             id="category"
    //             options={category}
    //             displayValue="Category"
    //             onSelect={onSelectCategory}
    //             onRemove={onRemoveCategory}
    //             name="category"
    //           />
    //         )}
    //       />
    //       <Controller
    //         control={control}
    //         name="skills"
    //         render={({ field }) => (
    //           <Multiselect
    //             id="skills"
    //             options={skills}
    //             displayValue="Skill"
    //             onSelect={onSelectSkills}
    //             onRemove={onRemoveSkills}
    //             name="skills"
    //           />
    //         )}
    //       />
    //     </>
    //   );
    // };
    // const BasicForm = () => {
    //   const { control } = useFormContext();
    //   return (
    //     <>
    //       <Controller
    //         control={control}
    //         name="fullname"
    //         render={({ field }) => (
    //           <TextField
    //             id="fullname"
    //             label="Fullname"
    //             variant="outlined"
    //             placeholder="Enter your fullname"
    //             fullWidth
    //             margin="normal"
    //             {...field}
    //             value={getUserData.fullname}
    //             onChange={onChangeData}
    //           />
    //         )}
    //       />

    //       <Controller
    //         control={control}
    //         name="email"
    //         render={({ field }) => (
    //           <TextField
    //             id="email"
    //             label="Email"
    //             variant="outlined"
    //             placeholder="Enter your email id"
    //             fullWidth
    //             margin="normal"
    //             {...field}
    //           />
    //         )}
    //       />

    //       <Controller
    //         control={control}
    //         name="linkdin"
    //         render={({ field }) => (
    //           <TextField
    //             id="linkdin"
    //             label="Linkdin Link(Optional)"
    //             variant="outlined"
    //             placeholder="Enter Your linkidin profile link"
    //             fullWidth
    //             margin="normal"
    //             {...field}
    //           />
    //         )}
    //       />
    //     </>
    //   );
    // };
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
              <label for="myfile">Profile Image:</label>
              <input type="file" id="image" name="image" />
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
            />
          )}
        />
      </>
    );

    // switch (step) {
    //   case 0:
    //     return <BasicForm />;
    //   case 1:
    //     return <Profile />;
    //   default:
    //     return "unknown step";
    // }
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

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    if (activeStep == steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
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

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const submitUserProfile = (event) => {
    console.log(getUserData);
    // try{
    //   setUserData((prevData) => {
    //     return ({
    //       ...prevData,
    //     });
    //   })
    // }
    if (event.target.textContent === "Finish") {
      event.preventDefault();
      let username, fullname, email, linkdin, desc, image, category, skills;
      username = localStorage.getItem("username");
      fullname = getUserData.fullname;
      email = getUserData.email;
      linkdin = getUserData.linkdin;
      desc = getUserData.desc;
      image = getUserData.image;
      category = getUserData.category;
      skills = getUserData.skills;
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
    }
  };
  return (
    <div>
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
