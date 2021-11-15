import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, FormControlLabel, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
//import { dataProvider } from "../../service";

//import { useDemoData } from "@mui/x-data-grid-generator";
const TasksList = ({ api }) => {
  // const { data } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 1000,
  //   maxColumns: 6,
  // });
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const name = "tasks";
  const history = useHistory();

  React.useEffect(() => {
    const listData = async () => {
      const { data } = await api.listItems();
      setData(data);
      setLoading(false);
    };
    listData();
  }, [api]);

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
      if (window.confirm("Are you sure you want to delete this Item ?")) {
        console.log(index);
        //   //dataProvider.delete(`${name}`, { index });
        await api.deleteItem({ index });
      }
      history.push("/");
      console.log(index);

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
};

export default TasksList;

// {field: 'actions', type: "actions", getActions: (params) => [
//   <GridActionsCellItem
//   icon={<EditIcon />}
//   label="Edit"
//   onClick={editItem(params.id)}
//   showInMenu
// />,
// <GridActionsCellItem
//   icon={<DeleteIcon />}
//   label="Delete"
//   onClick={deleteItem(params.id)}
// />,
// ]}
