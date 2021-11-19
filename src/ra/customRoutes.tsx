/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
// import Registration from "../components/Registration";
// import Login from "../components/Login";
import CreateTask from "./modules/items/CreateTask";
import EditTask from "./modules/items/EditTask";
import ShowTask from "./modules/items/ShowTask";
import TasksList from "./modules/items/TasksList";
const name = "tasks";

export default [
  <Router>
    <Route
      exact
      // path={`/${name}`}
      path="/"
      render={() => <TasksList name={name} />}
    />
    <Route
      exact
      path={`/${name}/create`}
      render={() => <CreateTask name={name} />}
    />
    <Route
      exact
      path={`/${name}/:id/show`}
      render={() => <ShowTask name={name} />}
    />
    <Route
      exact
      path={`/${name}/:id/edit`}
      render={() => <EditTask name={name} />}
    />
    {/* <Route exact path={`/register`} render={() => <Registration />} />
    <Route exact path={"/signin"} render={() => <Login />} /> */}
  </Router>,
];
