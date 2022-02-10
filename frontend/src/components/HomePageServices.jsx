import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Container, Grid } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faChartLine, faUserLock } from '@fortawesome/free-solid-svg-icons'
import Smart from '../images/trackdelivery.jpg'
import Fast from '../images/fast.jpg'
import Reliable from '../images/reliable.jpg'

const useStyles = makeStyles((theme) => ({
  boxStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  cardStyle: {
    minHeight: '20vh',
    padding: 10,
  },
}))

const cardPointOne = (
  <React.Fragment>
     <CardMedia
       component="img"
       height="200"
       width= "auto"
       src={Smart}
     />
    <CardContent>
      <FontAwesomeIcon icon={faBrain} fontSize={40}/>
      <Typography variant="h5" gutterBottom>
        Smart
      </Typography>

      <Typography variant='h6'>Track any order online in real-time and check the status</Typography>
    </CardContent>
  </React.Fragment>
)


const cardPointTwo = (
  <React.Fragment>
     <CardMedia
       component="img"
       height="200"
       width= "auto"
       src={Fast}
     />
    <CardContent>
      <FontAwesomeIcon icon={faChartLine} fontSize={40}/>
      <Typography variant="h5" gutterBottom>
        Fast
      </Typography>

      <Typography variant='h6'>Pick up your deliveries without having to wait in line</Typography>
    </CardContent>
  </React.Fragment>
)

const cardPointThree = (
  <React.Fragment>
     <CardMedia
       component="img"
       height="200"
       width= "auto"
       src={Reliable}
     />
    <CardContent>
      <FontAwesomeIcon icon={faUserLock} fontSize={40}/>
      <Typography variant="h5" gutterBottom>
        Reliable
      </Typography>

      <Typography variant='h6'>Benefit from secure collection and authorization</Typography>
    </CardContent>
  </React.Fragment>
)

export default function HomePageServices() {
  const classes = useStyles()
  return (
    <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor='text.secondary' color='white' className={classes.boxStyle}>
      <Container maxWidth='lg'>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <h1>ASE Delivery System</h1>
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
  )
}
