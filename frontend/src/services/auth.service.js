import axios from 'axios'

const API_URL = 'https://ase-identity-service.herokuapp.com/api/auth/'

const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password,
  })
}

const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout,
}

export default authService
