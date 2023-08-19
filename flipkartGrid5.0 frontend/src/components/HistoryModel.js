import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "@mui/material/Tabs";

import HistoryProduct from "./HistoryProduct";
import HistoryPreferences from "./HistoryPreferences";

function HistoryModel({ visible, chnagevisible }) {
  // ============
  const handleClose = () => {
    chnagevisible(false);
  };
  //   ==========
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // ===========

  // ===========
  return (
    <Dialog onClose={handleClose} open={visible}>
      <Box sx={{ width: "500px", bgcolor: "rgb(31 31 31)" }}>
        <TabContext value={value}>
          <Tabs
            sx={{ background: "rgb(31 31 31)", color: "rgb(134 143 152)" }}
            value={value}
            indicatorColor="yellow"
            textColor="inherit"
            onChange={handleChange}
            TabIndicatorProps={{
              style: { background: "rgb(134 143 152)" },
            }}
            centered
          >
            <Tab label="Preferences" value="1" />
            <Tab label="History" value="2" />
          </Tabs>
          <TabPanel style={{ height: "400px", padding: 0 }} value="1" index={1}>
            <HistoryPreferences />
          </TabPanel>
          <TabPanel
            style={{
              height: "395px",
              padding: "5px",
              overflow: "hidden",
              marginBottom: "5px",
            }}
            value="2"
            index={2}
          >
            <HistoryProduct />
          </TabPanel>
        </TabContext>
      </Box>
    </Dialog>
  );
}

export default HistoryModel;
