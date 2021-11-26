import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { Admin } from "react-admin";
//import i18nProvider from "./i18nProvider";

import { theme, GlobalStyles } from "./theme";
import { dataProvider, authProvider } from "./service";

import { NotFound } from "./NotFound";
import Home from "./Home";
import TasksList from "./modules/items/TasksList";
import ShowTask from "./modules/items/ShowTask";
import EditTask from "./modules/items/EditTask";
import CreateTask from "./modules/items/CreateTask";

import Tasks from "./Tasks";
import customRoutes from "./customRoutes";
import Auth from "../components/Auth";

// const messages = {

// }
// const i18nProvider = locale => messages[locale];
const Dashboard: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Admin
        theme={theme}
        dataProvider={dataProvider}
        authProvider={authProvider}
        //i18nProvider={i18nProvider}
        catchAll={NotFound}
        loginPage={Auth}
        dashboard={Home}
        customRoutes={customRoutes}
        disableTelemetry
      >
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
