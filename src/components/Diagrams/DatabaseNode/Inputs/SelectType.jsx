import { Input, ListSubheader, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import {
  arraysDataType,
  dateDataType,
  mostUsedDataType,
  numberDataType,
  otherDataType,
  stringDataType,
} from "./options";
import { useTranslation } from "react-i18next";
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
export const SelectTypes = ({ value, onChange }) => {
  const [dynamicSelectInput, setSelectInput] = useState({
    varchar: "",
    char: "",
  });

  useEffect(() => {
    const isDynamic = value.includes("char");
    if (isDynamic) {
      const [type, int] = value.split(/[()]/);
      let tst = { ...dynamicSelectInput };
      tst[type] = int;

      setSelectInput(tst);
    }
  }, []);
  const { t } = useTranslation();
  return (
    <Select
      value={value}
      sx={{ height: 30, width: "100%" }}
      onChange={(e) => onChange(e.target.value)}
      inputProps={{ "aria-label": "Without label" }}
      MenuProps={{ style: { maxHeight: 400 } }}
    >
      <ListSubheader>{t("mostUsedType")}</ListSubheader>
      {renderDynamicItemCustom({
        label: "varchar",
        value: "varchar(" + dynamicSelectInput.varchar + ")",
        inputValue: dynamicSelectInput.varchar,
        onChange: (e) => {
          setSelectInput({
            ...dynamicSelectInput,
            varchar: e.target.value,
          });
          value && onChange("varchar(" + e.target.value + ")");
        },
      })}

      {mostUsedDataType.map((dt, key) => (
        <MenuItemCustom key={key} value={dt}>
          {dt}
        </MenuItemCustom>
      ))}
      <ListSubheader>{t("numericType")}</ListSubheader>
      {numberDataType.map((dt, key) => (
        <MenuItemCustom key={key} value={dt}>
          {dt}
        </MenuItemCustom>
      ))}
      <ListSubheader>{t("dateAndTimeType")}</ListSubheader>
      {dateDataType.map((dt, key) => (
        <MenuItemCustom key={key} value={dt}>
          {dt}
        </MenuItemCustom>
      ))}
      <ListSubheader>{t("stringType")}</ListSubheader>
      {renderDynamicItemCustom({
        label: "char",
        value: "char(" + dynamicSelectInput.char + ")",
        inputValue: dynamicSelectInput.char,
        onChange: (e) => {
          setSelectInput({
            ...dynamicSelectInput,
            char: e.target.value,
          });
          value && onChange("char(" + e.target.value + ")");
        },
      })}

      {stringDataType.map((dt, key) => (
        <MenuItemCustom key={key} value={dt}>
          {dt}
        </MenuItemCustom>
      ))}
      <ListSubheader>{t("arraysType")}</ListSubheader>
      {arraysDataType.map((dt, key) => (
        <MenuItemCustom key={key} value={dt}>
          {dt}
        </MenuItemCustom>
      ))}
      <ListSubheader>{t("otherType")}</ListSubheader>
      {otherDataType.map((dt, key) => (
        <MenuItemCustom key={key} value={dt}>
          {dt}
        </MenuItemCustom>
      ))}
    </Select>
  );
};
