import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { fetchUtils } from 'react-admin';
import { theme } from './theme';
import { makeStyles } from '@material-ui/core';
import { APIU } from './service';
import {
    Dialog,
    Button,
    Card,
    CardActions,
    CircularProgress,
    TextField,
} from '@material-ui/core';
import { Notification, useTranslate, useLogin, useNotify } from 'react-admin';

export const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [registerData, setRegisterData] = useState({ username:'', email: '', password: '' });
    const [loginData, setLoginData] = useState({ username:'', password: '' });
    const [signupDialog, setSignupDialog] = useState(false);
    const translate = useTranslate();
    const notify = useNotify();
    const login = useLogin();
    const location = useLocation<{ nextPathname: string } | null>();
    const useStyles = makeStyles({
        login: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: 'url(https://source.unsplash.com/Qh6yUFl7P5E/1600x900)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
        register: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        card: {
          minWidth: 300,
        },
        avatar: {
          margin: '1em',
          display: 'flex',
          justifyContent: 'center',
        },
        logo: {
            height: "56px"
        },
        hint: {
            marginTop: '1em',
            display: 'flex',
            justifyContent: 'center',
            color: theme.palette.grey[500],
        },
        form: {
            padding: '0 1em 1em 1em',
        },
        input: {
            marginBottom: '1em',
        },
        actions: {
            padding: '0 1em 1em 1em',
        }
    });
    const classes = useStyles();

    const handleRegister = (event) => {
        setLoading(true);
        event.preventDefault();
        let url = APIU + '/auth/local/register';
        let options = {
            headers: new Headers({ Accept: 'application/json' }),
            method: 'POST',
            body: JSON.stringify(registerData)
        };
        fetchUtils.fetchJson(url, options)
            .then( () => {
                notify(`Account Registered!`, 'success');
                setLoading(false)
                setSignupDialog(false)
            })
            .catch( (error) => {
                setLoading(false)
                setSignupDialog(false)
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                    'warning',
                    {
                        _:
                            typeof error === 'string'
                                ? error
                                : error && error.message
                                ? error.message
                                : undefined,
                    }
                )
            });
    }

    const handleLogin = (event) => {
        setLoading(true);
        event.preventDefault();
        login(loginData, location.state ? location.state.nextPathname : '/').catch(
            (error: Error) => {
                setLoading(false);
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                    'warning',
                    {
                        _:
                            typeof error === 'string'
                                ? error
                                : error && error.message
                                ? error.message
                                : undefined,
                    }
                );
            }
        );
    };
    return (
        <>
            <div className={classes.login}>
                {!signupDialog && (
                    <Dialog
                        open={true}
                    >
                        <Card className={classes.card}>
                            <form onSubmit={(e) => handleLogin(e)} noValidate>
                                <div className={classes.avatar}>
                                    <img alt="LOGO" src="/assets/icon/icon.png" className={classes.logo} />
                                </div>
                                <div className={classes.hint}>
                                    Login or&nbsp;<a href="/signup" onClick={(e) => { e.preventDefault(); setSignupDialog(true)}}>Signup</a>
                                </div>
                                <div className={classes.form}>
                                    <div className={classes.input}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="username"
                                            label={translate('ra.auth.username')}
                                            value={loginData.username}
                                            onChange={(e) => setLoginData({...loginData, username: e.target.value })}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className={classes.input}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="password"
                                            label={translate('ra.auth.password')}
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({...loginData, password: e.target.value })}
                                            type="password"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                                <CardActions className={classes.actions}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        disabled={loading}
                                        fullWidth
                                    >
                                        {loading && (
                                            <CircularProgress
                                                size={25}
                                                thickness={2}
                                            />
                                        )}
                                        {translate('ra.auth.sign_in')}
                                    </Button>
                                </CardActions>
                            </form>
                        </Card>
                    </Dialog>
                )}
            </div>
            <div className={classes.register}>
            {signupDialog && (
                <Dialog
                    open={true}
                    onClose={() => setSignupDialog(false)}
                >
                    <div className={classes.avatar}>
                        <img alt="LOGO" src="/assets/icon/icon.png" className={classes.logo} />
                    </div>
                    <div className={classes.hint}>
                        Register New Account
                    </div>                    
                    <Card className={classes.card}>
                        <form onSubmit={(e) => handleRegister(e)}>
                            <div className={classes.form}>
                                <div className={classes.input}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="username"
                                        label="Username"
                                        value={registerData.username}
                                        onChange={(e) => setRegisterData({...registerData, username: e.target.value })}
                                    />
                                </div>
                                <div className={classes.input}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="email"
                                        label="Email"
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({...registerData, email: e.target.value })}
                                        type="email"
                                    />
                                </div>
                                <div className={classes.input}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="password"
                                        label="Password"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({...registerData, password: e.target.value })}
                                        type="password"
                                    />
                                </div>
                                <CardActions className={classes.actions}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="secondary"
                                        disabled={loading}
                                        fullWidth
                                    >Submit
                                        {loading && (
                                            <CircularProgress
                                                size={25}
                                                thickness={2}
                                            />
                                        )}
                                    </Button>
                                </CardActions>
                            </div>
                        </form>
                    </Card>
                </Dialog>
                )}
            </div>
            <Notification />
        </>
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};