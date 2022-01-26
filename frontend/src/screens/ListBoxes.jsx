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

const ListBoxes = () => {
    const classes = useStyles()

    const title = "List of your Boxes";
    const description = "See assigned boxes and change the status of assigned deliveries";

    const [loadingData, setLoadingData] = useState(true);
    const [BoxData, setBoxData] = useState([])

    const columns = [
        {title: "Box ID", field : "boxId", headerName: "Box ID", width:150},
        {title: "Box Address", field : "boxAddress", headerName: "Box Address", width:150},
        {title: "Box Name", field : "boxName", headerName: "Box Name", width:150},
    ]

    return (
      <div className={classes.container}>
        <h1> {title} </h1>
        <h3> {description} </h3>
        <div className={classes.boxManagementRoot}>
                   <Paper className={classes.boxManagementPaper} component='form'>
                      <ProjectTable rows={BoxData} title={title} description={description} columns={columns}/>
                  </Paper>
                </div>
              </div>
            )
          }

export default ListBoxes

