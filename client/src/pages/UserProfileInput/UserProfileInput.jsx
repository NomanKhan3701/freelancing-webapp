import LinearStepper from "./LinearStepper";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import { Navbar } from "../../components/import";
import "./UserProfileInput.scss";
import { useLocation } from "react-router";

function UserProfileInput() {
  const { state } = useLocation();
  return (
    <div className="user-profile-input">
      <Navbar />
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <LinearStepper stateData={state} />
        </Paper>
      </Container>
    </div>
  );
}

export default UserProfileInput;
