import React from 'react';
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbr";
import Footer from './footer/page';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/material';

function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const sidebarWidth = '250px';
  const sidebarHiddenOnMobile = { display: isMobile ? 'none' : 'block' };

  return (
  <Box sx={{ 
      display: 'flex', 
      bgcolor: '#f0f2f5', 
      minHeight: '100vh', 
      width: '100%',
      // Change to column to stack TopNavbar, children, and Footer
      flexDirection: 'column'
    }}>
      {/* Sidebar: Fixed position, hidden on mobile */}
      <Box 
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          ...sidebarHiddenOnMobile,
          position: 'fixed',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: theme.zIndex.drawer, 
        }}
      >
        <SideNavbar />
      </Box>
      
      {/* Main content area */}
      <Box 
        component="main" 
        sx={{
          // Use flexGrow to push the Footer down
          flexGrow: 1, 
          position: 'fixed',
          display: 'flex', 
          flexDirection: 'column', 
          ml: { sm: sidebarWidth }, 
        }}
      >
        <TopNavbar />
        <Box 
          sx={{ 
            p: 4, 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
          }}
        >
          {children}
        </Box> 
        <Footer />
      </Box>
    </Box>
  );
}

export default Layout;