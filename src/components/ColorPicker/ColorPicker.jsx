import { Box, Popover, Stack, Paper } from "@mui/material";
import { useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";

export const ColorPicker = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div aria-describedby={id}>
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            alignItems: "center",
            width: 100,
            gap: 1,
            padding: 0.5,
          }}
        >
          <Box
            sx={{
              "& > :not(style)": {
                width: 18,
                height: 18,
              },
            }}
          >
            <Paper
              onClick={handleClick}
              sx={{ cursor: "pointer", backgroundColor: value }}
            />
          </Box>
          <input
            onChange={onChange}
            style={{ width: "100%", border: "none", outline: "none" }}
            value={value}
          />
        </Stack>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <HexAlphaColorPicker
          color={value}
          onChange={(color) => onChange(color)}
        />
      </Popover>
    </div>
  );
};
