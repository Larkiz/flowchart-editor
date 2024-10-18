import { useDispatch } from "react-redux";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { changeBgColor } from "../../redux/diagramsStore";

export const ContextMenu = ({ selected, dragging, data }) => {
  const dispatch = useDispatch();
  return (
    selected &&
    !dragging && (
      <div
        style={{
          position: "absolute",
          top: -40,
          left: 0,
          backgroundColor: "#fff",
          border: "1px solid #c7c7c7",
          borderRadius: 3,
        }}
      >
        <ColorPicker
          value={data.titleBackground}
          onChange={(color) =>
            dispatch(changeBgColor({ id: data.id, newBg: color }))
          }
        />
      </div>
    )
  );
};
