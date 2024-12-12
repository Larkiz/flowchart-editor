import { Box, Input, Typography } from "@mui/material";

import { useDispatch } from "react-redux";

import { Handle, NodeResizer } from "@xyflow/react";
import { ContextMenu } from "../../ContextMenu";
import { changeTitle, setEditing } from "../../../../redux/diagramsStore";

const handleWidth = { width: 7, height: 7 };

const handles = ["top", "bottom", "left", "right"];
const handleStyle = {
  top: { top: -1 },
  bottom: { bottom: -1 },
  left: { left: -1 },
  right: { right: -1 },
};

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
          borderRadius: rounded ? 3 : null,
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
      <NodeResizer
        color="rgb(98 190 255)"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
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
        <Typography
          sx={{
            width: "100%",

            fontSize: 14,
            whiteSpace: "break-spaces",
            wordBreak: "break-word",
            pointerEvents: "none",
          }}
          className="rect-flow-title"
          component={"pre"}
        >
          {data.title}
        </Typography>
      ) : (
        <Input
          className="rect-flow-title"
          onChange={(e) => rowChange(e.target.value, "title")}
          value={data.title}
          sx={{
            width: "100%",

            fontSize: 14,
            whiteSpace: "break-spaces",
            wordBreak: "break-word",
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
