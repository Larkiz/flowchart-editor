import { Handle } from "@xyflow/react";

export const TopHandle = () => {
  return (
    <Handle
      style={{
        width: "100%",
        height: "10px",
        borderRadius: 0,
        border: "none",
        position: "relative",
        transform: "translate(-50%, 0)",
        padding: "1.5px 0",
      }}
      id="top"
      position={"top"}
      type="source"
    />
  );
};

export const CondSideHandle = ({ cond, style, ...props }) => {
  return (
    <Handle
      style={{
        ...style,
        position: "relative",

        borderRadius: 0,
        border: "none",
        width: 2,
        opacity: cond ? 1 : 0,
        transform: "scaleY(3)",
      }}
      {...props}
    />
  );
};
