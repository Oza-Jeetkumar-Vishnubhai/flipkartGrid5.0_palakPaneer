import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./css/magicbutton.css";
import * as React from "react";
import Header from "./mainComponents/Header";
import MainBody from "./mainComponents/MainBody";
import Footer from "./mainComponents/Footer";
import { StyledEngineProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

import { auth } from "./firebaseFiles/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./firebaseFiles/login";
function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <Box
            className="prevent-select"
            sx={{
              backgroundColor: "rgb(31 31 31)",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              height: "100vh",
            }}
          >
            <Header />
            <MainBody />
            <Footer />
          </Box>

          {user ? (
            <></>
          ) : (
            <div
              className="prevent-select"
              style={{
                backgroundColor: "rgb(0 0 0 / 80%)",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Login />
            </div>
          )}
        </StyledEngineProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
