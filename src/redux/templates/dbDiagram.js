export const databaseDiagram = (id, type, x, y) => {
  return {
    id: "node " + id,
    type: type,
    position: { x: x, y: y },

    data: {
      id: id,
      editing: false,
      titleBackground: "#b0c1ff",
      title: "Title",
      rows: [],
    },
  };
};
