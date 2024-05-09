import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import * as React from 'react';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#b2dafa', // Color azul pastel diferente
});

const StyledTitle = styled(Typography)({
  flexGrow: 1,
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginLeft: '10px',
});

const MenuIcon = styled(RestaurantMenuIcon)({
  fontSize: '2rem',
  marginRight: '10px',
});

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
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
      <MenuItem onClick={handleMenuClose}>
        <PersonOutlineIcon sx={{ marginRight: 1 }} />
        Perfil
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <SettingsIcon sx={{ marginRight: 1 }} />
        Ajustes
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <LogoutIcon sx={{ marginRight: 1 }} />
        Cerrar Sesión
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <MenuIcon />
          <StyledTitle>Buen Sabor</StyledTitle>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      {renderMenu}
    </Box>
  );
}
