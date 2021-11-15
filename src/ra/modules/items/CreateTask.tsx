/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Card,
  Container,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Link,
} from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import Save from "@material-ui/icons/Save";
import Radio from "@mui/material/Radio";

const CreateTask = ({ api, name }) => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitFormHandler = async (e) => {
    e.preventDefault();
    // LOADING STATE
    setLoading(true);
    try {
      const { data } = await api({ title, description, status, type });
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
          <Box>
            <>
              <Radio
                checked={type === "personal"}
                onChange={(e) => setType(e.target.value)}
                value="personal"
                name="radio-buttons"
                inputProps={{ "aria-label": "personal" }}
              />{" "}
              Personal
            </>
            <>
              <Radio
                checked={type === "work"}
                onChange={(e) => setType(e.target.value)}
                value="work"
                name="radio-buttons"
                inputProps={{ "aria-label": "work" }}
              />{" "}
              Work
            </>
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
            <>
              <Radio
                checked={status === "Pending"}
                onChange={(e) => setStatus(e.target.value)}
                value="Pending"
                name="radio-buttons"
                inputProps={{ "aria-label": "Pending" }}
              />{" "}
              Pending
            </>
            <>
              <Radio
                checked={status === "InProgress"}
                onChange={(e) => setStatus(e.target.value)}
                value="InProgress"
                name="radio-buttons"
                inputProps={{ "aria-label": "InProgress" }}
              />{" "}
              In Progress
            </>
            <>
              <Radio
                checked={status === "Done"}
                onChange={(e) => setStatus(e.target.value)}
                value="Done"
                name="radio-buttons"
                inputProps={{ "aria-label": "Done" }}
              />{" "}
              Done
            </>
          </Box>
          {error && <p>{error}</p>}

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

{
  /* <Button
            variant="outlined"
            startIcon={<Save />}
            style={{ marginTop: "30px", marginBottom: "20px" }}
            onClick={submitFormHandler}
          >
            {loading ? "loading..." : "Save"}
          </Button> */
}
