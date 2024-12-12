import { Box, Typography } from "@mui/material";
const Rhombus = ({ width, height, color }) => {
  return (
    <svg
      style={{
        width: width,
        height: height,
      }}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const DiamondNodeMin = ({ rounded = false, skewed = false }) => {
  return (
    <Box
      sx={{
        "::before": {
          backgroundColor: "#1976d2",
          transform: skewed ? "skewX(-10deg)" : null,
          width: 109,
          height: 50,
        },
        color: "#fff",
        width: 109,

        textAlign: "center",

        cursor: "pointer",
      }}
      className="rect-flow "
    >
      <Rhombus width={100} height={100} color={"#1976d2"} />
      <Typography
        sx={{ position: "relative", top: -65 }}
        className="rect-flow-title"
      >
        Title
      </Typography>
    </Box>
  );
};