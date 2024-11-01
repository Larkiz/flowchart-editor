import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";

export const reactFlowBasicReducers = {
  onNodesChange: (state, action) => {
    const a = applyNodeChanges(action.payload, state.nodes);
    state.nodes = a;
  },
  onEdgesChange: (state, action) => {
    state.edges = applyEdgeChanges(action.payload, state.edges);
  },
  onConnect: (state, { payload }) => {
    const { event, edgeType } = payload;

    state.edges = addEdge(
      {
        ...event,
        ...edgeType,
        label: "",
        data: { editing: false },
        type: "labelEdge",
      },
      state.edges
    );
  },
  onEdgeLabelStartEdit: (state, { payload }) => {
    state.edges.map((edge) => {
      if (edge.id === payload) {
        edge.data.editing = !edge.data.editing;
      }
      return edge;
    });
  },
  onSelectionchange: (state, action) => {
    state.selected = action.payload;
  },
  onDragStart: (state, action) => {
    state.dragging = action.payload;
  },
};
