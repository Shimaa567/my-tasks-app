import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, FormControlLabel, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDataProvider, useNotify } from "ra-core";

const TasksList = ({ name }) => {
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const history = useHistory();
  const dataProvider = useDataProvider();
  const notify = useNotify();

  React.useEffect(() => {
    dataProvider
      .getList(`${name}`, {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "title", order: "ASC" },
        filter: {},
      })
      .then((response) => {
        setData(response.data);
      })

      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [dataProvider, name]);

  const EditHandler = ({ index }) => {
    const editItemHandler = () => history.push(`/${name}/${index}/edit`);

    return (
      <FormControlLabel
        control={
          <IconButton color="secondary" onClick={editItemHandler}>
            <EditIcon style={{ color: "inherit" }} />
          </IconButton>
        }
        label={""}
      />
    );
  };

  const DeleteHandler = ({ index }) => {
    const deleteItemHandler = async () => {
      const id = index;
      if (window.confirm("Are you sure you want to delete this Item ?")) {
        console.log(index);
        setLoading(true);
        dataProvider
          .delete(`${name}`, {
            id: `${id}`,
            previousData: { id: `${id}` },
          })
          .then((response) => {
            const newData = data.filter((x) => id === x.id);
            setData(newData);
            setLoading(false);
            notify(`Successfully Deleted`, { type: "success" });
          })
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
        // await api.deleteItem({ index });
      }

      //api.deleteItem({ index });
    };
    return (
      <FormControlLabel
        control={
          <IconButton color="secondary" onClick={deleteItemHandler}>
            <DeleteIcon style={{ color: "#F50057" }} />
          </IconButton>
        }
        label={""}
      />
    );
  };

  return (
    <>
      <Box>
        <h2 style={{ margin: "10px" }}>List of {`${name}`}</h2>
        <Button
          variant="outlined"
          onClick={() => history.push(`${name}/create`)}
          style={{ float: "right", marginTop: "-40px" }}
        >
          <AddIcon />
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%", marginTop: "30px" }}>
        {error && <p>{error}</p>}
        {loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress style={{ margin: "auto" }} />
          </Box>
        ) : (
          <>
            <DataGrid
              pagination
              rows={data}
              columns={[
                { field: "title", headerName: "Title", editable: true },
                {
                  field: "description",
                  width: 200,
                  headerName: "Description",
                  editable: true,
                },
                { field: "status", headerName: "Status" },
                { field: "type", headerName: "Type" },
                {
                  field: "actions",
                  headerName: "",
                  renderCell: (params) => {
                    return (
                      <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                      >
                        <EditHandler index={params.row.id} />
                        <DeleteHandler index={params.row.id} />
                      </div>
                    );
                  },
                },
              ]}
            />
          </>
        )}
      </div>
    </>
  );
  // <List>
  //   {data.map((item) => (
  //     <>
  //       <ListItem>{item.title}</ListItem>
  //       <ListItem>{item.description}</ListItem>
  //       <ListItem>{item.type}</ListItem>
  //       <ListItem>{item.status}</ListItem>
  //     </>
  //   ))}
  // </List>
};

export default TasksList;
