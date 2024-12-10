import { Box, Input, Typography } from "@mui/material";

import { useDispatch } from "react-redux";

import { Handle, NodeResizer } from "@xyflow/react";
import { ContextMenu } from "../../ContextMenu";
import { changeTitle, setEditing } from "../../../../redux/diagramsStore";
import { useState } from "react";

const handleWidth = { width: 7, height: 7 };

const handles = ["top", "bottom", "left", "right"];
const handleStyle = {
  top: { top: -1 },
  bottom: { bottom: -1 },
  left: { left: -1 },
  right: { right: -1 },
};
const Rhombus = ({ width, height, color }) => {
  return (
    <svg
      style={{
        zIndex: -999,
        width: width,
        height: height,
        position: "absolute",
        left: 0,
        top: 0,
      }}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5757 1.42426C11.81 1.18995 12.1899 1.18995 12.4243 1.42426L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42426 12.4243C1.18995 12.19 1.18995 11.8101 1.42426 11.5757L11.5757 1.42426Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const DiamondNode = ({ selected, dragging, data }) => {
  const { editing } = data;

  const dispatch = useDispatch();
  function rowChange(newData) {
    dispatch(changeTitle({ id: data.id, newTitle: newData }));
  }

  function setEditingHandle() {
    dispatch(setEditing({ id: data.id }));
  }
  const [size, setSize] = useState({ width: 100, height: 100 });
  return (
    <Box
      sx={{
        color: data.titleColor,
        width: size.width,
        height: size.height,
        textAlign: "center",
        display: "grid",
        placeItems: "center",
      }}
      className={
        editing ? "rect-flow rect-flow-node nodrag" : "rect-flow rect-flow-node"
      }
      onDoubleClick={setEditingHandle}
    >
      <NodeResizer
        keepAspectRatio
        color="rgb(98 190 255)"
        isVisible={selected}
        minWidth={size.width}
        minHeight={size.height}
        onResize={(e, data) => {
          const { width, height } = data;

          setSize({ width, height });
        }}
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
      <Rhombus
        color={data.titleBackground}
        width={size.width}
        height={size.height}
      />
      {!editing ? (
        <Typography
          sx={{ translate: "-55% -55%" }}
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
            width: 70,
            height: 30,
            fontSize: 14,
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
