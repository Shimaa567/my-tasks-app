import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { Admin } from "react-admin";
//import List from "@material-ui/icons/List";

import { theme, GlobalStyles } from "./theme";
import { dataProvider, authProvider } from "./service";

import { NotFound } from "./NotFound";
import Home from "./Home";
import TasksList from "./modules/items/TasksList";
import ShowTask from "./modules/items/ShowTask";
import EditTask from "./modules/items/EditTask";
import CreateTask from "./modules/items/CreateTask";
//import { Login } from "./Login";
// import Login from "../components/Login";
import Tasks from "./Tasks";
import customRoutes from "./customRoutes";
import Auth from "../components/Auth";

const Dashboard: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Admin
        theme={theme}
        dataProvider={dataProvider}
        authProvider={authProvider}
        catchAll={NotFound}
        loginPage={Auth}
        dashboard={Home}
        customRoutes={customRoutes}
        disableTelemetry
      >
        {/* <Resource
          name="tasks"
          list={TasksList}
          show={ShowTask}
          create={CreateTask}
          edit={EditTask}
          icon={List}
        /> */}
        <Tasks
          name="tasks"
          List={(props) => <TasksList name="tasks" {...props} />}
          Show={(props) => <ShowTask name="tasks" {...props} />}
          Create={(props) => <CreateTask name="tasks" {...props} />}
          Edit={(props) => <EditTask name="tasks" {...props} />}
        />
      </Admin>
    </ThemeProvider>
  );
};

export default Dashboard;

// <Tasks
// name="tasks"
// axiosInstance={axiosInstance}
// task={Tasks}
// List={TasksList}
// Show={ShowTask}
// Create={CreateTask}
// Edit={EditTask}
// />
