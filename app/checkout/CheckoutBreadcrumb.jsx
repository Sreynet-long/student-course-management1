"use client";
import { Box, Stack, Typography } from "@mui/material";

export default function CheckoutBreadcrumb({ activeStep }) {
  const steps = ["Cart", "Shipping", "Payment"];

  return (
    <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 4 }}>
      {steps.map((label, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <Stack key={label} direction="row" alignItems="center" spacing={1.5}>
            {/* circle number */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "2px solid green",
                bgcolor: isActive || isCompleted ? "green" : "transparent",
                color: isActive || isCompleted ? "#fff" : "green",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {index + 1}
            </Box>

            {/* label */}
            <Typography
              fontWeight={isActive ? "bold" : 500}
              color={isActive || isCompleted ? "green" : "text.secondary"}
            >
              {label}
            </Typography>

            {/* line connector (except last) */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  width: 36,
                  height: 2,
                  bgcolor: index < activeStep ? "green" : "#ccc",
                }}
              />
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}
