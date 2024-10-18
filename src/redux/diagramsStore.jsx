import { createSlice, current } from "@reduxjs/toolkit";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { databaseDiagram } from "./templates/dbDiagram";
import { getIdsFromNodeArr } from "../functions/nodes";

export const diagramSlice = createSlice({
  name: "diagrams",
  initialState: {
    nodes: [
      {
        id: "node-1",
        type: "database",
        position: { x: 0, y: 0 },

        data: {
          id: 1,
          title: "students",
          editing: false,
          titleBackground: "#1976d2",
          titleColor: "#fff",

          rows: [
            { id: 1, title: "id", key: "FK", type: "int", order: 2 },
            { id: 2, title: "studentId", key: "PK", type: "int", order: 1 },
            { id: 3, title: "name", key: "", type: "varchar(16)", order: 3 },
          ],
        },
      },
      {
        id: "node-2",
        type: "database",
        position: { x: 100, y: 50 },

        data: {
          id: 2,
          title: "data",
          editing: false,
          titleBackground: "#1976d2",
          titleColor: "#fff",
          rows: [
            { id: 1, title: "studentId", key: "FK", type: "int", order: 2 },
          ],
        },
      },
    ],
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
    importDataJson: (state, { payload }) => {
      state.nodes = payload.nodes;
      state.edges = payload.edges;
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
    addNewRow: (state, { payload }) => {
      state.nodes.map((i) => {
        if (i.data.id === payload.id) {
          payload.row.order =
            payload.row.key === "FK" ? 2 : payload.row.key === "PK" ? 1 : 3;

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
    changeRow: (state, { payload }) => {
      state.nodes.map((i) => {
        if (i.data.id === payload.id) {
          for (let index = 0; index < i.data.rows.length; index++) {
            let row = i.data.rows[index];
            if (row.id === payload.rowId) {
              row[payload.type] = payload.data;

              break;
            }
          }
        }

        return i;
      });
    },
  },
});

export const {
  onNodesChange,
  changeTitle,
  addDiagram,
  importDataJson,
  onEdgesChange,
  onConnect,
  onDragStart,
  setEditing,
  addNewRow,
  deleteRow,
  onSelectionchange,
  changeBgColor,
  changeRow,
} = diagramSlice.actions;
export const { diagramReducer: reducer } = diagramSlice;
