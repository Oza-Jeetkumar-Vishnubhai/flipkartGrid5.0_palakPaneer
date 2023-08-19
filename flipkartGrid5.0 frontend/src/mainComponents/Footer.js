import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const defaultTheme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            pb: 0.3,
            pt: 0.2,
            px: 2,
            mt: "auto",
            backgroundColor: "rgb(24 24 24)",
            fontSize: "9.5px",
            color: "rgb(134 143 152)",
            fontWeight: "400",
          }}
          style={{
            borderTop: "1px solid rgb(49 49 49)",
            borderBottom: "1px solid rgb(49 49 49)",
          }}
        >
          <Container maxWidth="sm" style={{ textAlign: "center" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: "<< Flipkart5.0 - PalakPaneer >>",
              }}
            />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
