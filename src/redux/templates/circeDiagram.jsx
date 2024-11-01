export const circleDiagram = (id, x, y) => {
  return {
    id: "node " + id,
    type: "circleNode",
    position: { x: x, y: y },
    selected: false,
    dragging: false,
    data: {
      id: id,
      editing: false,
      titleBackground: "#1976d2",
      titleColor: "#fff",
      title: "Title",
    },
  };
};
