import React from "react";
import { useMediaQuery, makeStyles, Grid, Box } from "@material-ui/core";
import Login from "./Login";
import Registration from "./Registration";
import SplashScreen from "./SplashScreen";
import LoginImg from "../ra/assets/images/login.svg";

export enum AuthForms {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
  SPLASH = "SPLASH",
}
const Auth = () => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const [currentShownForm, setCurrentShownForm] = React.useState<AuthForms>(
    AuthForms.LOGIN
  );

  React.useEffect(() => {
    if (isMobile) setCurrentShownForm(AuthForms.SPLASH);
    else {
      setCurrentShownForm(AuthForms.LOGIN);
    }
  }, [isMobile]);

  const useStyles = makeStyles({
    loginHead: {
      fontSize: "32px",
      // textAlign: "center",
      lineHeight: "55px",
      fontWeight: 900,
      margin: "auto",
      width: "440px",
    },
  });
  const classes = useStyles();
  return (
    <Box>
      {/* common ui between LOGIN & REGISTER */}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={9} md={4} style={{ marginTop: "15%" }}>
          <img src={LoginImg} alt="loginImage" style={{ width: "375px" }} />
          <p className={classes.loginHead}>Lorem, ipsum dolor sit </p>
        </Grid>
        <Grid
          item
          xs={10}
          sm={9}
          md={5}
          justifyContent="center"
          alignItems="center"
        >
          {currentShownForm === AuthForms.LOGIN && (
            <Login setCurrentShownForm={setCurrentShownForm} />
          )}
          {currentShownForm === AuthForms.SIGNUP && (
            <Registration setCurrentShownForm={setCurrentShownForm} />
          )}
          {currentShownForm === AuthForms.SPLASH && (
            <SplashScreen setCurrentShownForm={setCurrentShownForm} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
