import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Customer from './screens/Customer'
import Deliverer from './screens/Deliverer'
import Dispatcher from './screens/Dispatcher'
import Home from './screens/Home'
import Signin from './screens/Signin'
import CreateNewUser from './screens/CreateNewUser'
import EditUser from './screens/EditUser'


function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dispatcher' element={<Dispatcher />} />
          <Route path='/deliverer' element={<Deliverer />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/createnewuser' element={<CreateNewUser />} />
          <Route path='/edituser' element={<EditUser />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
