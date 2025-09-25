"use client";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import { Drawer, List, ListItem, ListItemText, Button ,TextField , InputAdornment} from '@mui/material';
import { MdAddShoppingCart } from "react-icons/md";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import StoreIcon from '@mui/icons-material/Store';
import SettingsIcon from '@mui/icons-material/Settings';
import Image from '@mui/icons-material/Image';
// import Lottie from "lottie-react";
// import groceryAnim from "../public/animations/grocery.json";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Link from 'next/link';
import AddCart from "@/app/hook/AddCart";
import ProductMenu from './ProductMenu';
import ShopCart from '@/app/hook/AddCart';
import styles from '../../components/styles/navbar.module.css';
// import { useRouter } from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function TopNavbar() {
  // const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
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
      
      <MenuItem>
        <IconButton
          size="large"
          color="success"
        >
          <ShopCart count={1} />
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const list = () => (
  <Box
    justifyContent="center"
    alignItems="center"
    sx={{ width: 230 }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <List>
      <Link href="/" passHref style={{ textDecoration: 'none' }}>
        <ListItem disablePadding>
          <ListItemButton selected={pathname === '/'}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/products" passHref style={{ textDecoration: 'none' }}>
        <ListItem disablePadding>
          <ListItemButton selected={pathname === '/products'}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/about" passHref style={{ textDecoration: 'none' }}>
        <ListItem disablePadding>
          <ListItemButton selected={pathname === '/about'}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link href="/contact" passHref style={{ textDecoration: 'none' }}>
        <ListItem disablePadding>
          <ListItemButton selected={pathname === '/contact'}>
            <ListItemIcon>
              <ContactPageIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  </Box>
);

  return (
    <Box sx={{ flexGrow: 1 }} className="app-top-bar"> 
      <AppBar position="fixed" className={styles['app-bar']} overflow="hidden">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }} 
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
            {/* <Box sx={{ width: 50, height: 50, mr: 2 }}>
            <Lottie animationData={groceryAnim} loop={true} />
            </Box> */}  
          <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
            animation: "spin 3s linear infinite",
          }}
        >
          {/* <Image src="/icons/grocery-cart.png" alt="Grocery" style={{ width: 40, height: 40 }} /> */}
          <ShoppingBasketIcon fontSize="large" color="white" />
        </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            FreshMart 
          </Typography>
          
          {/* <Box>
          <TextField
            variant="outlined"
            placeholder="Search…"
            size="small"
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              width: { xs: '100%', sm: '300px' },
              display: { xs: 'none', sm: 'block' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: '#259525' }}/>
                </InputAdornment>
              ),
            }}
          />
          </Box> */}
          <Box sx={{ flexGrow: 1 }} />
          <Search className={styles['search-bar']} sx={{ display: { xs: 'none', sm: 'block' }}} justifyContent="center"> 
            <SearchIconWrapper>
              <SearchIcon sx={{ color: '#259525' }}/>
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ color: 'black' }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {/* Main navigation buttons for larger screens */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }} gap={2} className={styles.navList}>
            <Link href="/" >
              <Button variant="text" sx={{ color: 'white' }} className={pathname === '/' ? styles.activeLink : ''}>Home</Button>
            </Link>
            <ProductMenu />
            <Link href="/about" >
              <Button variant="text" sx={{ color: 'white' }} className={pathname === '/about' ? styles.activeLink : ''}>About</Button>
            </Link>
            <Link href="/contact" >
              <Button variant="text" sx={{ color: 'white' }} className={pathname === '/contact' ? styles.activeLink : ''}>Contact</Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton>
              <ShopCart count={1} />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"  
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={styles['text-logo']}>
              FreshMart
            </Typography>
          </Toolbar>
          <Divider sx={{mt: 1.5}}/>
        {list()}
      </Drawer>
    </Box>
  );
}