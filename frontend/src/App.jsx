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
import ListUser from './screens/ListUsers'
import CreateNewDelivery from './screens/CreateNewDelivery'
import ListBoxes from './screens/ListBoxes'
import ListDeliveries from './screens/ListDeliveries'
import CreateNewBoxes from './screens/CreateNewBoxes'
import { CustomerRoute, DelivererRoute, DispatcherRoute } from './protected_routes/ProtectedRoutes'
import TrackDelivery from "./screens/TrackDelivery";
import CustomerDeliveries from "./screens/CustomerDeliveries";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route exact path='/dispatcher' element={<DispatcherRoute />}>
            <Route exact path='/dispatcher' element={<Dispatcher />} />
          </Route>
          <Route exact path='/deliverer' element={<DelivererRoute />}>
            <Route exact path='/deliverer' element={<Deliverer />} />
          </Route>
          <Route exact path='/customer' element={<CustomerRoute />}>
            <Route exact path='/customer' element={<Customer />} />
          </Route>
          <Route path='/createnewuser' element={<CreateNewUser />} />
          <Route path='/listusers' element={<ListUser />} />
          <Route path='/createnewdelivery' element={<CreateNewDelivery />} />
          <Route path='/listboxes' element={<ListBoxes />} />
          <Route path='/createnewboxes' element={<CreateNewBoxes />} />
          <Route path='/listdeliveries' element={<ListDeliveries />} />
          <Route path='/trackdelivery' element={<TrackDelivery/>} />
          <Route path='/customerdeliveries' element={<CustomerDeliveries/>} />
        </Routes>{' '}
      </main>
      <Footer />
    </Router>
  )
}

export default App
