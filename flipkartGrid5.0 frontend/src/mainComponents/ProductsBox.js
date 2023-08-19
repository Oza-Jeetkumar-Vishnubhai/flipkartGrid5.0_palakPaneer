import React from "react";
import ProductLink from "../components/ProductLink";

const ProductsBox = ({ productsData }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          fontSize: "10px",
          color: "rgb(134 143 152)",
          fontWeight: "400",
          marginTop: "3px",
          marginBottom: "3px",
        }}
      >
        Total {productsData?.visual_matches?.length} results are available...
      </div>
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexWrap: "wrap",
          flexDirection: "row",
          flex: 1,
          overflowY: "scroll",
          gap: "1%",
          alignItems: "baseline",
          overflowX: "hidden",
        }}
      >
        {productsData?.visual_matches?.map((product, index) => (
          <ProductLink key={index} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsBox;
