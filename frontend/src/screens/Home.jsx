import React, { useEffect, useState } from 'react'
import { Container, CssBaseline, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import station from '../images/station.jpg' // Import using relative path
import HomePageServices from '../components/HomePageServices'
import UserService from "../services/user.service";

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
  // containerHome: {
  //   // // height: '100vh',
  //   // background: 'black',
  // },
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
  // const [content, setContent] = useState("");


  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

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
