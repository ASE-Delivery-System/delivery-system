import { Container, Box, Link, Grid } from '@mui/material'
import React from 'react'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  footerStyle:{
    boxSizing: 'border-box',
    marginBottom: '-100px',
    borderTop: '1px'
  },

  // box-sizing: border-box;
  // height: 100px;
  // background-color: #eee;
  // border-top: 1px solid #e0e0e0;
  // padding-top: 35px;
}))

function Footer() {

  const classes = useStyles()

  return (
    <footer className={classes.footerStyle}>
      <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor='text.secondary' color='white' className={classes.boxStyle}>
        <Container maxWidth='lg'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Box borderBottom={1}>Contact Us</Box>
              <Box>
                <Link href='https://www.linkedin.com/in/pellumb-baboci/' color='inherit'>
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
              </Box>
              <Box>
                <Link href='https://github.com/Pellumbengineer' color='inherit'>
                  <FontAwesomeIcon icon={faGithub} />
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link href='/signin' color='inherit'>
                  Login
                </Link>
              </Box>
              <Box>
                <Link href='/customer' color='inherit'>
                  Customer
                </Link>
              </Box>
              <Box>
                <Link href='/dispatcher' color='inherit'>
                                Dispatcher
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign='center' pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            ASE delivery system Team10 &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer
