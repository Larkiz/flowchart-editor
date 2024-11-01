import { useDispatch } from "react-redux";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { changeBgColor, deleteNode } from "../../redux/diagramsStore";
import { Button, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const btnStyle = { height: 25, minWidth: 0, width: 25 };

export const ContextMenu = ({ selected, dragging, data, editing, onSave }) => {
  const dispatch = useDispatch();
  return (
    selected &&
    !dragging && (
      <div
        style={{
          position: "absolute",
          top: -60,
          left: 0,
          backgroundColor: "#fff",
          border: "1px solid #c7c7c7",
          borderRadius: 3,
          padding: 5,
        }}
      >
        <Stack alignItems={"center"} spacing={2} direction={"row"}>
          <ColorPicker
            value={data.titleBackground}
            onChange={(color) =>
              dispatch(changeBgColor({ id: data.id, newBg: color }))
            }
          />

          {editing && (
            <Button
              sx={{
                ...btnStyle,

                marginLeft: "0px!important",
              }}
              variant="contained"
              onClick={onSave}
            >
              <SaveIcon sx={{ width: 17 }} />
            </Button>
          )}
          <Button
            onClick={() => dispatch(deleteNode({ id: data.id }))}
            sx={btnStyle}
            variant="contained"
          >
            <DeleteIcon sx={{ width: 17 }} />
          </Button>
        </Stack>
      </div>
    )
  );
};
