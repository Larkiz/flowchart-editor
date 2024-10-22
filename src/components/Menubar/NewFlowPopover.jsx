import { Box, Button, Grid2, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DatabaseNodeMin } from "../Diagrams/DatabaseNode/DatabaseNodeMin";
import { addDiagram } from "../../redux/diagramsStore";

import AddchartIcon from "@mui/icons-material/Addchart";
import { RectNodeMin } from "../Diagrams/Basicdiagrams/RectNodeMin";
export function NewFlowPopover({ centerViewport }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();
  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        <AddchartIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ overflowY: "scroll" }}
      >
        <Box sx={{ p: 2, overflowY: "scroll", maxHeight: 450 }}>
          <Typography variant="h6">Простые</Typography>

          <Grid2></Grid2>
          <Stack maxWidth={315} gap={1} direction={"row"} flexWrap={"wrap"}>
            <Box
              className="node-min"
              alignSelf={"center"}
              sx={{ width: 150 }}
              onClick={() =>
                dispatch(
                  addDiagram({
                    type: "rect",
                    x: centerViewport.x,
                    y: centerViewport.y,
                  })
                )
              }
            >
              <RectNodeMin />
            </Box>

            <Box
              className="node-min"
              alignSelf={"center"}
              onClick={() =>
                dispatch(
                  addDiagram({
                    type: "rect",
                    x: centerViewport.x,
                    y: centerViewport.y,
                    rounded: true,
                  })
                )
              }
            >
              <RectNodeMin rounded />
            </Box>
            <Box
              alignSelf={"center"}
              onClick={() =>
                dispatch(
                  addDiagram({
                    type: "rect",
                    x: centerViewport.x,
                    y: centerViewport.y,
                    skewed: true,
                  })
                )
              }
            >
              <RectNodeMin skewed />
            </Box>
          </Stack>
          <Typography variant="h6">Базы Данных</Typography>

          <Stack maxWidth={310} gap={1} direction={"row"} flexWrap={"wrap"}>
            <Box
              className="node-min"
              onClick={() =>
                dispatch(
                  addDiagram({
                    type: "database",
                    x: centerViewport.x,
                    y: centerViewport.y,
                  })
                )
              }
            >
              <DatabaseNodeMin />
            </Box>
          </Stack>
        </Box>
      </Popover>
    </div>
  );
}
