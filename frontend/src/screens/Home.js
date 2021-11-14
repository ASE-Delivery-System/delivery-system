import React from 'react'
import { Container, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import station from '../images/station.jpg' // Import using relative path
import HomePageServices from '../components/HomePageServices'

const useStyles = makeStyles((theme) => ({
  mainStyle: {
    position: 'relative',
    overflow: 'hidden',
  },
  containerHome: {
    // // height: '100vh',
    // background: 'black',
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
    <main className={classes.mainStyle}>
      <Paper variant='outlined' className={classes.imageStyle}>
        <img alt='logo' src={station} className={classes.imageStyle} />
      </Paper>
      <Container maxWidth='xl' className={classes.containerHome}>
        <HomePageServices />
      </Container>
    </main>
  )
}

export default Home
