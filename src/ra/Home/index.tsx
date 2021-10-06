import * as React from 'react';
import { useState, useEffect } from 'react';
import { Title, useDataProvider } from 'react-admin';
import {
  Container,
  Grid,
  makeStyles,
  colors,
  CircularProgress
} from '@material-ui/core';
import FigureCard from './FigureCard';
import ListAlt from '@material-ui/icons/ListAlt';

const useStyles = makeStyles((theme) => ({
  avatarStyle: {
    backgroundColor: colors.common.white,
    color: colors.grey[900],
    height: 40,
    width: 40
  },
}));

const Home: React.FC = () => {
  const [tasksCount, setTasksCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const dataProvider = useDataProvider();
  useEffect(() => {
    dataProvider.getList('tasks', {
      pagination: {
        page: 1,
        perPage: 10
      },
      sort: {
        field: "_id",
        order: "ASC"
      },
      filter: {}
    })
      .then(({ total }) => {
        setLoading(false)
        setTasksCount(total)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();

  return (
    <Container>
      <Title title="sourcya.io" />
        <Grid
        container
        spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <FigureCard title="My Tasks" value={loading ?
              <CircularProgress
                size={25}
                thickness={2}
              />
            : tasksCount} avatarStyle={classes.avatarStyle} AvatarIcon={ListAlt}/>
          </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
