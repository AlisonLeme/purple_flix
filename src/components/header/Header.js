import { useState } from 'react';
import Link from 'next/link'

import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import styles from './Header.module.css'

export default function MenuAppBar() {
  const [auth, setAuth] = useState(false);
  const [anchorTheme, setAnchorTheme] = useState(null);
  const [anchorLogin, setAnchorLogin] = useState(null);

  const handleMenuTheme = (event) => {
    setAnchorTheme(event.currentTarget);
  };

  const handleMenuLogin = (event) => {
    setAnchorLogin(event.currentTarget);
  };

  const handleCloseTheme = () => {
    setAnchorTheme(null);
  };

  const handleCloseLogin = () => {
    setAnchorLogin(null);
  };

  const handleLogin = () => {
    if(auth === true) {
      setAuth(false)
    } else {
      setAuth(true)
    }

    handleCloseLogin()
  }

  const handleTheme = () => {
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.toolBar}>
          <Link href="/" passHref>
            <IconButton color='inherit'>
              <Typography variant="h6" component="div">
                PurpleFlix
              </Typography>
            </IconButton>
          </Link>
          {
            auth === true
              ?
                <div className={styles.iconAccount}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenuLogin}
                    color="inherit"
                  >
                    <AccountCircle fontSize="large"/>
                  </IconButton>
                  <Typography>
                    Alison Leme
                  </Typography>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorLogin}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorLogin)}
                    onClose={handleCloseLogin}
                  >
                    <MenuItem>Perfil</MenuItem>
                    <MenuItem onClick={handleLogin}>Sair</MenuItem>
                  </Menu>
                </div>
              :
                <Button color="inherit" onClick={handleLogin}>Login</Button>
          }
           <div className={styles.iconTheme}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuTheme}
                color="inherit"
              >
                <DarkModeIcon fontSize="large"/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorTheme}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorTheme)}
                onClose={handleCloseTheme}
              >
                <MenuItem onClick={handleTheme}>Claro</MenuItem>
                <MenuItem onClick={handleTheme}>Escuro</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
