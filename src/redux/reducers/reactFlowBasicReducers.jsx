import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";

export const reactFlowBasicReducers = {
  onNodesChange: (state, action) => {
    const a = applyNodeChanges(action.payload, state.nodes);
    state.nodes = a;
  },
  onEdgesChange: (state, action) => {
    state.edges = applyEdgeChanges(action.payload, state.edges);
  },
  onConnect: (state, action) => {
    state.edges = addEdge(
      { ...action.payload, type: "smoothstep" },
      state.edges
    );
  },
  onSelectionchange: (state, action) => {
    state.selected = action.payload;
  },
  onDragStart: (state, action) => {
    state.dragging = action.payload;
  },
};
