import React from "react";
//import { useId } from "react-id-generator";
import { axiosInstance } from "./Dashboard";
// import {
//   TextField,
//   Card,
//   Container,
//   FormControl,
//   Box,
//   Button,
//   Link,
// } from "@material-ui/core";
//import List from "@material-ui/icons/List";

export interface ReusableComponent {
  api: any;
}
export interface Props {
  name?: string;
  Create?: React.FC<ReusableComponent>;
  Edit?: React.FC<ReusableComponent>;
  List?: React.FC<ReusableComponent>;
  Show?: React.FC<ReusableComponent>;
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
