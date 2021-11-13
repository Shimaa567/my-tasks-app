import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Card,
  Container,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  FormControlLabel,
  Box,
  RadioGroup,
  Link,
} from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import Save from "@material-ui/icons/Save";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";

const CreateTask = ({ api }) => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitFormHandler = async (e) => {
    e.preventDefault();
    // console.log(id, title, description);
    // LOADING STATE
    setLoading(true);
    try {
      const { data } = await api({ title, description, status, type });
      // const { data } = await api({ title, description });
      // SUCCESS STATE
      setLoading(false);
      history.push(`/tasks/${data.id}/show`);
    } catch (error) {
      // FAILURE STATE
      setLoading(false);
      // const message = error.response.data.message;
      setError("Failed to create task, please try again!");
      console.log(error);
    }
  };

  return (
    <div>
      <Card>
        <Container style={{ padding: "24px" }}>
          <Link href="/tasks" style={{ float: "right" }}>
            Back to Tasks{" "}
          </Link>

          <h2>Create a new Task</h2>
          <Box component="form">
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="type"
                name="row-radio-buttons-group"
                onChange={(e) => setType(e.target.value)}
              >
                <FormControlLabel
                  value="personal"
                  control={<Radio />}
                  label="Personal"
                />
                <FormControlLabel
                  value="work"
                  control={<Radio />}
                  label="Work"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl variant="standard">
              <InputLabel htmlFor="title">Title*</InputLabel>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormHelperText id="title">Enter the task title</FormHelperText>
            </FormControl>

            <FormControl variant="standard" style={{ marginLeft: "100px" }}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormHelperText id="description">
                Enter the task description
              </FormHelperText>
            </FormControl>
          </Box>
          <Box style={{ margin: "10px 0 10px 0" }}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="status"
                name="row-radio-buttons-group"
                onChange={(e) => setStatus(e.target.value)}
              >
                <FormControlLabel
                  value="pending"
                  control={<Checkbox />}
                  label="Pending"
                />
                <FormControlLabel
                  value="in progress"
                  control={<Checkbox />}
                  label="In Progress"
                />
                <FormControlLabel
                  value="done"
                  control={<Checkbox />}
                  label="Done"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {error && <p>{error}</p>}
          {/* <Button
            variant="outlined"
            startIcon={<Save />}
            style={{ marginTop: "30px", marginBottom: "20px" }}
            onClick={submitFormHandler}
          >
            {loading ? "loading..." : "Save"}
          </Button> */}
          <LoadingButton
            color="secondary"
            style={{ marginTop: "20px" }}
            onClick={submitFormHandler}
            loading={loading}
            loadingPosition="start"
            startIcon={<Save />}
            variant="contained"
          >
            Save
          </LoadingButton>
        </Container>
      </Card>
    </div>
  );
};

export default CreateTask;
