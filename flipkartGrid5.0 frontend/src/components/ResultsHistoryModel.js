import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { auth } from "../firebaseFiles/firebase";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function ResultsHistoryModel({ visible, chnagevisible }) {
  const [generatedProductHistory, setgeneratedProductHistory] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getHistory = async () => {
      setloading(true);
      try {
        const username = auth?.currentUser?.email.split("@")[0];
        const response = await axios.get(
          `http://localhost:5001/myGneratedHistory/${username}`
        );
        response?.data.reverse();
        setgeneratedProductHistory(response?.data);
        setloading(false);
      } catch (error) {
        console.error("Error to get history:", error);
        setloading(false);
      }
    };
    getHistory();
  }, [visible]);
  // ============
  const handleClose = () => {
    chnagevisible(false);
  };
  // ===========
  return (
    <Dialog onClose={handleClose} open={visible}>
      <Box sx={{ width: "500px", bgcolor: "rgb(31 31 31)", padding: "5px" }}>
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
        ) : generatedProductHistory?.length === 0 ? (
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
          <Box
            className="hidescroll"
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "395px",
              overflowX: "hidden",
              gap: "5px",
            }}
          >
            {generatedProductHistory?.map((product, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: "5px",
                  padding: "5px",
                  backgroundColor: "rgb(24 24 24)",
                }}
              >
                <img
                  src={product?.imageUrl}
                  alt="new"
                  style={{
                    width: "100px",
                    borderRadius: "3px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    fontWeight: "bold",
                    color: "rgb(134 143 152)",
                    fontSize: "15px",
                    padding: "10px 20px 10px 20px",
                  }}
                >
                  {product?.imageText}
                </div>
              </div>
            ))}
          </Box>
        )}
      </Box>
    </Dialog>
  );
}

export default ResultsHistoryModel;
