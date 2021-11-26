import { Container, Typography } from '@mui/material'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './screens/Home'
import Signin from './screens/Signin'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
