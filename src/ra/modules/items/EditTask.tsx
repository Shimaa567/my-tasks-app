import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
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
import { Params } from "./ShowTask";
import { useDataProvider, useNotify, useTranslate } from "ra-core";

const EditTask = ({ name }) => {
  const { id } = useParams<Params>();
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

  React.useEffect(() => {
    dataProvider
      .getOne(`${name}`, { id: `${id}` })
      .then(({ data }) => {
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
        setType(data.type);
      })
      .catch((err) => {
        setError("Can not found the task");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dataProvider, name, id, notify, history]);

  const updateHandler = (e) => {
    e.preventDefault();
    dataProvider
      .update(`${name}`, {
        id: `${id}`,
        data: { title, description, status, type },
        previousData: { id: `${id}` },
      })
      .then(({ data }) => {
        setTitle(data.title);
        setDescription(data.description);
        setStatus(data.status);
        setType(data.type);
        notify(`${translate("ra.notification.successfully_updated")}`, {
          type: "success",
        });
        history.push(`/${name}/${data.id}/show`);
      });
  };

  return (
    <div>
      <Card>
        <Container style={{ padding: "24px" }}>
          <Link href="/tasks" style={{ float: "right" }}>
            {translate("ra.action.back")}
          </Link>

          <h2>{translate("ra.action.edit")}</h2>
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
          <Box>
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
                {" "}
                {translate("ra.action.enter_title")}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard" style={{ marginLeft: "100px" }}>
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
            onClick={updateHandler}
            loading={loading}
            loadingPosition="start"
            startIcon={<Save />}
            variant="contained"
          >
            {translate("ra.action.save")}
          </LoadingButton>
        </Container>
      </Card>
    </div>
  );
};

export default EditTask;
