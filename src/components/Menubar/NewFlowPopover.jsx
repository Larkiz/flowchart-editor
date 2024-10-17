import { Box, Button, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DatabaseNodeMin } from "../Diagrams/DatabaseNode/DatabaseNodeMin";
import { addDiagram } from "../../redux/diagramsStore";

import AddchartIcon from "@mui/icons-material/Addchart";
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
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Схемы</Typography>
          <Stack direction={"row"} flexWrap={"wrap"}>
            <DatabaseNodeMin
              onClick={() =>
                dispatch(
                  addDiagram({
                    type: "database",
                    x: centerViewport.x,
                    y: centerViewport.y,
                  })
                )
              }
            />
          </Stack>
        </Box>
      </Popover>
    </div>
  );
}
