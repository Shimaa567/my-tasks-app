import React, { useState } from "react";
import { AuthForms } from "./Auth";
import { useMediaQuery, makeStyles } from "@material-ui/core";
import {
  Button,
  CircularProgress,
  IconButton,
  Checkbox,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Notification, useTranslate, useNotify, fetchUtils } from "react-admin";
import { APIU } from "../ra/service";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RegisterDialog from "./RegisterDialog";

interface Props {
  setCurrentShownForm: React.Dispatch<React.SetStateAction<AuthForms>>;
}
const Registration: React.FC<Props> = ({ setCurrentShownForm }) => {
  const notify = useNotify();
  const translate = useTranslate();

  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordValues, setPasswordValues] = useState({
    password: "",
    showPassword: false,
  });

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const useStyles = makeStyles({
    register: {
      backgroundColor: "#FFFFFF",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      color: "#333333",
      height: "inherit",
      marginTop: "135px",
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
      width: "350px !important",
      display: "flex !important",
      margin: "auto !important",
      marginBottom: "1em !important",
      borderRadius: "35px !important",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      margin: "10px",
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
  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    });
  };

  const handleChange = (prop) => (event) => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value });
  };
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
      })
      .catch((error) => {
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
    <div className={classes.register}>
      <>
        {isMobile ? (
          <RegisterDialog setCurrentShownForm={setCurrentShownForm} />
        ) : (
          <div>
            <p className={classes.header}> Create New Account</p>
            <form
              className={classes.form}
              onSubmit={(e) => handleRegister(e)}
              noValidate
            >
              <OutlinedInput
                className={classes.input}
                type="text"
                placeholder="First Name"
                fullWidth
                required
                id="username"
                label={translate("ra.auth.username")}
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                disabled={loading}
              />
              <OutlinedInput
                className={classes.input}
                type="text"
                placeholder="Last Name"
                fullWidth
                required
                id="username"
                label={translate("ra.auth.username")}
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                disabled={loading}
              />

              <OutlinedInput
                className={classes.input}
                type="email"
                placeholder="Email"
                fullWidth
                required
                id="email"
                label={translate("ra.auth.email")}
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                disabled={loading}
              />
              <OutlinedInput
                id="outlined-adornment-password"
                className={classes.input}
                onChange={(e) => {
                  handleChange("password");
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  });
                }}
                type={passwordValues.showPassword ? "text" : "password"}
                fullWidth
                required
                label={translate("ra.auth.password")}
                value={registerData.password}
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
                <span className={classes.checkboxLabel}>
                  I agree to DataXlens{" "}
                  <a href="/" style={{ color: "#30AFF3" }}>
                    Privacy
                  </a>{" "}
                  and{" "}
                  <a href="/" style={{ color: "#30AFF3" }}>
                    terms of use
                  </a>{" "}
                </span>
              </div>
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {loading && <CircularProgress size={25} thickness={2} />}
                <span style={{ color: "#FFFFFF" }}>Sign Up</span>
              </Button>
              <div style={{ textAlign: "center" }}>
                <span>
                  Already Have an account ?&nbsp;
                  <Button
                    href="#text-button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentShownForm(AuthForms.LOGIN);
                    }}
                  >
                    <span style={{ color: "#30AFF3" }}>Login</span>
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

export default Registration;
