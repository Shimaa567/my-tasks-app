import React from "react";
import { useMediaQuery, Grid, Box } from "@material-ui/core";
import Login from "./Login";
import Registration from "./Registration";
import SplashScreen from "./SplashScreen";
import LoginImg from "../ra/assets/images/login.svg";
import ImagesCarousel from "./Carousel";

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

  let items = [
    {
      img: LoginImg,
      title: "Lorem ipsum dolor sit amet.",
    },
    {
      img: LoginImg,
      title: "Lorem  dolor sit ipsum amet.",
    },
<<<<<<< HEAD
    {
      img: LoginImg,
      title: "Lorem  dolor sit amet ipsum.",
=======
  });
  const classes = useStyles();
  let items = [
    {
      img: LoginImg,
      title: "Lorem ipsum dolor sit amet.",
    },
    {
      img: LoginImg,
      title: "Lorem  dolor sit ipsum amet.",
>>>>>>> cd4820f77f47a9d840896540f3056d8f6388583c
    },
    {
      img: LoginImg,
      title: "Lorem  dolor sit amet ipsum.",
    },
  ];
  return (
    <Box>
      {/* common ui between LOGIN & REGISTER */}
      <Grid
        container
        spacing={2}
        xs={12}
        md={12}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={4} style={{ marginTop: "15%" }}>
          {isMobile ? (
            <div style={{ transform: "translate(0%, 5%)" }}>
              <ImagesCarousel items={items} />
            </div>
          ) : (
            <>
<<<<<<< HEAD
=======
              {/* <img src={LoginImg} className={classes.img} alt="loginImage" />
              <p className={classes.header}>Lorem, ipsum dolor sit </p> */}
>>>>>>> cd4820f77f47a9d840896540f3056d8f6388583c
              <ImagesCarousel items={items} />
            </>
          )}
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
