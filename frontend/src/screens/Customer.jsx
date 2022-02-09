import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Container, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import station2 from '../images/station2.jpg'
import MyDeliveries from '../images/mydeliveries.jpg'
import TrackDelivery from '../images/trackdelivery.jpg'

const useStyles = makeStyles((theme) => ({
   root: {
     minHeight: '100vh',
     backgroundColor: `yellow`,
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
    width: '30vh',
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
    <CardMedia
      component="img"
      height="140"
      src={MyDeliveries}
    />
    <CardContent>
      <Typography variant="h5" gutterBottom>
        See active and past deliveries
      </Typography>
    </CardContent>
    <CardActions>
      <Link to='/customerdeliveries' color='inherit' className='button'>
        <Button size='small' variant='contained'>
          View deliveries
        </Button>
      </Link>
    </CardActions>
  </React.Fragment>
)

const cardPointTwo = (
  <React.Fragment>
     <CardMedia
       component="img"
       height="140"
       src={TrackDelivery}
     />
    <CardContent>
      <Typography variant="h5" gutterBottom>
        See where my deliveries are
      </Typography>
    </CardContent>
    <CardActions>
        <Link to='/trackdelivery' color='inherit' className='button'>
          <Button variant='contained' size='small'>
            Track deliveries
          </Button>
        </Link>
    </CardActions>
  </React.Fragment>
)

const Customer = () => {
  const classes = useStyles()
  const title = "Hi ";
  const description = "What do your want to do today?";
  let customerUsername = '';
  let customerId = '';
  let customerData = '';
  let isCustomer = false;

    try {
        customerData = JSON.parse(localStorage.getItem('user'));
        if(customerData!=null && customerData.roles.includes('ROLE_CUSTOMER')) {
            customerId = customerData.id;
            customerUsername = customerData.username;
            isCustomer = true;
            console.log("Current User:")
            console.log(customerData);
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
            <h1> {title} {customerUsername}</h1>
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <h2> {description} </h2>
        </div>
        <div>
        <Grid container spacing={5} style={{display: 'flex', justifyContent:'center',padding:1, alignItems:'center'}}>
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
        </Grid>
        </div>
      </Container>
    </Box>
  </div>
  )
}

export default Customer
