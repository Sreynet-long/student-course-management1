"use client";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Box, Typography, Button, Avatar,Divider , Breadcrumbs ,Stack } from "@mui/material";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          You are not logged in
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/"
          sx={{ bgcolor: "green" }}
        >
          Go Back Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 1 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" color='success' />
            <Typography color="text.secondary" variant="body2">
              Home
            </Typography>
          </Stack>
        </Link>
          <Typography color="text.primary" variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" color='success' />
              Account
          </Typography>
      </Breadcrumbs>
      <Divider sx={{width: "10px", color: "success"}}/>
      <Typography variant="h4" sx={{ mb: 2, color: "green" }}>
        My Profile
      </Typography>
      <Avatar
        src={user.avatar || "/default-avatar.png"}
        alt={user.username}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Username:</strong> {user.username}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Phone Number:</strong> {user.phoneNumber || "N/A"}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Email:</strong> {user.email}
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Role:</strong> {user.role || "Customer"}
      </Typography>

      <Button
        variant="contained"
        color="error"
        onClick={logout}
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Box>
  );
}
