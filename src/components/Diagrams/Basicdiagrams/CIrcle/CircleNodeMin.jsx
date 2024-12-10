import { Box, Typography } from "@mui/material";

export const CircleNodeMin = () => {
  const titleSx = {
    color: "#fff",

    zIndex: 999,
    position: "relative",
    top: 25,
  };
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        borderRadius: "50%",
        width: 80,
        height: 80,
        textAlign: "center",
        cursor: "pointer",
        ":hover": {
          filter: "drop-shadow(0 3px 2px rgba(0, 0, 0, 0.61))",
          transition: "0.1s",
        },
      }}
    >
      <Typography sx={titleSx} component={"pre"}>
        title
      </Typography>
    </Box>
  );
};
