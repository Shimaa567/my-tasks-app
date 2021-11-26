import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Notification, useTranslate, useLogin, useNotify } from "react-admin";
import { useMediaQuery, makeStyles } from "@material-ui/core";
import {
  Button,
  CircularProgress,
  IconButton,
  Checkbox,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthForms } from "./Auth";
import LoginDialog from "./LoginDialog";

interface Props {
  setCurrentShownForm: React.Dispatch<React.SetStateAction<AuthForms>>;
}
const Login: React.FC<Props> = ({ setCurrentShownForm }) => {
  const login = useLogin();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const translate = useTranslate();
  const notify = useNotify();
  const location = useLocation<{ nextPathname: string } | null>();

  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [passwordValues, setPasswordValues] = useState({
    password: "",
    showPassword: false,
  });

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const useStyles = makeStyles({
    login: {
      backgroundColor: "#FFFFFF",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      color: "#333333",
      height: "inherit",
    },

    container: {
      marginTop: "227px",
    },
    header: {
      fontSize: "32px",
      textAlign: "center",
      lineHeight: "55px",
      fontWeight: 900,
      margin: "auto",
      width: "340px",
    },
    form: {
      padding: "0 1em 1em 1em",
      marginTop: "20px",
    },
    input: {
      boxSizing: "border-box",
      width: "340px !important",
      display: "flex !important",
      margin: "auto !important",
      marginBottom: "1em !important",
      borderRadius: "35px !important",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      margin: "10px 0",
    },
    checkboxLabel: {
      alignSelf: "center",
    },
    button: {
      width: "145px !important",
      background: "#333333 !important",
      color: "#FFFFFF !important",
      height: "48px !important",
      borderRadius: "35px !important",
      marginTop: "15px  !important",
      top: "50% !important",
      left: "50% !important",
      transform: "translate(-50%, -50%) !important",
    },
  });

  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };

  const handleLogin = (event) => {
    setLoading(true);
    event.preventDefault();
    login(
      loginData,
      location.state ? location.state.nextPathname : "/",
      notify(`Welcome Back!`, "success")
    ).catch((error: Error) => {
      setLoading(false);
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
          ? "ra.auth.sign_in_error"
          : error.message,
        "warning",
        {
          _:
            typeof error === "string"
              ? error
              : error && error.message
              ? error.message
              : undefined,
        }
      );
    });
  };

  return (
    <div className={classes.login}>
      <>
        {isMobile ? (
          <LoginDialog setCurrentShownForm={setCurrentShownForm} />
        ) : (
          <div className={classes.container}>
            <p className={classes.header}>Login to your Account</p>
            <form className={classes.form} onSubmit={(e) => handleLogin(e)}>
              <OutlinedInput
                className={classes.input}
                type="text"
                placeholder="User Name or Email"
                fullWidth
                required
                id="username"
                // label={translate("ra.auth.username")}
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                disabled={loading}
              />

              <OutlinedInput
                id="outlined-adornment-password"
                className={classes.input}
                onChange={(e) => {
                  handleChange("password");
                  setLoginData({ ...loginData, password: e.target.value });
                }}
                type={passwordValues.showPassword ? "text" : "password"}
                fullWidth
                required
                // label={translate("ra.auth.password")}
                value={loginData.password}
                disabled={loading}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {passwordValues.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Password"
              />

              <div className={classes.actions}>
                <Checkbox sx={{ padding: "9px 0" }} />
                <span className={classes.checkboxLabel}>Remember me</span>
                <span
                  className={classes.checkboxLabel}
                  style={{ paddingLeft: "45px" }}
                >
                  Forget your password ?
                </span>
              </div>
              {loading && <CircularProgress size={50} thickness={3} />}

              <Button
                className={classes.button}
                variant="contained"
                type="submit"
                disabled={loading}
                fullWidth
              >
                <span style={{ color: "#FFFFFF" }}>
                  {/* {translate("ra.auth.sign_in")} */}
                  Login
                </span>
              </Button>

              <div style={{ textAlign: "center" }}>
                <span>
                  Don't have an account yet?&nbsp;
                  <Button
                    href="#text-button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentShownForm(AuthForms.SIGNUP);
                    }}
                  >
                    <span style={{ color: "#30AFF3" }}>Signup</span>
                  </Button>
                </span>
              </div>
            </form>
          </div>
        )}
      </>
      <Notification />
    </div>
  );
};

export default Login;
