import React from "react";
const ProductLink = ({ product }) => {
  return (
    <div
      style={{
        width: "24%",
        height: "24%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <a href={product?.link} target="_blank" rel="noopener noreferrer">
        <img
          src={product?.thumbnail}
          alt="new"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <span
          className="name"
          style={{
            position: "absolute",
            bottom: "0px",
            right: "0px",
            display: "flex",
            padding: "5px",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <img
            src={product?.source_icon}
            alt="flipkart"
            style={{ width: "20px", height: "20px", objectFit: "cover" }}
          />
        </span>
      </a>
    </div>
  );
};

export default ProductLink;
