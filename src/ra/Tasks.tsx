import React from "react";

export interface Props {
  name?: string;
  Create?: React.FC;
  Edit?: React.FC;
  List?: React.FC;
  Show?: React.FC;
}

const Tasks: React.FC<Props> = ({ name, Create, Edit, List, Show }) => {
  return <div></div>;
};

export default Tasks;
