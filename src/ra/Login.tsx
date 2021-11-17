import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { fetchUtils } from "react-admin";
import { theme } from "./theme";
import { APIU } from "./service";
import LoginImg from "./assets/images/login.svg";
import {
  Dialog,
  Button,
  Card,
  CardActions,
  CircularProgress,
  TextField,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Notification, useTranslate, useLogin, useNotify } from "react-admin";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [passwordValues, setPasswordValues] = useState({
    password: "",
    showPassword: false,
  });
  const [signupDialog, setSignupDialog] = useState(false);
  const translate = useTranslate();
  const notify = useNotify();
  const login = useLogin();
  const location = useLocation<{ nextPathname: string } | null>();
  const useStyles = makeStyles({
    login: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "flex-start",
      //background: "url(https://source.unsplash.com/Qh6yUFl7P5E/1600x900)",
      backgroundColor: "#FFFFFF",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    loginContainer: {
      position: "relative",
      width: "1440px",
      height: "1024px",
    },
    loginRect1: {
      position: "absolute",
      height: "800px",
    },
    loginRect2: {
      position: "absolute",
      marginLeft: "730px",
      marginTop: "200px",
    },
    loginRightSide: {
      width: "550px",
      left: "720px",
    },
    loginLeftSide: {
      width: "100%",
    },
    loginImg: {
      position: "absolute",
      width: "400px",
      height: "289.84px",
      left: "246px",
      top: "200px",
    },
    loginHead: {
      position: "absolute",
      width: "335px",
      height: "37px",
      left: "287px",
      top: "500px",
      fontFamily: "Ubuntu",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "32px",
      lineHeight: "37px",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      color: "#000000",
    },
    loginHead2: {
      position: "absolute",
      width: "490px",
      height: "37px",
      fontFamily: "Ubuntu",
      fontStyle: "normal",
      fontWeight: 900,
      fontSize: "32px",
      lineHeight: "37px",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      color: "#000000",
    },
    checkboxLabel: {
      height: "14px",
      fontFamily: "Ubuntu",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px !important",
      lineHeight: "14px",
      alignItems: "center",
      color: "#000000",
    },

    register: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    card: {
      minWidth: 300,
    },
    avatar: {
      margin: "1em",
      display: "flex",
      justifyContent: "center",
    },
    logo: {
      height: "56px",
    },
    hint: {
      marginTop: "1em",
      display: "flex",
      justifyContent: "center",
      color: theme.palette.grey[500],
    },
    form: {
      padding: "0 1em 1em 1em",
      position: "absolute",
      top: "100px",
    },
    input: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      boxSizing: "border-box",
      background: "#FFFFFF",
      width: "280px",
    },
    actions: {
      padding: "0 1em 1em 1em",
    },
    button: {
      width: "145px",
      background: "#333333",
      height: "48px",
      borderRadius: "35px",
      left: 0,
      top: 0,
      right: 0,
      color: "#FFFFFF",
      fontFamily: "Ubuntu",
      marginLeft: "55px",
    },
    registeration: {
      margin: "20px",
      color: "#333333",
      fontFamily: "Ubuntu",
      fontSize: "15px",
    },
    ellipsis: {
      position: "absolute",
      width: "16px",
      height: "16px",
      left: "380px",
      top: "560px",
      color: "#828282",
      display: "flex",
    },
  });
  const classes = useStyles();

  const handleRegister = (event) => {
    setLoading(true);
    event.preventDefault();
    let url = APIU + "/auth/local/register";
    let options = {
      headers: new Headers({ Accept: "application/json" }),
      method: "POST",
      body: JSON.stringify(registerData),
    };
    fetchUtils
      .fetchJson(url, options)
      .then(() => {
        notify(`Account Registered!`, "success");
        setLoading(false);
        setSignupDialog(false);
      })
      .catch((error) => {
        setLoading(false);
        setSignupDialog(false);
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

  const handleLogin = (event) => {
    setLoading(true);
    event.preventDefault();
    login(loginData, location.state ? location.state.nextPathname : "/").catch(
      (error: Error) => {
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
      }
    );
  };

  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };
  const handleChange = (prop) => (event) => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value });
  };
  return (
    <>
      <div className={classes.login}>
        <div className={classes.loginContainer}>
          <div className={classes.loginRect1}>
            <div className={classes.loginRightSide}>
              <img
                className={classes.loginImg}
                src={LoginImg}
                alt="loginImage"
              />
              <p className={classes.loginHead}>Lorem, ipsum dolor sit </p>
              <div className={classes.ellipsis}>
                <span>
                  <FiberManualRecordIcon />
                </span>
                <span>
                  <FiberManualRecordOutlinedIcon />
                </span>
                <span>
                  <FiberManualRecordOutlinedIcon />
                </span>
                <span>
                  <FiberManualRecordOutlinedIcon />
                </span>
              </div>
            </div>
          </div>
          <div className={classes.loginRect2}>
            <div className={classes.loginLeftSide}>
              <p className={classes.loginHead2}>Login to your Account</p>
              <form className={classes.form}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  className={classes.input}
                  type="text"
                  placeholder="User Name or Email"
                  style={{ marginBottom: "1em" }}
                />

                <OutlinedInput
                  id="outlined-adornment-password"
                  className={classes.input}
                  onChange={handleChange("password")}
                  type={passwordValues.showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
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

                <div style={{ margin: "10px 0" }}>
                  <Checkbox sx={{ padding: "9px 0" }} />
                  <span className={classes.checkboxLabel}>Remember me</span>
                  <span
                    className={classes.checkboxLabel}
                    style={{ paddingLeft: "45px" }}
                  >
                    Forget your password ?
                  </span>
                </div>
                <Button className={classes.button}>Login</Button>

                <div className={classes.registeration}>
                  <span>
                    Don't have an account yet?&nbsp;
                    <a
                      href="/signup"
                      onClick={(e) => {
                        e.preventDefault();
                        setSignupDialog(true);
                      }}
                    >
                      Sign Up
                    </a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </>
  );
};

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

