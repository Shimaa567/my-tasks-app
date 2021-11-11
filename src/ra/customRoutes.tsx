/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { axiosInstance } from "./Dashboard";
import CreateTask from "./modules/items/CreateTask";
import EditTask from "./modules/items/EditTask";
import ShowTask from "./modules/items/ShowTask";
import TasksList from "./modules/items/TasksList";
// import Tasks from "./Tasks";
const name = "tasks";

export const createItem = async () => await axiosInstance.post(`/${name}`, []);
export const editItem = async ({ id }: { id: string }) =>
  await axiosInstance.put(`/${name}/${id}`);
export const showItem = async ({ id }: { id: string }) =>
  await axiosInstance.get(`/${name}/${id}`);
export const listItems = async () => await axiosInstance.get(`/${name}`);
//const history = createHashHistory();
export default [
  <Router>
    {/* <Route exact path="/" render={() => <Home />} /> */}
    {/* <Route exact path={`/${name}`} render={() => <Tasks />} /> */}
    <Route
      exact
      path={`/${name}`}
      render={() => <TasksList api={listItems} />}
    />
    <Route
      exact
      path={`/${name}/create`}
      render={() => <CreateTask api={createItem} />}
    />
    <Route
      exact
      path={`/${name}/:id/show`}
      render={() => <ShowTask api={showItem} />}
    />
    <Route
      exact
      path={`/${name}/:id/edit`}
      render={() => <EditTask api={editItem} />}
    />
  </Router>,
];
