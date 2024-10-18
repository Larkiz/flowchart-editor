import { getIdsFromNodeArr } from "../../functions/nodes";

export const nodeParamsReducer = {
  changeTitle: (state, action) => {
    state.nodes.map((i) => {
      if (i.data.id === action.payload.id) {
        i.data.title = action.payload.newTitle;
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
};
