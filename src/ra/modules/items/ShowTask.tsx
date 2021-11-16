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
import { useDataProvider } from "ra-core";
//import { useGetOne } from "ra-core";

export interface Params {
  id: string | undefined;
}
const ShowTask = ({ name }) => {
  const { id } = useParams<Params>();

  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");
  const dataProvider = useDataProvider();

  useEffect(() => {
    dataProvider.getOne(`${name}`, { id: `${id}` }).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [dataProvider, id, name]);

  return (
    <>
      <Card>
        <Container style={{ padding: "24px" }}>
          {loading && !data && (
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
