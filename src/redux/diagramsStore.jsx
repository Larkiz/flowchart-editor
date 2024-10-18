import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { databaseDiagram } from "./templates/dbDiagram";
import { getIdsFromNodeArr } from "../functions/nodes";
import { dbNodeReducers } from "./reducers/dbNodeReducers";
import { reactFlowBasicReducers } from "./reducers/reactFlowBasicReducers";
import { nodeParamsReducer } from "./reducers/nodeParamsReducers";

const reducers = combineReducers;

export const diagramSlice = createSlice({
  name: "diagrams",
  initialState: {
    nodes: [
      {
        id: "node-1",
        type: "rectNode",
        position: { x: 0, y: 0 },
        selected: false,
        data: {
          id: 1,
          title: "students",
          editing: false,
          titleBackground: "#1976d2",
          titleColor: "#fff",
        },
      },
    ],
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

      state.nodes.push(databaseDiagram(id, x, y));
    },
    setEditing: (state, { payload }) => {
      state.nodes.map((i) => {
        if (i.data.id === payload.id) {
          i.data.editing = !i.data.editing;
        }

        return i;
      });
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
} = diagramSlice.actions;

// nodeParams
export const { changeTitle, changeBgColor } = diagramSlice.actions;

// dbNode
export const { addNewRow, deleteRow, changeRow } = diagramSlice.actions;

export const { diagramReducer: reducer } = diagramSlice;
