import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { Admin, useLocale } from "react-admin";

import polyglotI18nProvider from "ra-i18n-polyglot";
import { ar, en } from "./locales";

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
import { MyLayout } from "./MyLayout";

const body = document.getElementsByTagName("body")[0];
const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === "ar") {
    body.setAttribute("dir", "rtl");
    localStorage.setItem("lang", "ar");
    return ar;
  } else {
    body.setAttribute("dir", "ltr");
    localStorage.setItem("lang", "en");
    return en;
  }
}, localStorage.getItem("lang") || "en");

const Dashboard: React.FC = () => {
  const locale = useLocale();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Admin
        theme={{ ...theme, direction: locale === "ar" ? "rtl" : "ltr" }}
        layout={MyLayout}
        dataProvider={dataProvider}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
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
