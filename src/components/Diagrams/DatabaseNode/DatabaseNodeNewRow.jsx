import { Button, Input, Stack, TableCell, TableRow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { SelectTypes } from "./Inputs/SelectType";
import { SelectKey } from "./Inputs/SelectKey";
import { addNewRow } from "../../../redux/diagramsStore";

export const DatabaseNodeNewRow = ({ data }) => {
  const [newRow, setNewRow] = useState({ title: "", key: "", type: "" });
  function newRowHandle(data) {
    setNewRow({ ...newRow, ...data });
  }
  const dispatch = useDispatch();

  function addNewRowHandle() {
    if (newRow.title && newRow.type) {
      dispatch(addNewRow({ id: data.id, row: newRow }));
    } else {
      toast.error("Название и тип строки не могут быть пусты");
    }
  }

  return (
    <>
      <TableRow>
        {/* newTitle */}
        <TableCell>
          <Input
            onChange={(e) => newRowHandle({ title: e.target.value })}
            value={newRow.title}
            sx={{ width: 70, height: 30 }}
          />
        </TableCell>
        {/* newType */}
        <TableCell>
          <SelectTypes
            value={newRow.type}
            onChange={(type) => newRowHandle({ type: type })}
          />
        </TableCell>
        {/* newKey */}
        <TableCell>
          <Stack gap={1} alignItems={"center"} direction={"row"}>
            <SelectKey
              value={newRow.key}
              onChange={(key) => newRowHandle({ key: key })}
            />

            <Button
              variant="contained"
              onClick={addNewRowHandle}
              sx={{ minWidth: 5, padding: 1 }}
            >
              <AddIcon sx={{ fontSize: 13 }} />
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
    </>
  );
};
