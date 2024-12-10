import { Box } from "@mui/material";

export const RectNodeMin = ({ rounded = false, skewed = false }) => {
  const sx = skewed
    ? {
        "::before": {
          backgroundColor: "#1976d2",
          transform: skewed ? "skewX(-10deg) translate(-42%,-25%)" : null,
          width: 149,
          height: 50,
          zIndex: 999,
          position: "absolute",

          content: '" "',
        },
        ":hover": {
          filter: "drop-shadow(0 3px 2px rgba(0, 0, 0, 0.61))",
          transition: "0.1s",
        },
      }
    : { borderRadius: rounded ? 3 : null, backgroundColor: "#1976d2" };
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
        ...sx,
      }}
      className="rect-flow "
    >
      <span className="rect-flow-title">Title</span>
    </Box>
  );
};
