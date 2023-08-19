import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { auth } from "../firebaseFiles/firebase";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const HistoryProduct = () => {
  const [productHistory, setproductHistory] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getHistory = async () => {
      setloading(true);
      try {
        const username = auth?.currentUser?.email.split("@")[0];
        const response = await axios.get(
          `http://localhost:5001/myHistory/${username}`
        );
        response?.data.reverse();
        setproductHistory(response?.data);
        setloading(false);
      } catch (error) {
        console.error("Error to get history:", error);
        setloading(false);
      }
    };
    getHistory();
  }, [auth]);

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
      ) : productHistory?.length === 0 ? (
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
            paddingBottom: "5px",
          }}
        >
          {productHistory?.map((product, index) => (
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
                src={product?.image}
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
                {product?.title}
              </div>
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  background: "rgb(134 143 152)",
                  borderRadius: "3px",
                }}
                href={product?.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OpenInNewIcon sx={{ color: "rgb(24 24 24)", fontSize: 20 }} />
              </a>
            </div>
          ))}
        </Box>
      )}
    </>
  );
};

export default HistoryProduct;
