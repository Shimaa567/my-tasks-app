import React from "react";
import { DataGrid } from "@mui/x-data-grid";
//import { useDemoData } from "@mui/x-data-grid-generator";
const TasksList = ({ api }) => {
  // const { data } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 1000,
  //   maxColumns: 6,
  // });
  const [data, setData] = React.useState([]);
  const name = "tasks";
  React.useEffect(() => {
    const listData = async () => {
      const { data } = await api();
      setData(data);
    };
    listData();
  }, [api]);
  return (
    <>
      <h2 style={{ margin: "10px" }}>List of {`${name}`}</h2>
      <div style={{ height: 400, width: "100%", marginTop: "30px" }}>
        <DataGrid
          pagination
          rows={data}
          columns={[
            { field: "title" },
            { field: "description", width: 200 },
            { field: "status" },
            { field: "type" },
          ]}
        />
      </div>
    </>
  );
};

export default TasksList;
