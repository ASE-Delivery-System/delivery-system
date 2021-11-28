import React from 'react'
import { makeStyles } from '@mui/styles'
import station from '../images/station.jpg' // Import using relative path
import HomePageServices from '../components/HomePageServices'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${station})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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
  },
}))

function Home() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {/* <Paper variant='outlined'>
        <img alt='logo' src={station} className={classes.imageStyle} />
      </Paper> */}
      {/*  <Container maxWidth='xl' className={classes.containerHome}> */}
      <HomePageServices />
      {/* </Container> */}
    </div>
  )
}

export default Home
