import { Box, Input } from "@mui/material";
import { ContextMenu } from "../ContextMenu";
import { useDispatch } from "react-redux";
import { changeTitle, setEditing } from "../../../redux/diagramsStore";
import { Handle } from "@xyflow/react";

const handleWidth = { width: 7, height: 7 };

export const RectNode = ({ selected, dragging, data }) => {
  const { rounded = false, skewed = false, editing } = data;

  const dispatch = useDispatch();
  function rowChange(newData) {
    dispatch(changeTitle({ id: data.id, newTitle: newData }));
  }

  function setEditingHandle() {
    dispatch(setEditing({ id: data.id }));
  }

  return (
    <Box
      sx={{
        "::before": {
          backgroundColor: data.titleBackground,
          transform: skewed ? "skewX(-10deg)" : null,
          borderRadius: rounded ? 50 : null,
        },

        color: data.titleColor,
        minWidth: 80,
        textAlign: "center",
      }}
      className={
        editing ? "rect-flow rect-flow-node nodrag" : "rect-flow rect-flow-node"
      }
      onDoubleClick={setEditingHandle}
    >
      <Handle
        style={{
          left: -1,
          ...handleWidth,
        }}
        id={"left-" + data.id}
        type="source"
        position={"left"}
      />
      <Handle
        id={"top-" + data.id}
        style={{ top: -1, ...handleWidth }}
        type="source"
        position={"top"}
      />
      <Handle
        id={"bottom-" + data.id}
        style={{ bottom: -1, ...handleWidth }}
        type="source"
        position={"bottom"}
      />
      <Handle
        id={"right-" + data.id}
        style={{ right: -1, ...handleWidth }}
        type="source"
        position={"right"}
      />
      <ContextMenu
        editing={editing}
        selected={selected}
        dragging={dragging}
        data={data}
        onSave={setEditingHandle}
      />
      {!editing ? (
        <span>{data.title}</span>
      ) : (
        <Input
          color="primary"
          onChange={(e) => rowChange(e.target.value, "title")}
          value={data.title}
          sx={{
            width: 70,
            height: 30,
            fontSize: 14,
          }}
          inputProps={{
            style: { textAlign: "center", color: data.titleColor },
          }}
        />
      )}
    </Box>
  );
};
