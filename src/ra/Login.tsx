import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { fetchUtils } from "react-admin";
import { theme } from "./theme";
import { APIU } from "./service";
import LoginImg from "./assets/images/login.svg";
import {
  Button,
  CircularProgress,
  TextField,
  IconButton,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Notification, useTranslate, useLogin, useNotify } from "react-admin";
import { Checkbox, InputAdornment, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FullScreenDialog from "../components/FullDialog";

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

  const isSmall = useMediaQuery((theme: any) =>
    theme.breakpoints.between("xs", "sm")
  );
  const isDesktop = useMediaQuery((theme: any) => theme.breakpoints.up("md"));

  const useStyles = makeStyles({
    login: {
      display: "flex",
      flexDirection: "column",
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
    loginHeadSm: {
      fontFamily: "Ubuntu",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "32px",
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
      backgroundColor: "#FFFFFF",
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
      padding: "1em 1em 1em 1em",
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
    ellipsisSm: {
      color: "#FFA600",
      display: "flex",
      justifyContent: "center",
      margin: "35px",
    },
    actionButtons: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "220px",
    },
    subBtn: {
      width: "145px",
      height: "48px",
      backgroundColor: "#13A4F1",
      borderRadius: "35px",
      color: "#FFFFFF",
      fontFamily: "Ubuntu",
      fontSize: "16px",
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
    <div style={{ height: "100%", backgroundColor: "#FFFFFF" }}>
      <div className={classes.login}>
        {isSmall && (
          <>
            <div>
              <img
                src={LoginImg}
                alt="loginImage"
                style={{ marginTop: "150px", width: "350px" }}
              />
              <p className={classes.loginHeadSm}>Lorem, ipsum dolor sit </p>
              <div className={classes.ellipsisSm}>
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
              <div className={classes.actionButtons}>
                <Button
                  className={classes.subBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    // setSignupDialog(true);
                    <FullScreenDialog />;
                  }}
                >
                  Sign Up
                </Button>

                <Button
                  className={classes.subBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    // setSignupDialog(false);
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          </>
        )}
        {isDesktop && !signupDialog && (
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
                <form
                  className={classes.form}
                  onSubmit={(e) => handleLogin(e)}
                  noValidate
                >
                  <TextField
                    variant="outlined"
                    className={classes.input}
                    type="text"
                    placeholder="User Name or Email"
                    style={{ marginBottom: "1em" }}
                    fullWidth
                    required
                    id="username"
                    label={translate("ra.auth.username")}
                    // label="Name or Email"
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
                    // id="password"
                    label={translate("ra.auth.password")}
                    //label="Password"
                    value={loginData.password}
                    disabled={loading}
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
                  <Button
                    className={classes.button}
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={loading}
                    fullWidth
                  >
                    {loading && <CircularProgress size={25} thickness={2} />}
                    {translate("ra.auth.sign_in")}
                  </Button>

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
        )}
      </div>

      <div className={classes.register}>
        {signupDialog && (
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
            <div className={classes.loginRect2} style={{ marginTop: "110px" }}>
              <div className={classes.loginLeftSide}>
                <p className={classes.loginHead2}>Create new Account</p>
                <form
                  className={classes.form}
                  onSubmit={(e) => handleRegister(e)}
                  noValidate
                >
                  <TextField
                    variant="outlined"
                    className={classes.input}
                    type="text"
                    placeholder="First Name"
                    style={{ marginBottom: "1em" }}
                    fullWidth
                    required
                    id="username"
                    //label={translate("ra.auth.username")}
                    label="First Name"
                    value={registerData.username}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        username: e.target.value,
                      })
                    }
                    disabled={loading}
                  />
                  <TextField
                    variant="outlined"
                    className={classes.input}
                    type="text"
                    placeholder="Last Name"
                    style={{ marginBottom: "1em" }}
                    fullWidth
                    required
                    id="username"
                    //label={translate("ra.auth.username")}
                    label="Last Name"
                    value={registerData.username}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        username: e.target.value,
                      })
                    }
                    disabled={loading}
                  />
                  {/* <div className={classes.input}> */}
                  <TextField
                    fullWidth
                    required
                    className={classes.input}
                    id="email"
                    label="Email"
                    variant="outlined"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                    style={{ marginBottom: "1em" }}
                    type="email"
                    disabled={loading}
                  />
                  {/* </div> */}
                  <OutlinedInput
                    // id="outlined-adornment-password"
                    className={classes.input}
                    type={passwordValues.showPassword ? "text" : "password"}
                    fullWidth
                    required
                    id="password"
                    label={translate("ra.auth.password")}
                    value={registerData.password}
                    onChange={(e) => {
                      handleChange("password");
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      });
                    }}
                    disabled={loading}
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
                    <span className={classes.checkboxLabel}>
                      I agree to DataXlens{" "}
                      <a
                        href="/"
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   setSignupDialog(false);
                        // }}
                      >
                        Privacy
                      </a>{" "}
                      and
                      <a
                        href="/"
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   setSignupDialog(false);
                        // }}
                      >
                        terms of use
                      </a>
                    </span>
                    {/* <span
                      className={classes.checkboxLabel}
                      style={{ paddingLeft: "45px" }}
                    >
                      Forget your password ?
                    </span> */}
                  </div>
                  <Button
                    className={classes.button}
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={loading}
                    fullWidth
                  >
                    {loading && <CircularProgress size={25} thickness={2} />}
                    {/* {translate("ra.auth.sign_in")} */}
                    Sing Up
                  </Button>

                  <div className={classes.registeration}>
                    <span>
                      You already have an account?&nbsp;
                      <a
                        href="/signup"
                        onClick={(e) => {
                          e.preventDefault();
                          setSignupDialog(false);
                        }}
                      >
                        Login
                      </a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Notification />
    </div>
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
