import * as React from 'react'
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
        Smart
      </Typography>

      <Typography variant='body2'>You can track any order online in real time and check the status</Typography>
    </CardContent>
    <CardActions>
      <Button size='small'>Learn More</Button>
    </CardActions>
  </React.Fragment>
)

const cardPointTwo = (
  <React.Fragment>
    <CardContent>
      <FontAwesomeIcon icon={faChartLine} />

      <Typography sx={{ fontSize: 20 }} color='text.secondary' gutterBottom>
        Fast
      </Typography>

      <Typography variant='body2'>Pick up your deliveries without having to wait in line.</Typography>
    </CardContent>
    <CardActions>
      <Button size='small'>Learn More</Button>
    </CardActions>
  </React.Fragment>
)

const cardPointThree = (
  <React.Fragment>
    <CardContent>
      <FontAwesomeIcon icon={faUserLock} />

      <Typography sx={{ fontSize: 20 }} color='text.secondary' gutterBottom>
        Reliable
      </Typography>

      <Typography variant='body2'>ASE Delivery provides secure collection and secure authorization</Typography>
    </CardContent>
    <CardActions>
      <Button size='small'>Learn More</Button>
    </CardActions>
  </React.Fragment>
)

export default function HomePageServices() {
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