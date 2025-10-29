// components/Toast.js
"use client";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ open, message }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background: "#388e3c",
            color: "white",
            padding: "12px 20px",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          <Typography variant="body2">{message}</Typography>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
