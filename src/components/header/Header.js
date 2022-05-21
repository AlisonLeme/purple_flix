import { useState } from "react";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import styles from "./Header.module.css";

export default function MenuAppBar() {
  const [anchorTheme, setAnchorTheme] = useState(null);
  const [anchorLogin, setAnchorLogin] = useState(null);
  const { data: session } = useSession();

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
    signOut({
      callbackUrl: "http://localhost:3000",
    });
  };

  const handleTheme = () => {};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={styles.toolBar}>
          <Link href="/" passHref>
            <IconButton color="inherit">
              <Typography variant="h6" component="div">
                PurpleFlix
              </Typography>
            </IconButton>
          </Link>
          {session ? (
            <div className={styles.iconAccount}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuLogin}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Typography>{session.user.name}</Typography>
              <Menu
                id="menu-appbar"
                anchorEl={anchorLogin}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorLogin)}
                onClose={handleCloseLogin}
              >
                <MenuItem>Perfil</MenuItem>
                <MenuItem onClick={handleLogin}>Sair</MenuItem>
              </Menu>
            </div>
          ) : null}
          <div className={styles.iconTheme}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuTheme}
              color="inherit"
            >
              <DarkModeIcon fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorTheme}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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