// {!signupDialog && (
//   <Dialog open={true}>
//     <Card className={classes.card}>
//       <form onSubmit={(e) => handleLogin(e)} noValidate>
//         <div className={classes.avatar}>
//           <img
//             alt="LOGO"
//             src="/assets/icon/icon.png"
//             className={classes.logo}
//           />
//         </div>
//         <div className={classes.hint}>
//           Login or&nbsp;
//           <a
//             href="/signup"
//             onClick={(e) => {
//               e.preventDefault();
//               setSignupDialog(true);
//             }}
//           >
//             Signup
//           </a>
//         </div>
//         <div className={classes.form}>
//           <div className={classes.input}>
//             <TextField
//               fullWidth
//               required
//               id="username"
//               label={translate("ra.auth.username")}
//               value={loginData.username}
//               onChange={(e) =>
//                 setLoginData({ ...loginData, username: e.target.value })
//               }
//               disabled={loading}
//             />
//           </div>
//           <div className={classes.input}>
//             <TextField
//               fullWidth
//               required
//               id="password"
//               label={translate("ra.auth.password")}
//               value={loginData.password}
//               onChange={(e) =>
//                 setLoginData({ ...loginData, password: e.target.value })
//               }
//               type="password"
//               disabled={loading}
//             />
//           </div>
//         </div>
//         <CardActions className={classes.actions}>
//           <Button
//             variant="contained"
//             type="submit"
//             color="primary"
//             disabled={loading}
//             fullWidth
//           >
//             {loading && <CircularProgress size={25} thickness={2} />}
//             {translate("ra.auth.sign_in")}
//           </Button>
//         </CardActions>
//       </form>
//     </Card>
//   </Dialog>
// )}
// </div>
// <div className={classes.register}>
// {signupDialog && (
//   <Dialog open={true} onClose={() => setSignupDialog(false)}>
//     <div className={classes.avatar}>
//       <img
//         alt="LOGO"
//         src="/assets/icon/icon.png"
//         className={classes.logo}
//       />
//     </div>
//     <div className={classes.hint}>Register New Account</div>
//     <Card className={classes.card}>
//       <form onSubmit={(e) => handleRegister(e)}>
//         <div className={classes.form}>
//           <div className={classes.input}>
//             <TextField
//               fullWidth
//               required
//               id="username"
//               label="Username"
//               value={registerData.username}
//               onChange={(e) =>
//                 setRegisterData({
//                   ...registerData,
//                   username: e.target.value,
//                 })
//               }
//             />
//           </div>
//           <div className={classes.input}>
//             <TextField
//               fullWidth
//               required
//               id="email"
//               label="Email"
//               value={registerData.email}
//               onChange={(e) =>
//                 setRegisterData({
//                   ...registerData,
//                   email: e.target.value,
//                 })
//               }
//               type="email"
//             />
//           </div>
//           <div className={classes.input}>
//             <TextField
//               fullWidth
//               required
//               id="password"
//               label="Password"
//               value={registerData.password}
//               onChange={(e) =>
//                 setRegisterData({
//                   ...registerData,
//                   password: e.target.value,
//                 })
//               }
//               type="password"
//             />
//           </div>
//           <CardActions className={classes.actions}>
//             <Button
//               variant="contained"
//               type="submit"
//               color="secondary"
//               disabled={loading}
//               fullWidth
//             >
//               Submit
//               {loading && <CircularProgress size={25} thickness={2} />}
//             </Button>
//           </CardActions>
//         </div>
//       </form>
//     </Card>
//   </Dialog>
// )}
