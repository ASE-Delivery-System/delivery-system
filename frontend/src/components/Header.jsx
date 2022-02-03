import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MoreIcon from '@mui/icons-material/MoreVert'
import { Button, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../slices/auth'
import { useDispatch } from 'react-redux'

function Header() {
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const { user: currentUser } = useSelector((state) => state.auth)

  let isDispatcher = false
  let isDeliverer = false
  let isCustomer = false

  try {
    isDispatcher = currentUser.roles.includes('ROLE_DISPATCHER') && true
    isDeliverer = currentUser.roles.includes('ROLE_DELIVERER') && true
    isCustomer = currentUser.roles.includes('ROLE_CUSTOMER') && true
  } catch (error) {
    console.log(error)
  }

  const navigate = useNavigate()

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleDeliveryManagement = () => {
    navigate('/dispatcher')
    handleMenuClose()
  }

  const handleBoxStatusManagement = () => {
    navigate('/deliverer')
    handleMenuClose()
  }

  const handleMyDeliveries = () => {
    navigate('/customer')
    handleMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  // const handleSignUp = () => {
  //   console.log('Signup')
  // }

  const handleLogin = () => {
    navigate('/signin')
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isDispatcher ? (
        <MenuItem onClick={handleDeliveryManagement}>Delivery Management</MenuItem>
      ) : isDeliverer ? (
        <MenuItem onClick={handleBoxStatusManagement}>Box status management</MenuItem>
      ) : isCustomer ? (
        <MenuItem onClick={handleMyDeliveries}>My Deliveries</MenuItem>
      ) : (
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      )}
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  // Menu is causing an error
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {currentUser ? (
        <>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton size='large' aria-label='account of current user' aria-controls='primary-search-account-menu' aria-haspopup='true' color='inherit'>
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Button color='warning' variant='contained' edge='end' aria-label='account of current user' aria-controls={'logout-menu'} aria-haspopup='true'>
              Logout
            </Button>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleLogin}>
            <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true'>
              Login
            </Button>
          </MenuItem>
          {/* <MenuItem onClick={handleSignUp}>
            <Button color='info' variant='contained' edge='end' aria-label='account of current user' aria-controls={'signup-menu'} aria-haspopup='true'>
              SignUp
            </Button>
          </MenuItem> */}
        </>
      )}
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }} position={'sticky'} justifyContent={'space-between'}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' noWrap component='div' sx={{ display: { sm: 'block' } }}>
            <Link href='/' color='inherit' underline='none'>
              ASEDelivery-Test-Env
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          {currentUser ? (
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: 5 }}>
                <IconButton size='large' edge='end' aria-label='account of current user' aria-controls={menuId} aria-haspopup='true' onClick={handleProfileMenuOpen} color='inherit'>
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button color='warning' variant='contained' edge='end' aria-label='account of current user' aria-controls={'logout-menu'} aria-haspopup='true' onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: 5 }}>
                <Button color='secondary' variant='contained' edge='end' aria-label='account of current user' aria-controls={'login-menu'} aria-haspopup='true' onClick={handleLogin}>
                  Login
                </Button>
              </Box>
              {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button color='info' variant='contained' edge='end' aria-label='account of current user' aria-controls={'logout-menu'} aria-haspopup='true' onClick={handleSignUp}>
                  SignUp
                </Button>
              </Box> */}
            </>
          )}

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size='large' aria-label='show more' aria-controls={mobileMenuId} aria-haspopup='true' onClick={handleMobileMenuOpen} color='inherit'>
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}
export default Header
