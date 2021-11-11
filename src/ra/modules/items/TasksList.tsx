import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const TasksList = (props) => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 1000,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid pagination {...data} />
    </div>
  );
};

export default TasksList;
