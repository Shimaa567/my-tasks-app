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
import { useDataProvider, useNotify, useTranslate } from "ra-core";

const CreateTask = ({ name }) => {
  const history = useHistory();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const translate = useTranslate();

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

    dataProvider
      .create(`${name}`, { data: { title, description, status, type } })
      .then(({ data }) => {
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
        setType(data.type);
        notify(`${translate("ra.notification.successfully_created")}`, {
          type: "success",
        });
        history.push(`/${name}/${data.id}/show`);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Card>
        <Container style={{ padding: "24px" }}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>{translate("ra.action.create")}</h2>
            <Link href="/tasks" style={{ float: "right" }}>
              {translate("ra.action.back")}
            </Link>
          </Box>
          <Box>
            <>
              <Radio
                checked={type === "personal"}
                onChange={(e) => setType(e.target.value)}
                value="personal"
                name="radio-buttons"
                inputProps={{ "aria-label": "personal" }}
              />{" "}
              {translate("ra.type.personal")}
            </>
            <>
              <Radio
                checked={type === "work"}
                onChange={(e) => setType(e.target.value)}
                value="work"
                name="radio-buttons"
                inputProps={{ "aria-label": "work" }}
              />{" "}
              {translate("ra.type.work")}
            </>
          </Box>
          <Box style={{ display: "flex", justifyContent: "space-around" }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="title">
                {translate("ra.navigation.title")}
              </InputLabel>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormHelperText id="title">
                {translate("ra.action.enter_title")}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard">
              <InputLabel htmlFor="description">
                {" "}
                {translate("ra.navigation.description")}
              </InputLabel>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormHelperText id="description">
                {translate("ra.action.enter_description")}
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
              {translate("ra.status.pending")}
            </>
            <>
              <Radio
                checked={status === "InProgress"}
                onChange={(e) => setStatus(e.target.value)}
                value="InProgress"
                name="radio-buttons"
                inputProps={{ "aria-label": "InProgress" }}
              />{" "}
              {translate("ra.status.in_progress")}
            </>
            <>
              <Radio
                checked={status === "Done"}
                onChange={(e) => setStatus(e.target.value)}
                value="Done"
                name="radio-buttons"
                inputProps={{ "aria-label": "Done" }}
              />{" "}
              {translate("ra.status.done")}
            </>
          </Box>
          {error && <p>{error}</p>}

          <LoadingButton
            color="secondary"
            style={{ marginTop: "20px" }}
            onClick={submitFormHandler}
            loading={loading}
            loadingPosition="start"
            startIcon={<Save style={{ margin: "3px" }} />}
            variant="contained"
          >
            {translate("ra.action.save")}
          </LoadingButton>
        </Container>
      </Card>
    </div>
  );
};

export default CreateTask;
