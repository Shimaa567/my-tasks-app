import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { Admin, Resource } from 'react-admin';
import List from '@material-ui/icons/List';

import { theme, GlobalStyles } from './theme';
import { dataProvider, authProvider } from './service';

import { NotFound } from './NotFound';
import Home from './Home'
import { TasksList } from './modules/tasks/TasksList';
import { ShowTask } from './modules/tasks/ShowTask';
import { EditTask } from './modules/tasks/EditTask';
import { CreateTask } from './modules/tasks/CreateTask';
import { Login }  from './Login';

const Dashboard: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Admin
        theme={theme}
        dataProvider={dataProvider}
        authProvider={authProvider}
        catchAll={NotFound}
        loginPage={Login}
        dashboard={Home}
        disableTelemetry >
        <Resource
          name="tasks"
          list={TasksList}
          show={ShowTask}
          create={CreateTask}
          edit={EditTask}
          icon={List}
        />
      </Admin>
    </ThemeProvider>
  );
};

export default Dashboard;
