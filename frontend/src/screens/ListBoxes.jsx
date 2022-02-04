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
import ProjectTable from "../components/ProjectTable";
import DispatcherService from '../services/dispatcher.service'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'center',
  },
  boxManagementRoot: {
    margin: 'auto',
    paddingTop: 10,
  },
  boxManagementPaper: {
    width: '1000px',
    padding: theme.spacing(4),
  },

  boxManagementRow: {
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



function TableItem(data) {
    var newrows = [];
    data.map( (item) => {
            var itemInfo = { "id": item.id,
                "name": item.name,
                "status": item.status,
                "address": item.address,
                };
            newrows.push(itemInfo)});
    return newrows;
}


const ListBoxes = () => {
    const classes = useStyles()

    const title = "List of your Boxes";
    const description = "See assigned boxes and change the status of assigned deliveries";

    const [loadingData, setLoadingData] = useState(true);
    const [BoxData, setBoxData] = useState([])

    const columns = [
        {title: "Box ID", field : "id", headerName: "Box ID", width:150},
        {title: "Box Status", field : "status", headerName: "Box Status", width:150},
        {title: "Box Address", field : "address", headerName: "Box Address", width:150},
        {title: "Box Name", field : "name", headerName: "Box Name", width:150},
    ]

     // get the users data
       useEffect(()=>{
         DispatcherService.getBoxes()
         .then((data) => {
            setBoxData(data.data)
         })
         .catch((error) => {
            console.log(error)
         })
       }, [])
       console.log(BoxData)

    return (
      <div className={classes.container}>
        <h1> {title} </h1>
        <h3> {description} </h3>
        <div className={classes.boxManagementRoot}>
                    <ButtonToolbar>
                      <Link to='/createnewboxes' color='inherit' className='button'>
                        <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                            Create
                         </Button>{' '}
                      </Link>
                      <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'
                       type='submit'>
                         Edit
                      </Button>{' '}
                      <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'
                         type='submit'>
                         Delete
                     </Button>{' '}
                     </ButtonToolbar>
                   <Paper className={classes.boxManagementPaper} component='form'>
                      <ProjectTable rows={TableItem(BoxData)} title={title} description={description} columns={columns}/>
                  </Paper>
                </div>
              </div>
            )
          }

export default ListBoxes

