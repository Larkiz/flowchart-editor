import { Handle } from "@xyflow/react";
import { useState } from "react";
import { DatabaseNodeMin } from "../DatabaseNodeMin";
import AddchartIcon from "@mui/icons-material/Addchart";
import ConnectIcon from "@mui/icons-material/CompassCalibration";

export const TopHandle = ({ onClick, width, editing }) => {
  const [isHover, setHover] = useState(false);
  const bgStyle = {
    width: width && width / 2,
    height: "13px",
    position: "absolute",
  };
  const icoStyle = {
    zIndex: 999,
    fontSize: 10,
    top: 1.5,
    color: "#b0c1ff",
    position: "absolute",
  };
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

      <div>
        <ConnectIcon
          style={{
            left: 15,
            ...icoStyle,
          }}
        />
        <Handle
          className="db__flow-bradius-top-left"
          style={{
            borderRadius: 0,
            border: "none",
            left: width && width / 4,
            top: 6.5,
            ...bgStyle,
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
          left: width && width / 2,
          ...bgStyle,
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
            right: 15,
            ...icoStyle,
          }}
        />
      </div>
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
