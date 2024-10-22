export const rectDiagram = (id, x, y, { rounded = false, skewed = false }) => {
  return {
    id: "node " + id,
    type: "rectNode",
    position: { x: x, y: y },
    selected: false,
    dragging: false,
    data: {
      id: id,
      editing: false,
      titleBackground: "#1976d2",
      titleColor: "#fff",
      title: "Title",
      rounded: rounded,
      skewed: skewed,
    },
  };
};
