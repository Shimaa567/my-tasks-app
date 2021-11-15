import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Card,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";

export interface Params {
  id: string | undefined;
}
const ShowTask = ({ api }) => {
  const { id } = useParams<Params>();

  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const fetchCurrentTask = async (id) => {
        const { data } = await api({ id });
        setData(data);
        setLoading(false);
      };
      fetchCurrentTask(id);
    } catch (error) {
      setLoading(false);
      setError("Error fetching data, please try again!");
    }
  }, [api, id]);

  return (
    <>
      <Card>
        <Container style={{ padding: "24px" }}>
          {loading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress style={{ margin: "auto" }} />
            </Box>
          )}
          {error && <p>{error}</p>}
          <Link href="/tasks">Back to Tasks</Link>
          <List>
            <ListItem alignItems="flex-start">
              {data ? (
                <ListItemText
                  primary={data.title}
                  secondary={data.description}
                ></ListItemText>
              ) : (
                <ListItemText
                  primary="There's an error occurred"
                  secondary="Check your server"
                ></ListItemText>
              )}
            </ListItem>
          </List>
        </Container>
      </Card>
    </>
  );
};

export default ShowTask;
