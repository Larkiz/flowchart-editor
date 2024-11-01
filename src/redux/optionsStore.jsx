import { createSlice } from "@reduxjs/toolkit";
import { MarkerType } from "@xyflow/react";

export const optionsSlice = createSlice({
  name: "diagrams",
  initialState: {
    edgeTypeName: "line",
    edgeType: {},
  },
  reducers: {
    edgeTypeChange: (state, { payload }) => {
      if (payload === "arrowLeftRight") {
        const type = {
          markerEnd: { type: MarkerType.ArrowClosed },
          markerStart: { type: MarkerType.ArrowClosed },
        };
        state.edgeType = type;
        state.edgeTypeName = payload;
      }
      if (payload === "line") {
        const type = {};
        state.edgeType = type;
        state.edgeTypeName = payload;
      }
      if (payload === "arrowRight") {
        const type = { markerEnd: { type: MarkerType.ArrowClosed } };
        state.edgeType = type;
        state.edgeTypeName = payload;
      }
    },
  },
});

// default
export const { edgeTypeChange } = optionsSlice.actions;

export const { diagramReducer: reducer } = optionsSlice;
