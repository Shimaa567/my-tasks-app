import React from "react";

export interface Props {
  name?: string;
  Create?: React.FC;
  Edit?: React.FC;
  List?: React.FC;
  Show?: React.FC;
  axiosInstance?: any;
}

const Tasks: React.FC<Props> = ({
  name,
  axiosInstance,
  Create,
  Edit,
  List,
  Show,
}) => {
  return <div></div>;
};

export default Tasks;
