import { createSlice, current } from "@reduxjs/toolkit";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { databaseDiagram } from "./templates/dbDiagram";
import { getIdsFromNodeArr } from "../functions/nodes";

export const diagramSlice = createSlice({
  name: "diagrams",
  initialState: {
    nodes: [],
    edges: [],
    selected: [],
    dragging: [],
  },
  reducers: {
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
    changeTitle: (state, action) => {
      state.nodes.map((i) => {
        if (i.data.id === action.payload.id) {
          i.data.title = action.payload.newTitle;
        }
        return i;
      });
    },
    addDiagram: (state, { payload }) => {
      const id = state.nodes.length + 1;
      const { type, x, y } = payload;
      state.nodes.push(databaseDiagram(id, type, x, y));
    },
    setEditing: (state, { payload }) => {
      state.nodes.map((i) => {
        if (i.data.id === payload.id) {
          i.data.editing = !i.data.editing;
        }

        return i;
      });
    },
    addNewRow: (state, { payload }) => {
      state.nodes.map((i) => {
        if (i.data.id === payload.id) {
          payload.row.order =
            payload.row.key === "FK" ? 1 : payload.row.key === "PK" ? 2 : 3;

          i.data.rows.push({ id: i.data.rows.length + 1, ...payload.row });
        }

        return i;
      });
    },
    deleteRow: (state, { payload }) => {
      state.nodes.map((i) => {
        if (i.data.id === payload.id) {
          i.data.rows = i.data.rows.filter((row) => row.id !== payload.rowId);
        }

        return i;
      });
    },
    changeBgColor: (state, { payload }) => {
      const selectedNodes = state.selected;
      const ids = getIdsFromNodeArr(selectedNodes);
      state.nodes.map((node) => {
        if (ids.includes(node.data.id)) {
          node.data.titleBackground = payload.newBg;
        }
        return node;
      });
    },
  },
});

export const {
  onNodesChange,
  changeTitle,
  addDiagram,
  onEdgesChange,
  onConnect,
  onDragStart,
  setEditing,
  addNewRow,
  deleteRow,
  onSelectionchange,
  changeBgColor,
} = diagramSlice.actions;
export const { diagramReducer: reducer } = diagramSlice;
