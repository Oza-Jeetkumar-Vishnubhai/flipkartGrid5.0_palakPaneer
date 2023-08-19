import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { auth } from "../firebaseFiles/firebase";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

const HistoryPreferences = () => {
  const [productPreferences, setproductPreferences] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getHistory = async () => {
      setloading(true);
      try {
        const username = auth?.currentUser?.email.split("@")[0];
        const response = await axios.get(
          `http://localhost:5001/myPreferences/${username}`
        );
        setproductPreferences(response?.data);
        setloading(false);
      } catch (error) {
        console.error("Error to get history:", error);
        setloading(false);
      }
    };
    getHistory();
  }, [auth]);

  const [valueInner, setvalueInner] = React.useState("0");
  const handleChangeInner = (event, newValue) => {
    setvalueInner(newValue);
  };
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            height: "400px",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : productPreferences?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            height: "400px",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No Results
        </Box>
      ) : (
        <Box sx={{ display: "flex", height: "400px" }}>
          <TabContext value={valueInner}>
            <Tabs
              textColor="inherit"
              TabIndicatorProps={{
                style: { background: "rgb(134 143 152)" },
              }}
              orientation="vertical"
              variant="scrollable"
              value={valueInner}
              onChange={handleChangeInner}
              aria-label="Vertical tabs example"
              sx={{
                borderRight: 1,
                borderColor: "divider",
                width: "125px",
                overflow: "hidden",
                color: "rgb(134 143 152)",
              }}
            >
              {Object.keys(productPreferences).map((product, index) => (
                <Tab key={index} label={product} value={`${index}`} />
              ))}
            </Tabs>
            {Object.values(productPreferences).map((product, index) => (
              <TabPanel
                key={index}
                style={{
                  margin: 0,
                  padding: "20px",
                }}
                value={`${index}`}
                index={index}
              >
                {Object.entries(product).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "5px",
                      width: "350px",
                      background: "rgb(24 24 24)",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      style={{
                        padding: "5px",
                        fontWeight: "bold",
                        color: "rgb(134 143 152)",
                        width: "30%",
                      }}
                    >
                      {key}
                    </div>
                    <div
                      style={{
                        background: "rgb(134 143 152)",
                        padding: "5px",
                        width: "70%",
                        borderRadius: "3px",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      )}
    </>
  );
};

export default HistoryPreferences;
