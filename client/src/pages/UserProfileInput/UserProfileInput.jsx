import LinearStepper from "./LinearStepper";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import { Navbar } from "../../components/import";

function UserProfileInput() {
  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <LinearStepper />
        </Paper>
      </Container>
    </>
  );
}

export default UserProfileInput;
