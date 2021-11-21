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
import { authStore } from '../store/authStore'

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const auth = authStore.getState()
  console.log(auth)

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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    console.log('Logout')
  }

  const handleSignUp = () => {
    console.log('Signup')
  }

  const handleLogin = () => {
    console.log('Login')
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
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
      {auth.user ? (
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
          <MenuItem onClick={handleSignUp}>
            <Button color='info' variant='contained' edge='end' aria-label='account of current user' aria-controls={'signup-menu'} aria-haspopup='true'>
              SignUp
            </Button>
          </MenuItem>
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
              ASEDelivery
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          {auth.user ? (
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
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button color='info' variant='contained' edge='end' aria-label='account of current user' aria-controls={'logout-menu'} aria-haspopup='true' onClick={handleSignUp}>
                  SignUp
                </Button>
              </Box>
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
