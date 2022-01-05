import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8083/user/auth/'

const getDispatcherView = () => {
  return axios.get(API_URL + 'dispatcher', { headers: authHeader() })
}

const registerNewUser = async (user) => {
  return await axios.post(API_URL + 'register', user,  { headers: authHeader() })
}

const DispatcherService = {
  getDispatcherView,
  registerNewUser
}

export default DispatcherService
