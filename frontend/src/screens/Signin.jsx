import { makeStyles } from '@mui/styles';
import { Paper, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { minHeight, width } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',        
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userLoginRoot: {
        margin: 'auto',
        height: '70vh',
        minHeight:'50vh',
        paddingTop:100

    },
    loginPaper: {
        width:'300px',
        padding: theme.spacing(4),
    },
    loginRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        '&:last-child': {
            paddingBottom: theme.spacing(0),
        },
        '&:first-child': {
            paddingTop: theme.spacing(0),
        },
    },
    loginButtons: {
        marginTop:20,
        display: 'flex',
        justifyContent: 'space-between',
        color: 'secondary',
        alignItems:'center',
        width: 1
    },
    loginButton: {
        width: 1,
        textAlign: 'center',
        color: 'secondary',
    },
}));

const Signin = () => {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //set to false when component is rendered for the first time in order to skip error message from previous login
    const [rendered, setRendered] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email,password,'asdasd')
    }

    return (
        <div className={classes.container}>
            <div className={classes.userLoginRoot}>
            <Paper className={classes.loginPaper} component="form">
                <div className={classes.loginRow}>
                    <TextField label="email" variant="outlined" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)} error={loginError !== ''} />
                </div>
                <div className={classes.loginRow}>
                    <TextField label="Password" variant="outlined" fullWidth value={password} onChange={(e)=>setPassword(e.target.value)} error={loginError !== ''} type="password" />
                </div>
                {loginError !== '' ? (
                    <div className={classes.loginRow}>
                        <Typography color="error">{loginError}</Typography>
                    </div>
                ) : null}
                <div className={classes.loginRow + ' ' + classes.loginButtons}>
                    
                    <div>
                        <Button className={classes.loginButton} variant="contained" color="primary" onClick={handleSubmit} type="submit">
                            Login
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    </div>
      );
}

export default Signin
