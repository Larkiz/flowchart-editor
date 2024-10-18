import { Box } from "@mui/material";
import { ContextMenu } from "../ContextMenu";

export const RectNode = ({ selected, dragging, data }) => {
  return (
    <Box
      sx={{ backgroundColor: data.titleBackground, color: data.titleColor }}
      className="rect-flow"
    >
      <ContextMenu selected={selected} dragging={dragging} data={data} />
      Начало
    </Box>
  );
};
