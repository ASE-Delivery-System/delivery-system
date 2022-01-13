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

const useStyles = makeStyles((theme) => ({
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
}))


const cardPointOne = (
  <React.Fragment>
    <CardContent>
      <FontAwesomeIcon icon={faBrain} />
      <Typography sx={{ fontSize: 20 }} color='text.secondary' gutterBottom>
        User Management
      </Typography>
    </CardContent>
    <CardActions>
      <Link to='/edituser' color='inherit' className='button'>
        <Button size='small' variant='contained'>
          Edit users
        </Button>
      </Link>
    </CardActions>
    <CardActions>
      <Link to='/createnewuser' color='inherit' className='button'>
        <Button size='small' variant='contained'>
          Create new users
        </Button>
      </Link>
    </CardActions>
  </React.Fragment>
)

const cardPointTwo = (
  <React.Fragment>
    <CardContent>
      <FontAwesomeIcon icon={faChartLine} />

      <Typography sx={{ fontSize: 20 }} color='text.secondary' gutterBottom>
        Delivery Management
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant='contained' size='small'>
        Edit deliveries
      </Button>
    </CardActions>
    <CardActions>
      <Link to='/createnewdelivery' color='inherit' className='button'>
        <Button size='small' variant='contained'>
            Create new deliveries
        </Button>
      </Link>
    </CardActions>
  </React.Fragment>
)

const cardPointThree = (
  <React.Fragment>
    <CardContent>
      <FontAwesomeIcon icon={faUserLock} />

      <Typography sx={{ fontSize: 20 }} color='text.secondary' gutterBottom>
        Box management
      </Typography>
    </CardContent>
    <CardActions>
      <Link to='/listboxes' color='inherit' className='button'>
        <Button size='small' variant='contained'>
          List boxes
        </Button>
      </Link>
    </CardActions>

  </React.Fragment>
)

const Dispatcher = () => {
  const classes = useStyles()
  return (

    <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor='text.secondary' color='white' className={classes.boxStyle}>
      <Container maxWidth='lg'>
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
  )
}

export default Dispatcher
