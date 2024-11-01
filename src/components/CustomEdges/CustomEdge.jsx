import { TextField } from "@mui/material";
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "@xyflow/react";
import { useDispatch } from "react-redux";
import { edgeLabelEdit } from "../../redux/diagramsStore";

const labelSize = {
  borderRadius: 5,
  fontSize: 9,
  fontWeight: 700,
  color: "#e7e7e7",
};
export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  data,
  markerEnd,
  markerStart,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const { editing } = data;
  const dispatch = useDispatch();
  const labelStyle = {
    position: "absolute",
    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
    background: "#1976d2",
  };

  return (
    <>
      <BaseEdge
        markerEnd={markerEnd}
        markerStart={markerStart}
        id={id}
        path={edgePath}
      />
      <EdgeLabelRenderer>
        {editing ? (
          <TextField
            onChange={(e) =>
              dispatch(edgeLabelEdit({ id: id, label: e.target.value }))
            }
            sx={{
              ...labelStyle,
              width: Math.max(label.length, 2) + "ch",
              pointerEvents: "all",
              borderRadius: 1,
              padding: 0.5,
              "*::before": {
                bottom: 3,
              },
            }}
            autoFocus
            inputProps={{
              style: { ...labelSize, height: "10px" },
            }}
            variant="standard"
            value={label}
          />
        ) : label ? (
          <div
            style={{
              ...labelStyle,
              ...labelSize,
              padding: 5,
              height: "15px",
            }}
            className="nodrag nopan"
          >
            {label}
          </div>
        ) : null}
      </EdgeLabelRenderer>
    </>
  );
}
