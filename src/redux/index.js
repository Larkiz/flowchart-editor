import { configureStore } from "@reduxjs/toolkit";
import { diagramSlice } from "./diagramsStore";

export const store = configureStore({
  reducer: { diagrams: diagramSlice.reducer },
});
