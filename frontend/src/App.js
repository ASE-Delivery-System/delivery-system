import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './screens/Home'

function App() {
  return (
    <Router>
      {/* @TODO implement Header */}
      <main className='py-3'>
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
      </main>
      {/* @TODO implement Footer */}
    </Router>
  )
}

export default App
