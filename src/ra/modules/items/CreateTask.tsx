import React, { useState } from "react";
import { useHistory } from "react-router";
import { useId, setPrefix } from "react-id-generator";
import {
  Card,
  Container,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Button,
  Link,
} from "@material-ui/core";
import Save from "@material-ui/icons/Save";

setPrefix("_sourcya");

const CreateTask = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [id] = useId();
  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log(id, title, description);
    history.push(`/tasks/${id}/show`);
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

          <Button
            variant="outlined"
            startIcon={<Save />}
            style={{ marginTop: "30px", marginBottom: "20px" }}
            onClick={submitFormHandler}
          >
            Save
          </Button>
        </Container>
      </Card>
    </div>
  );
};

export default CreateTask;
