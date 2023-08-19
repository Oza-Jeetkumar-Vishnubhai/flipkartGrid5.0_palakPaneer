import React from "react";
import { auth, provider } from "./firebase";
import { Box } from "@mui/material";
import fashionIcon from "../images/fashionAni.gif";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import fashionBack from "../images/fashionBack.png";
const Login = () => {
  // Sign in with google
  const signin = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <div>
      <Box
        sx={{
          width: "400px",
          background: "rgb(31 31 31)",
          borderRadius: "5px",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
          src={fashionBack}
          alt="loading..."
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
            color: "rgb(134 143 152)",
            flexDirection: "column",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          <img
            style={{
              width: "100px",
              height: "100px",
              marginRight: "5px",
              zIndex: 100,
            }}
            src={fashionIcon}
            alt="loading..."
          />
          <div style={{ zIndex: 100, display: "flex", padding: 0, margin: 0 }}>
          Fliplook<p style={{ color: "#1f88d9", padding: 0, margin: 0 }}>Ai</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "15px",
            zIndex: 1,
          }}
        >
          <IconButton
            type="button"
            aria-label="logOut"
            style={{
              padding: "9px",
              width: "300px",
              borderRadius: "5px",
              borderWidth: "0.2px",
              borderColor: "#1f88d9",
              background: "rgb(134 143 152)",
              boxShadow: "none",
            }}
            onClick={signin}
          >
            <GoogleIcon sx={{ color: "#fff", fontSize: 37 }} />
          </IconButton>
        </div>
      </Box>
    </div>
  );
};

export default Login;
