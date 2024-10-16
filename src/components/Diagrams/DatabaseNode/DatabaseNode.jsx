import KeyIcon from "@mui/icons-material/Key";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import DataArrayIcon from "@mui/icons-material/DataArray";
import {
  Button,
  Input,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import ConnectIcon from "@mui/icons-material/CompassCalibration";

import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  changeBgColor,
  changeTitle,
  deleteRow,
  setEditing,
} from "../../../redux/diagramsStore";

import { DatabaseNodeNewRow } from "./DatabaseNodeNewRow";

import { ColorPicker } from "../../ColorPicker/ColorPicker";
import { memo, useRef } from "react";
import { getIdsFromNodeArr } from "../../../functions/nodes";
import { CondSideHandle, TopHandle } from "./Handles/Handles";

export const DatabaseNode = memo(({ data }) => {
  const cellPadding = { padding: "3px 16px" };
  const { editing } = data;

  const selected =
    useSelector((state) => state.diagrams.selected)[0]?.data.id === data.id;

  const dispatch = useDispatch();

  function setEditingHandle() {
    dispatch(setEditing({ id: data.id }));
  }

  function sortedRows() {
    return [...data.rows].sort((a, b) => a.order - b.order);
  }

  const tst = useSelector((state) => state.diagrams.dragging);

  const dragging = getIdsFromNodeArr(tst).includes(data.id);

  const ref = useRef();
  const topHandleWidth = ref?.current?.clientWidth;

  return (
    <TableContainer
      ref={ref}
      sx={{
        backgroundColor: "#fff",
        overflowX: "visible",
      }}
      className={editing ? "nodrag" : null}
      onDoubleClick={setEditingHandle}
    >
      <div
        style={{
          opacity: !dragging ? 1 : 0,
          position: "absolute",
          width: topHandleWidth,
        }}
      >
        <ConnectIcon
          style={{
            position: "absolute",
            zIndex: 9999,
            fontSize: 10,
            left: 5,
            top: 1.5,
            color: "#b0c1ff",
          }}
        />
        <TopHandle cond={!dragging} />
      </div>
      {/* Menu */}
      {selected && !dragging && (
        <div
          style={{
            position: "absolute",
            top: -40,
            backgroundColor: "#fff",
            border: "1px solid #c7c7c7",
            borderRadius: 3,
          }}
        >
          <ColorPicker
            value={data.titleBackground}
            onChange={(color) =>
              dispatch(changeBgColor({ id: data.id, newBg: color }))
            }
          />
        </div>
      )}

      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: data.titleBackground }}>
          <TableRow>
            <TableCell align="center" colSpan={3} scope="row">
              {!editing || data.title === " " ? (
                <Typography variant="h6" gutterBottom>
                  {data.title}
                </Typography>
              ) : (
                <Input
                  inputProps={{ min: 0, style: { textAlign: "center" } }}
                  onChange={(e) =>
                    dispatch(
                      changeTitle({ id: data.id, newTitle: e.target.value })
                    )
                  }
                  value={data.title}
                />
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ border: "1px solid #e9e9e9" }}>
          <TableRow key={"sub"}>
            <TableCell style={{ ...cellPadding }} variant="footer">
              <SubtitlesIcon />
            </TableCell>
            <TableCell style={{ ...cellPadding }} variant="footer">
              <DataArrayIcon />
            </TableCell>
            <TableCell style={{ ...cellPadding }} variant="footer">
              <KeyIcon />
            </TableCell>
          </TableRow>
          {sortedRows().map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Stack direction={"row"}>
                  {row.key && (
                    <>
                      <CondSideHandle
                        cond={!dragging}
                        id={"handle-" + row.id}
                        position={"left"}
                        style={{
                          position: "relative",
                          top: 10,
                          left: -22,
                        }}
                      />
                    </>
                  )}

                  {row.title}
                </Stack>
              </TableCell>

              <TableCell>{row.type}</TableCell>
              {/* Key */}
              <TableCell>
                <Stack gap={1} direction={"row"}>
                  <span style={{ minWidth: editing ? 60 : 21 }}>{row.key}</span>
                  {editing && (
                    <Button
                      variant="contained"
                      sx={{ minWidth: 5, padding: 1 }}
                      onClick={() =>
                        dispatch(deleteRow({ id: data.id, rowId: row.id }))
                      }
                    >
                      <DeleteForeverIcon sx={{ fontSize: 13 }} />
                    </Button>
                  )}

                  {row.key && (
                    <CondSideHandle
                      cond={!dragging}
                      id={"handle-" + row.id + "-2"}
                      position={"right"}
                      style={{
                        top: 10,
                        left: 22,
                      }}
                    />
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
          {editing && (
            <DatabaseNodeNewRow
              setEditingHandle={setEditingHandle}
              data={data}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
