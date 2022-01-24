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
import DispatcherService from '../services/dispatcher.service'
import CustomerService from '../services/customer.service'
import DelivererService from '../services/deliverer.service'
import ProjectTable from "../components/ProjectTable";

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
    paddingTop: 10,
  },
  userManagementPaper: {
    width: '1000px',
    padding: theme.spacing(2),
  },

  userManagementRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
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
    const title = "List of your Users";
    const description = "Please edit or delete the users information";

    const [loadingData, setLoadingData] = useState(true);
    const [UserData, setUserData] = useState([])

    const columns = [
        {title: "Username", field : "username", headerName: "Username"},
        {title: "Password", field : "password", headerName: "Password"},
        {title: "Email", field : "email", headerName: "Email"},
        {title: "First Name", field : "firstName", headerName: "First Name"},
        {title: "Last Name", field : "lastName", headerName: "Last Name"},
        {title: "Address", field : "address", width: 100, headerName: "Address"},
        {title: "RFID Token", field : "rfidToken", headerName: "RFID Token"},
        {title: "Role", field : "roles", headerName: "Roles"},
    ]

   const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZWxsdW1iNyIsImlhdCI6MTY0Mjg3NTM2OCwiZXhwIjoxNjQyOTYxNzY4LCJSb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX0RJU1BBVENIRVIifV19.wVSyo7C2Sl_nyjORXrPBDb84Z4lQ6xDUq_l5xhbufNiD_OmZs-DPmhPpRXQQDSINGddOuePXM12Mu70qUXF2hw";
   useEffect(()=>{
     fetch('https://ase-delivery-service.herokuapp.com/boxes', {
     method: "GET",
      headers: {"Authorization": `Bearer ${token}`}
      }).then(response => response.json())
      .then(response => {
        console.log(response)
        setUserData(response)
        })
   },[]);

    return (
      <div className={classes.container}>
        <h1> {title} </h1>
        <h3> {description} </h3>
        <div className={classes.userManagementRoot}>
           <Paper className={classes.userManagementPaper} component='form'>
              <ProjectTable rows={UserData} title={title} description={description} columns={columns}/>
          </Paper>
        </div>
      </div>
    )
  }

export default EditUser

