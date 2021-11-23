import { Box, Grid, Button, makeStyles } from "@material-ui/core";
import React from "react";
import { AuthForms } from "./Auth";
interface Props {
  setCurrentShownForm: React.Dispatch<React.SetStateAction<AuthForms>>;
}
const SplashScreen: React.FC<Props> = ({ setCurrentShownForm }) => {
  const useStyle = makeStyles({
    container: {
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      left: "0px",
      bottom: "43px",
    },
    btn: {
      background: "#13A4F1",
      color: "#FFFFFF !important",
      width: "145px",
      height: "48px",
      borderRadius: "25px",
    },
  });

  const classes = useStyle();
  return (
    <Box>
      <Grid container spacing={10} className={classes.container}>
        <Grid item xs={5}>
          <Button
            href="#text-button"
            onClick={(e) => {
              e.preventDefault();
              setCurrentShownForm(AuthForms.LOGIN);
            }}
            className={classes.btn}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            href="#text-button"
            onClick={(e) => {
              e.preventDefault();
              setCurrentShownForm(AuthForms.SIGNUP);
            }}
            className={classes.btn}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SplashScreen;
