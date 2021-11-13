import React from 'react'
import { Button, Container, Typography } from '@mui/material'

function Home() {
  return (
    <Container maxWidth='lg'>
      {/* just playing araound */}
      <Typography component='div' style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      <Button variant='contained' color='success'>
        Send
      </Button>
    </Container>
  )
}

export default Home
