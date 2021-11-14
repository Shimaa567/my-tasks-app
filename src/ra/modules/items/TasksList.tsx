import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

//import { useDemoData } from "@mui/x-data-grid-generator";
const TasksList = ({ api }) => {
  // const { data } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 1000,
  //   maxColumns: 6,
  // });
  const [data, setData] = React.useState([]);
  const name = "tasks";
  const history = useHistory();

  React.useEffect(() => {
    const listData = async () => {
      const { data } = await api();
      setData(data);
    };
    listData();
  }, [api]);
  const editItem = () => {};
  const deleteItem = () => {};
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
          ]}
        />
      </div>
    </>
  );
};

export default TasksList;
