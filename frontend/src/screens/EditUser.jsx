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
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ProjectTable from "../components/ProjectTable";
import DispatcherService from '../services/dispatcher.service'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

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
    const [rows, setRows] = React.useState();
    const [selectedRows, setSelectedRows] = useState([])

    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
      }, []);

    const columns: GridColDef[] = [
        {title: "Username", field : "username", headerName: "Username", editable: true},
        // {title: "Password", field : "password", headerName: "Password"},
        {title: "Email", field : "email", headerName: "Email", editable: true},
        {title: "First Name", field : "firstName", headerName: "First Name", editable: true},
        {title: "Last Name", field : "lastName", headerName: "Last Name", editable: true},
        {title: "Address", field : "address", width: 100, headerName: "Address", editable: true},
        {title: "RFID Token", field : "rfidToken", headerName: "RFID Token", editable: true},
        {title: "Role", field : "roles", headerName: "Roles", editable: true},
        {
              field: "delete",
              width: 75,
              sortable: false,
              disableColumnMenu: true,
              renderHeader: () => {
                return (
                  <IconButton
                    onClick={() => {
                      const selectedIDs = new Set(selectedRows);
                      console.log(selectedIDs)
                      DispatcherService.deleteUsers(selectedIDs)
                      setUserData((r) => r.filter((x) => !selectedIDs.has(x.id)));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                );
              }
            }
    ]

   useEffect(()=>{
     DispatcherService.getUsers()
     .then((data) => {
        setUserData(data.data)
     })
     .catch((error) => {
        console.log(error)
     })
   }, [])
   console.log(UserData)

    return (
      <div className={classes.container}>
        <h1> {title} </h1>
        <h3> {description} </h3>
        <div className={classes.userManagementRoot}>
            <ButtonToolbar>
              <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                 Create
              </Button>{' '}
              <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'
              onClick={() => {
                DispatcherService.postUser(UserData)
              }}>
                 Edit
              </Button>{' '}
                <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                  Delete
                </Button>{' '}
                <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
                   Change Status
                </Button>
              </ButtonToolbar>
           <Paper className={classes.userManagementPaper} component='form'>
              <ProjectTable rows={UserData}
              title={title}
              description={description}
              onSelectionModelChange={(ids) => {
                        setSelectedRows(ids);
                      }}
              columns={columns}
              onEditRowsModelChange={handleEditRowsModelChange}
              editMode="row"
              editRowsModel={editRowsModel}/>
          </Paper>
        </div>
      </div>
    )
  }

export default EditUser

