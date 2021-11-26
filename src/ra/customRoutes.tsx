/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { HashRouter, Route } from "react-router-dom";
import CreateTask from "./modules/items/CreateTask";
import EditTask from "./modules/items/EditTask";
import ShowTask from "./modules/items/ShowTask";
import TasksList from "./modules/items/TasksList";
const name = "tasks";

export default [
  <HashRouter>
    <Route exact path="/" render={() => <TasksList name={name} />} />
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
  </HashRouter>,
];
