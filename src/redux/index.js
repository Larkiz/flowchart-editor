import { configureStore } from "@reduxjs/toolkit";
import { diagramSlice } from "./diagramsStore";
import { optionsSlice } from "./optionsStore";

export const store = configureStore({
  reducer: { diagrams: diagramSlice.reducer, options: optionsSlice.reducer },
});
