import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { showItem } from "../../customRoutes";
import {
  Card,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useQuery } from "react-admin";
//import { useDataProvider } from "react-admin";

interface Params {
  id: string | undefined;
}
const ShowTask = (props) => {
  const { id } = useParams<Params>();
  //const dataProvider = useDataProvider();

  const { data, loading, error } = useQuery({
    type: "getOne",
    resource: "tasks",
    payload: { id },
  });

  const [CurrentTask, setCurrentTask] = useState<any>();

  useEffect(() => {
    setCurrentTask(data);
    // dataProvider
    //   .getOne("tasks", { id })
    //   .then(({ data }) => {
    //     console.log(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setError(error);
    //     setLoading(false);
    //   });
  }, [data]);
  return (
    <Card>
      <Container style={{ padding: "24px" }}>
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
  );
};

export default ShowTask;
