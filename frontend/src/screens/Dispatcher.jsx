import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Container, Grid } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faChartLine, faUserLock } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import station2 from '../images/station2.jpg'

const useStyles = makeStyles((theme) => ({
   root: {
     minHeight: '100vh',
     backgroundImage: `url(${station2})`,
     backgroundSize: 'cover',
     backgroundPosition: 'center',
     backgroundRepeat: 'no-repeat',
   },
  boxStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  cardStyle: {
    height: '30vh',
    padding: 10,
  },
  mainStyle: {
    position: 'relative',
    overflow: 'hidden',
  },
  imageStyle: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: `calc(100vw + 48px)`,
    opacity: '0.7',
    position: 'absolute',
    background: 'black',
    zIndex: '-1',
  }
}))

const cardPointOne = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>
    </CardContent>
    <CardActions>
      <Link to='/listusers' color='inherit' className='button'>
        <Button size='small' variant='contained'>
          Manage Users
        </Button>
      </Link>
    </CardActions>
    <CardActions>
      <Link to='/createnewuser' color='inherit' className='button'>
        <Button size='small' variant='contained'>
          Create New Users
        </Button>
      </Link>
    </CardActions>
  </React.Fragment>
)

const cardPointTwo = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Delivery Management
      </Typography>
    </CardContent>
    <CardActions>
        <Link to='/listdeliveries' color='inherit' className='button'>
          <Button variant='contained' size='small'>
            Manage Deliveries
          </Button>
        </Link>
    </CardActions>
    <CardActions>
      <Link to='/createnewdelivery' color='inherit' className='button'>
        <Button size='small' variant='contained'>
          Create New Deliveries
        </Button>
      </Link>
    </CardActions>
  </React.Fragment>
)

const cardPointThree = (
  <React.Fragment>
    <CardContent >
      <Typography variant="h5" gutterBottom>
        Box management
      </Typography>
    </CardContent>
      <CardActions>
          <Link to='/listboxes' color='inherit' className='button'>
            <Button size='small' variant='contained'>
              Manage Boxes
            </Button>
          </Link>
      </CardActions>
      <CardActions>
       <Link to='/createnewboxes' color='inherit' className='button'>
         <Button size='small' variant='contained'>
           Create New Boxes
         </Button>
       </Link>
      </CardActions>
  </React.Fragment>
)

const Dispatcher = () => {
  const classes = useStyles()
  const title = "Hi ";
  const description = "What do your want to do today?";
  let dispatcherUsername = '';
  let dispatcherId = '';
  let dispatcherData = '';
  let isDispatcher = false;

    try {
        dispatcherData = JSON.parse(localStorage.getItem('user'));
        if(dispatcherData!=null && dispatcherData.roles.includes('ROLE_DISPATCHER')) {
            dispatcherId = dispatcherData.id;
            dispatcherUsername = dispatcherData.username;
            isDispatcher = true;
            console.log("Current User:")
            console.log(dispatcherData);
        }
    }
    catch (e) {
        console.error(e)
      }
  return (
    <div className={classes.container}>
    <img alt='logo' src={station2} className={classes.imageStyle} />
    <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor='text.secondary' color='white' className={classes.boxStyle}>
      <Container maxWidth='lg'>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <h1> {title} {dispatcherUsername}</h1>
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <h2> {description} </h2>
        </div>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Card variant='outlined' className={classes.cardStyle}>
              {cardPointOne}
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant='outlined' className={classes.cardStyle}>
              {cardPointTwo}
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant='outlined' className={classes.cardStyle}>
              {cardPointThree}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </div>
  )
}

export default Dispatcher
