import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Box textAlign="center">
        <Typography
          style={{
            marginBottom: "1rem",
            color: "#414141",
            fontWeight: "lighter",
            fontSize: "24px",
          }}
          variant="h4"
        >
          Ooops...
        </Typography>
        <Typography
          style={{
            color: "#414141",
            fontWeight: "lighter",
            marginBottom: "1rem",
            fontSize: "16px",
          }}
          variant="h6"
        >
          This page you were looking for does not exist!
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            style={{ fontSize: "12px" }}
            variant="contained"
            color="primary"
            size="small"
          >
            Go to home page
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
