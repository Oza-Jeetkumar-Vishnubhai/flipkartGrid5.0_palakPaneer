import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import fashionIcon from "../images/fashionAni.gif";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { auth } from "../firebaseFiles/firebase";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Avatar from "@mui/material/Avatar";
import { useAuthState } from "react-firebase-hooks/auth";
const Header = () => {
  const [userInfo, setuserInfo] = useState();
  useEffect(() => {
    setuserInfo({
      name: auth?.currentUser?.displayName,
      email: auth?.currentUser?.email,
      picture: auth?.currentUser?.photoURL,
    });
  }, [useAuthState(auth)]);
  const logout = () => {
    auth.signOut();
  };
  return (
    <>
      <AppBar
        sx={{
          pl: 3,
          pr: 1,
          backgroundColor: "rgb(24 24 24)",
          fontSize: "15px",
          color: "rgb(190 190 190)",
          fontWeight: "500",
          boxShadow: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        style={{
          borderTop: "1px solid rgb(49 49 49)",
          borderBottom: "1px solid rgb(49 49 49)",
        }}
        position="static"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "30px", height: "30px", marginRight: "5px" }}
            src={fashionIcon}
            alt="loading..."
          />
          FliplookAi
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <GitHubIcon sx={{ color: "#1f88d9", fontSize: 20, mr: 1 }} />

          <Tooltip
            TransitionComponent={Zoom}
            title={
              <div>
                {userInfo?.name}
                <br />
                {userInfo?.email}
              </div>
            }
          >
            <Avatar
              sx={{ width: 20, height: 20, mr: 1 }}
              alt={"userInfo"}
              src={userInfo?.picture}
            />
          </Tooltip>
          <IconButton
            type="button"
            aria-label="logOut"
            style={{
              padding: 0,
              margin: 0,
            }}
            onClick={logout}
          >
            <LogoutIcon sx={{ color: "#e74040", fontSize: 20 }} />
          </IconButton>
        </div>
      </AppBar>
    </>
  );
};

export default Header;
