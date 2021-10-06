import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';

const FigureCard: React.FC<{title: any, value: any, avatarStyle: any, AvatarIcon: any}> = ({ title, value, avatarStyle, AvatarIcon,  ...rest }) => {
  return (
    <Card
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              {title}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={avatarStyle}>
              <AvatarIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

FigureCard.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  avatarStyle: PropTypes.object,
  AvatarIcon: PropTypes.object

};

export default FigureCard;
