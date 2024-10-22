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

import { useDispatch } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  addDiagram,
  changeRow,
  changeTitle,
  deleteRow,
  setEditing,
} from "../../../redux/diagramsStore";

import { DatabaseNodeNewRow } from "./DatabaseNodeNewRow";

import { useRef } from "react";

import { CondSideHandle, TopHandle } from "./Handles/Handles";
import { SelectTypes } from "./Inputs/SelectType";
import { SelectKey } from "./Inputs/SelectKey";
import { ContextMenu } from "../ContextMenu";

const cellPadding = {
  padding: "3px 16px",
};

export const DatabaseNode = ({
  data,
  positionAbsoluteX: posX,
  positionAbsoluteY: posY,
  width,
  selected,
  dragging,
}) => {
  const { editing } = data;

  const dispatch = useDispatch();

  function setEditingHandle() {
    dispatch(setEditing({ id: data.id }));
  }

  function sortedRows() {
    return [...data.rows].sort((a, b) => a.order - b.order);
  }

  const ref = useRef();
  const topHandleWidth = ref.current && ref.current.clientWidth;

  function rowChange(newData, type, rowId) {
    dispatch(
      changeRow({
        id: data.id,
        rowId: rowId,
        type: type,
        data: newData,
      })
    );
  }

  return (
    <TableContainer
      ref={ref}
      style={{
        overflowX: "visible",
      }}
      className={
        editing ? "db__flow-bradius-top nodrag" : "db__flow-bradius-top"
      }
      onDoubleClick={(e) => {
        e.target.focus();
        setEditingHandle();
      }}
    >
      <div
        style={{
          opacity: !dragging ? 1 : 0,
          position: "absolute",
          width: "100%",
        }}
      >
        <TopHandle
          onClick={() =>
            dispatch(
              addDiagram({
                type: "database",
                x: posX + width / 2.8,
                y: posY <= 0 ? posY - 155 : posY - 155,
              })
            )
          }
          editing={editing}
          width={topHandleWidth}
          dragging={dragging}
        />
      </div>
      {/* Menu */}
      <ContextMenu
        editing={editing}
        onSave={setEditingHandle}
        selected={selected}
        dragging={dragging}
        data={data}
      />

      <Table>
        <TableHead sx={{ backgroundColor: data.titleBackground }}>
          {/* Title */}
          <TableRow>
            <TableCell
              className="db__flow-bradius-top"
              align="center"
              colSpan={3}
              scope="row"
            >
              {!editing ? (
                <Typography color={data.titleColor} variant="h6" gutterBottom>
                  {data.title}
                </Typography>
              ) : (
                <Input
                  inputProps={{
                    style: { textAlign: "center", color: data.titleColor },
                  }}
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
        {/* HelperHeader */}
        <TableBody sx={{ backgroundColor: "#fff" }}>
          <TableRow key={"sub"}>
            <TableCell
              className="border-cell-left"
              style={{ ...cellPadding }}
              variant="footer"
            >
              <SubtitlesIcon sx={{ fontSize: 17 }} />
            </TableCell>
            <TableCell style={{ ...cellPadding }} variant="footer">
              <DataArrayIcon sx={{ fontSize: 17 }} />
            </TableCell>
            <TableCell
              className="border-cell-right"
              style={{ ...cellPadding }}
              variant="footer"
            >
              <KeyIcon sx={{ fontSize: 17 }} />
            </TableCell>
          </TableRow>
          {/* Rows */}
          {sortedRows().map((row) => (
            <TableRow key={row.id}>
              <TableCell className="border-cell-left">
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
                  {/* RowTitle */}
                  {!editing ? (
                    row.title
                  ) : (
                    <Input
                      onChange={(e) =>
                        rowChange(e.target.value, "title", row.id)
                      }
                      value={row.title}
                      sx={{ width: 70, height: 30, fontSize: 14 }}
                    />
                  )}
                </Stack>
              </TableCell>

              {/* Types */}
              <TableCell>
                {!editing ? (
                  row.type
                ) : (
                  <SelectTypes
                    value={row.type}
                    onChange={(type) => rowChange(type, "type", row.id)}
                  />
                )}
              </TableCell>
              {/* Key */}
              <TableCell className="border-cell-right">
                <Stack gap={1} direction={"row"}>
                  {!editing ? (
                    <span style={{ minWidth: editing ? 60 : 21 }}>
                      {row.key}
                    </span>
                  ) : (
                    <SelectKey
                      value={row.key}
                      required={row.key ? true : false}
                      onChange={(key) => rowChange(key, "key", row.id)}
                    />
                  )}

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
          {editing && <DatabaseNodeNewRow data={data} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
