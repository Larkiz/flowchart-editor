import { Handle } from "@xyflow/react";
import { useState } from "react";
import { DatabaseNodeMin } from "../DatabaseNodeMin";
import AddchartIcon from "@mui/icons-material/Addchart";
import ConnectIcon from "@mui/icons-material/CompassCalibration";
import { Stack } from "@mui/material";
export const TopHandle = ({ onClick, width, editing }) => {
  const [isHover, setHover] = useState(false);
  return (
    <div>
      {isHover && (
        <DatabaseNodeMin
          sx={{
            position: "absolute",
            bottom: 50,
            right: 0,
            opacity: 0.3,
            transform: "scale(0.9)",
          }}
        />
      )}
      <Stack alignItems={"center"} direction={"row"}>
        <div
          style={{
            position: "relative",
          }}
        >
          <ConnectIcon
            style={{
              position: "absolute",
              zIndex: 9999,
              fontSize: 10,
              left: 15,
              top: 1.5,
              color: "#b0c1ff",
            }}
          />
          <Handle
            className="db__flow-bradius-top-left"
            style={{
              width: width && width / 2,
              height: "13px",
              borderRadius: 0,
              position: "relative",
              left: !editing ? 37.5 : 77.5,

              top: 6.5,
              border: "none",
            }}
            id="top"
            position={"top"}
            type="source"
            width={width}
          />
        </div>
        <div
          className="react-flow__handle__add-new db__flow-bradius-top-right"
          style={{
            position: "relative",
            width: width && width / 2,
            zIndex: 9999,
            fontSize: 10,
            height: "13px",
            top: 0.3,
            color: "#b0c1ff",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <AddchartIcon
            style={{
              position: "absolute",
              zIndex: 9999,
              fontSize: 10,
              right: 15,
              top: 1.5,
              color: "#b0c1ff",
            }}
          />
        </div>
      </Stack>
    </div>
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
