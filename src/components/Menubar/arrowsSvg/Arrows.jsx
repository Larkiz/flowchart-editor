export const ArrowRight = ({ color = "#000" }) => {
  return (
    <svg viewBox="0 0 55.00 32.00" width="150px" height="16px">
      <path
        id="arrow-line"
        markerEnd="url(#ArrowRight)"
        strokeWidth="4"
        fill="none"
        stroke={color}
        d="M -100,20 h250"
      />
      <defs>
        <marker
          id="ArrowRight"
          orient="auto-start-reverse"
          markerWidth="3"
          markerHeight="4"
          refX="0.1"
          refY="2"
        >
          <path d="M0,0 V4 L2,2 Z" fill={color} />
        </marker>
      </defs>
    </svg>
  );
};
export const Line = ({ color = "#000" }) => {
  return (
    <svg viewBox="0 0 55.00 32.00" width="150px" height="16px">
      <path
        id="arrow-line"
        strokeWidth="4"
        fill="none"
        stroke={color}
        d="M -100,20 h250"
      />
    </svg>
  );
};
export const ArrowRightLeft = ({ color = "#000" }) => {
  return (
    <svg viewBox="0 0 55.00 32.00" width="150px" height="16px">
      <path
        id="arrow-line"
        markerStart="url(#start)"
        markerEnd="url(#end)"
        strokeWidth="4"
        stroke={color}
        d="M -100,20 h250"
      />
      <defs>
        <marker
          id="start"
          orient="auto-start-reverse"
          markerWidth="3"
          markerHeight="4"
          refX="0.1"
          refY="2"
        >
          <path d="M0,0 V4 L2,2 Z" fill={color} />
        </marker>
      </defs>
      <defs>
        <marker
          id="end"
          orient="auto"
          markerWidth="3"
          markerHeight="4"
          refX="0.1"
          refY="2"
        >
          <path d="M0,0 V4 L2,2 Z" fill={color} />
        </marker>
      </defs>
    </svg>
  );
};
