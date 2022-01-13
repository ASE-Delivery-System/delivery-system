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


function createData(boxId, boxName, boxAddress) {
  return { boxId, boxName, boxAddress };
}

const rows = [
  createData('Test', 'Test', 'Test'),
];


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
    height: '60vh',
    minHeight: '50vh',
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

    const [boxId, setBoxId] = useState('')
    const [boxAddress, setBoxAddress] = useState('')
    const [boxName, setBoxName] = useState('')

    return (
      <div className={classes.container}>
        <h1>List of Boxes</h1>
        <h3>See assigned boxes and change the status of assigned deliveries</h3>
        <div className={classes.boxManagementRoot}>
          <Paper className={classes.boxManagementPaper} component='form'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                      <TableRow>
                        <TableCell align="right">Box ID</TableCell>
                        <TableCell align="right">Box Name</TableCell>
                        <TableCell align="right">Address</TableCell>
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
                          <TableCell align="right">{row.boxId}</TableCell>
                          <TableCell align="right">{row.boxName}</TableCell>
                          <TableCell align="right">{row.boxAddress}</TableCell>
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

export default ListBoxes

