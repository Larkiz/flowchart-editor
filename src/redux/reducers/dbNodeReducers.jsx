export const dbNodeReducers = {
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
};
