import { createSlice } from "@reduxjs/toolkit";

import { databaseDiagram } from "./templates/dbDiagram";

import { dbNodeReducers } from "./reducers/dbNodeReducers";
import { reactFlowBasicReducers } from "./reducers/reactFlowBasicReducers";
import { nodeParamsReducer } from "./reducers/nodeParamsReducers";
import { rectDiagram } from "./templates/rectDiagram";
import { circleDiagram } from "./templates/circeDiagram";

const flowTypes = {
  database: databaseDiagram,
  rect: rectDiagram,
  circle: circleDiagram,
};

export const diagramSlice = createSlice({
  name: "diagrams",
  initialState: {
    nodes: [],
    edges: [],
    selected: [],
    dragging: [],
  },
  reducers: {
    importDataJson: (state, { payload }) => {
      state.nodes = payload.nodes;
      state.edges = payload.edges;
    },

    addDiagram: (state, { payload }) => {
      const id = state.nodes.length + 1;
      const { x, y } = payload;

      const add = flowTypes[payload.type];

      state.nodes.push(add(id, x, y, payload));
    },
    setEditing: (state, { payload }) => {
      state.nodes.map((i) => {
        if (i.data.id === payload.id) {
          i.data.editing = !i.data.editing;
        }

        return i;
      });
    },
    deleteNode: (state, { payload }) => {
      state.nodes = state.nodes.filter((i) =>
        i.data.id === payload.id ? false : true
      );
    },
    ...nodeParamsReducer,
    ...reactFlowBasicReducers,
    ...dbNodeReducers,
  },
});

export const { addDiagram, setEditing, importDataJson } = diagramSlice.actions;

// default
export const {
  onNodesChange,
  onEdgesChange,
  onConnect,
  onDragStart,
  onSelectionchange,
  onEdgeLabelStartEdit,
} = diagramSlice.actions;

// nodeParams
export const { changeTitle, changeBgColor, deleteNode, edgeLabelEdit } =
  diagramSlice.actions;

// dbNode
export const { addNewRow, deleteRow, changeRow } = diagramSlice.actions;

export const { diagramReducer: reducer } = diagramSlice;
