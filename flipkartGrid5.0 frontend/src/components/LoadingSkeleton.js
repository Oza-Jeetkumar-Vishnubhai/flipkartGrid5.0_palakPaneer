import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const LoadingSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton
        variant="circular"
        width={80}
        height={80}
        sx={{ alignSelf: "center", bgcolor: "rgb(106 106 106)" }}
      />
      <Stack spacing={1} direction="row">
        <Skeleton
          sx={{ bgcolor: "rgb(106 106 106)" }}
          variant="rounded"
          width={12}
          height={60}
        />
        <Skeleton
          variant="rounded"
          sx={{ alignSelf: "center", bgcolor: "rgb(106 106 106)" }}
          width={100}
          height={100}
        />
        <Skeleton
          sx={{ bgcolor: "rgb(106 106 106)" }}
          variant="rounded"
          width={12}
          height={60}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={0}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Skeleton
          variant="rounded"
          sx={{ alignSelf: "center", bgcolor: "rgb(106 106 106)" }}
          width={11}
          height={80}
        />
        <Skeleton
          variant="rounded"
          sx={{ alignSelf: "center", bgcolor: "rgb(106 106 106)" }}
          width={11}
          height={80}
        />
      </Stack>
    </Stack>
  );
};

export default LoadingSkeleton;
