import { makeStyles } from '@mui/styles'
import { Paper, Button, TextField, RadioGroup, FormLabel, FormControl, FormControlLabel, Radio} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Container, Grid } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faChartLine, faUserLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function createData(username, email, firstname, lastname, address, password, rfidToken, role, actions) {
  return { username, email, firstname, lastname, address, password, rfidToken, role, actions };
}

const rows = [
  createData('Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test', 'Test'),
];


const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'center',
  },
  userManagementRoot: {
    margin: 'auto',
    height: '60vh',
    minHeight: '50vh',
    paddingTop: 10,
  },
  userManagementPaper: {
    width: '1000px',
    padding: theme.spacing(4),
  },

  userManagementRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&:last-child': {
      paddingBottom: theme.spacing(0),
    },
    '&:first-child': {
      paddingTop: theme.spacing(0),
    },
  },
  submitButtons: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    color: 'secondary',
    alignItems: 'center',
    width: 1,
  },
  submitButton: {
    width: 1,
    textAlign: 'center',
    color: 'secondary',
  },
}))

const EditUser = () => {
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rfidToken, setRfidToken] = useState('')
    const [role, setRole] = useState([])

    return (
      <div className={classes.container}>
        <h1>Edit User</h1>
        <h3>Please edit or delete the users information</h3>
        <div className={classes.userManagementRoot}>
          <Paper className={classes.userManagementPaper} component='form'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                      <TableRow>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">First name</TableCell>
                        <TableCell align="right">Last name</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Password</TableCell>
                        <TableCell align="right">RFID Token</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                          {row.name}
                          {row.name}
                      </TableCell>
                          <TableCell align="right">{row.username}</TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.firstname}</TableCell>
                          <TableCell align="right">{row.lastname}</TableCell>
                          <TableCell align="right">{row.address}</TableCell>
                          <TableCell align="right">{row.password}</TableCell>
                          <TableCell align="right">{row.rfidToken}</TableCell>
                          <TableCell align="right">{row.role}</TableCell>
                          <TableCell align="right">{row.actions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {(
            <div className='form-group'>
              <div className='alert alert-danger' role='alert'>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

export default EditUser

