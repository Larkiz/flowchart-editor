import { Box, Button, Popover, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommitIcon from "@mui/icons-material/Commit";
import { edgeTypeChange } from "../../redux/optionsStore";

import { ArrowRight, ArrowRightLeft, Line } from "./arrowsSvg/Arrows";

const arrowsTypes = [
  { name: "line", component: Line },
  { name: "arrowRight", component: ArrowRight },
  { name: "arrowLeftRight", component: ArrowRightLeft },
];

export function EdgeTypePopover() {
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
  const { edgeTypeName } = useSelector((state) => state.options);
  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        <CommitIcon />
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
          <Stack maxWidth={315} gap={1}>
            {arrowsTypes.map(({ name, component: ArrowComponent }) => {
              return (
                <Button
                  key={name}
                  variant={edgeTypeName === name ? "contained" : "outlined"}
                  onClick={() => dispatch(edgeTypeChange(name))}
                >
                  <ArrowComponent
                    color={edgeTypeName === name ? "#fff" : "#000"}
                  />
                </Button>
              );
            })}
          </Stack>
        </Box>
      </Popover>
    </div>
  );
}
