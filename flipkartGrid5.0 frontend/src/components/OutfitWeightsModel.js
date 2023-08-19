import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

function convertData(inputData) {
  const outputData = {};

  for (const key in inputData) {
    if (inputData.hasOwnProperty(key)) {
      outputData[key] = {};
      for (const prop in inputData[key]) {
        if (inputData[key].hasOwnProperty(prop)) {
          outputData[key][prop] = {
            value: inputData[key][prop],
            count: 1,
          };
        }
      }
    }
  }

  return outputData;
}
function OutfitWeightsModel({
  initialProductPreferences,
  visible,
  chnagevisible,
  mainFunction,
}) {
  // =============slider handling==========
  const [productPreferences, setProductPreferences] = useState(
    convertData(initialProductPreferences)
  );
  const handleSliderChange = (productKey, property, newValue) => {
    setProductPreferences((prevPreferences) => ({
      ...prevPreferences,
      [productKey]: {
        ...prevPreferences[productKey],
        [property]: {
          ...prevPreferences[productKey][property],
          count: newValue,
        },
      },
    }));
  };
  useEffect(() => {
    setProductPreferences(convertData(initialProductPreferences));
  }, [initialProductPreferences]);

  // ============
  const handleClose = () => {
    chnagevisible(false);
  };
  // ===========
  const [valueInner, setvalueInner] = React.useState("0");
  const handleChangeInner = (event, newValue) => {
    setvalueInner(newValue);
  };
  // ===========

  return (
    <Dialog open={visible}>
      <Box
        sx={{
          width: "500px",
          bgcolor: "rgb(31 31 31)",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", height: "350px" }}>
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
            {Object.entries(productPreferences).map(
              ([product, properties], index) => (
                <TabPanel
                  key={index}
                  className="hidescroll"
                  style={{
                    margin: 0,
                    padding: "20px",
                    height: "350px",
                    overflowY: "scroll",
                  }}
                  value={`${index}`}
                  index={index}
                >
                  {Object.entries(properties).map(([property, details]) => (
                    <div
                      key={property}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "5px",
                        width: "350px",
                        background: "rgb(24 24 24)",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
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
                          {property}
                        </div>
                        <div
                          style={{
                            background: "rgb(134 143 152)",
                            padding: "5px",
                            width: "70%",
                            borderRadius: "3px",
                          }}
                        >
                          {details?.value}
                        </div>
                      </div>
                      <div
                        style={{
                          width: "80%",
                          alignSelf: "center",
                          display: "flex",
                          flexDirection: "row",
                          paddingTop: "35px",
                          color: "rgb(134 143 152)",
                          fontWeight: "bold",
                        }}
                      >
                        0
                        <Slider
                          aria-label="Small steps"
                          size="small"
                          defaultValue={1}
                          step={0.01}
                          sx={{
                            ml: 1,
                            mr: 1,
                          }}
                          min={0}
                          max={2}
                          valueLabelDisplay="on"
                          value={details.count}
                          onChange={(event, newValue) =>
                            handleSliderChange(product, property, newValue)
                          }
                        />
                        2
                      </div>
                    </div>
                  ))}
                </TabPanel>
              )
            )}
          </TabContext>
        </Box>
        <Button
          size="small"
          style={{
            backgroundColor: "rgb(24 24 24)",
            color: "rgb(134 143 152)",
            margin: "10px",
          }}
          onClick={() => {
            mainFunction(productPreferences);
            handleClose();
          }}
        >
          <span>Confirm</span>
        </Button>
      </Box>
    </Dialog>
  );
}

export default OutfitWeightsModel;
