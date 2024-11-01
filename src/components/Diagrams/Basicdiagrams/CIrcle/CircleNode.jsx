import { Box, Input, Typography } from "@mui/material";
import { Handle, NodeResizer } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { changeTitle, setEditing } from "../../../../redux/diagramsStore";
import { ContextMenu } from "../../ContextMenu";

const handleWidth = { width: 7, height: 7 };

const handles = ["top", "bottom", "left", "right"];
const handleStyle = {
  top: { top: -1 },
  bottom: { bottom: -1 },
  left: { left: -1 },
  right: { right: -1 },
};
export const CircleNode = ({ selected, dragging, data }) => {
  const { editing } = data;
  const dispatch = useDispatch();
  function rowChange(newData) {
    dispatch(changeTitle({ id: data.id, newTitle: newData }));
  }

  function setEditingHandle() {
    dispatch(setEditing({ id: data.id }));
  }

  const titleSx = {
    color: data.titleColor,
    position: "absolute",
    zIndex: 999,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };
  return (
    <Box
      sx={{
        "::before": {
          backgroundColor: data.titleBackground,
          borderRadius: "50%",
        },

        color: data.titleColor,
        minWidth: 80,
        minHeight: 80,
        textAlign: "center",
      }}
      className={editing ? "nodrag rect-flow-node" : "rect-flow-node"}
      onDoubleClick={setEditingHandle}
    >
      <NodeResizer
        keepAspectRatio
        color="rgb(98 190 255)"
        isVisible={selected}
      />

      {handles.map((pos) => {
        const id = pos + "-" + data.id;
        return (
          <Handle
            key={pos}
            style={{ ...handleStyle[pos], ...handleWidth, border: 0 }}
            id={id}
            type="source"
            position={pos}
          />
        );
      })}

      <ContextMenu
        editing={editing}
        selected={selected}
        dragging={dragging}
        data={data}
        onSave={setEditingHandle}
      />

      {!editing ? (
        <Typography sx={titleSx} component={"pre"}>
          {data.title}
        </Typography>
      ) : (
        <Input
          onChange={(e) => rowChange(e.target.value, "title")}
          value={data.title}
          className="rect-flow-title"
          sx={{
            width: 70,
            height: 30,
            fontSize: 14,
            ...titleSx,
          }}
          multiline
          inputProps={{
            style: { textAlign: "center", color: data.titleColor },
          }}
        />
      )}
    </Box>
  );
};
