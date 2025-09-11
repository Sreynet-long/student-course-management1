import React from 'react'
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbr";

function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const sidebarWidth = '250px';
  const sidebarHiddenOnMobile = { display: isMobile ? 'none' : 'block' };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f0f2f5', minHeight: '100vh', width: '100%' }}>
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
        }}
      >
        <SideNavbar />
      </Box>
     
      {/* Main content area */}
      <Box 
        component="main" 
        sx={{
          flexGrow: 1,
          ml: { sm: sidebarWidth }, // Add left margin on screens >= 'sm'
          p: 0,
        }}
      >
        <TopNavbar />
        <Box sx={{ p: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
export default layout