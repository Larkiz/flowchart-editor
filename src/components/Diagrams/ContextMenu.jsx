import { useDispatch } from "react-redux";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { changeBgColor } from "../../redux/diagramsStore";
import { Button, Stack } from "@mui/material";

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
        <Stack alignItems={"center"} direction={"row"}>
          <ColorPicker
            value={data.titleBackground}
            onChange={(color) =>
              dispatch(changeBgColor({ id: data.id, newBg: color }))
            }
          />
          {editing && (
            <Button
              sx={{ height: 30, fontSize: 10 }}
              variant="contained"
              fullWidth
              onClick={onSave}
            >
              Сохранить
            </Button>
          )}
        </Stack>
      </div>
    )
  );
};
