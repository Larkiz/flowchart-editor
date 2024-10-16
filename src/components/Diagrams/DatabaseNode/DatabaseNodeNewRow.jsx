import {
  Button,
  Input,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewRow } from "../../../redux/diagramsStore";
import { mostUsedDataType, numberDataType, stringDataType } from "./options";

const MenuItemCustom = (props) => {
  const { children, ...rest } = props;

  return (
    <MenuItem sx={{ paddingLeft: 3 }} {...rest}>
      {children}
    </MenuItem>
  );
};

const renderDynamicItemCustom = ({ onChange, label, inputValue, ...props }) => {
  return (
    <MenuItemCustom {...props}>
      {label}(
      <Input
        inputProps={{ "aria-label": "Without label" }}
        sx={{ width: 20, height: 10 }}
        onChange={onChange}
        value={inputValue}
        onClick={(e) => e.stopPropagation()}
      />
      )
    </MenuItemCustom>
  );
};

export const DatabaseNodeNewRow = ({ data, setEditingHandle }) => {
  const [newRow, setNewRow] = useState({ title: "", key: "", type: "" });
  function newRowHandle(data) {
    setNewRow({ ...newRow, ...data });
  }
  const dispatch = useDispatch();

  const [dynamicSelectInput, setSelectInput] = useState({
    varchar: "",
    char: "",
  });

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
          <Select
            value={newRow.type}
            sx={{ height: 30 }}
            onChange={(e) => newRowHandle({ type: e.target.value })}
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={{ style: { maxHeight: 400 } }}
          >
            <ListSubheader>Частые</ListSubheader>
            {renderDynamicItemCustom({
              label: "varchar",
              value: "varchar(" + dynamicSelectInput.varchar + ")",
              inputValue: dynamicSelectInput.varchar,
              onChange: (e) => {
                setSelectInput({
                  ...dynamicSelectInput,
                  varchar: e.target.value,
                });
                newRow.type &&
                  newRowHandle({
                    type: "varchar(" + e.target.value + ")",
                  });
              },
            })}

            {mostUsedDataType.map((dt, key) => (
              <MenuItemCustom key={key} value={dt}>
                {dt}
              </MenuItemCustom>
            ))}
            <ListSubheader>Числовые</ListSubheader>
            {numberDataType.map((dt, key) => (
              <MenuItemCustom key={key} value={dt}>
                {dt}
              </MenuItemCustom>
            ))}
            <ListSubheader>Строковые</ListSubheader>
            {renderDynamicItemCustom({
              label: "char",
              value: "char(" + dynamicSelectInput.char + ")",
              inputValue: dynamicSelectInput.char,
              onChange: (e) => {
                setSelectInput({
                  ...dynamicSelectInput,
                  char: e.target.value,
                });
                newRow.type &&
                  newRowHandle({
                    type: "char(" + e.target.value + ")",
                  });
              },
            })}

            {stringDataType.map((dt, key) => (
              <MenuItemCustom key={key} value={dt}>
                {dt}
              </MenuItemCustom>
            ))}
          </Select>
        </TableCell>
        {/* newKey */}
        <TableCell>
          <Stack gap={1} alignItems={"center"} direction={"row"}>
            <Select
              value={newRow.key}
              sx={{ height: 30, width: 60, fontSize: 10 }}
              onChange={(e) => newRowHandle({ key: e.target.value })}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={""}>Без ключа</MenuItem>
              <MenuItem value="FK">FK</MenuItem>
              <MenuItem value="PK">PK</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={() =>
                newRow.title &&
                newRow.type &&
                dispatch(addNewRow({ id: data.id, row: newRow }))
              }
              sx={{ minWidth: 5, padding: 1 }}
            >
              <AddIcon sx={{ fontSize: 13 }} />
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3}>
          <Button variant="contained" onClick={setEditingHandle} fullWidth>
            Сохранить
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};
