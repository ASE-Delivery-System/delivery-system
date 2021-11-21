import { Container, Box, Link, Grid } from '@mui/material'
import React from 'react'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
  return (
    <footer>
      <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} bgcolor='text.secondary' color='white'>
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
                <Link href='/' color='inherit'>
                  Login
                </Link>
              </Box>
              <Box>
                <Link href='/' color='inherit'>
                  SignUp
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
