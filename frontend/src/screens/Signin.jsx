import { makeStyles } from '@mui/styles';
import { Paper, Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, Redirect} from 'react-router-dom'
import { login } from '../slices/auth';


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

    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const { user: currentUser } = useSelector((state) => state.auth);

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email,password,'asdasd')
        dispatch(login({ email, password }))
    }

    useEffect(() => {
        if (isLoggedIn) {
            // @TODO: handle the redirection after login to specific user ROLE
            // if (isDispatcher) { navigate('/dispatcher')}
            // else if (isDeliverer) { navigate('/deliverer') }
            // else if (isCustomer) { navigate('/customer') }
        }
    }, [isLoggedIn]);

    return (
        <div className={classes.container}>
            <div className={classes.userLoginRoot}>
            <Paper className={classes.loginPaper} component="form">
                <div className={classes.loginRow}>
                    <TextField label="email" variant="outlined" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className={classes.loginRow}>
                    <TextField label="Password" variant="outlined" fullWidth value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
                </div>
                
                <div className={classes.loginRow + ' ' + classes.loginButtons}>
                    
                    <div>
                        <Button className={classes.loginButton} variant="contained" color="primary" onClick={handleSubmit} type="submit">
                            Login
                        </Button>
                    </div>
                </div>
            </Paper>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </div>
    </div>
      );
}

export default Signin
