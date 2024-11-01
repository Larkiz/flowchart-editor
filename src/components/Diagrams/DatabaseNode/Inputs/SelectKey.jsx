import { MenuItem, Select } from "@mui/material";

export const SelectKey = ({ value, onChange, required = false }) => {
  return (
    <Select
      value={value}
      sx={{ height: 30, width: 60, fontSize: 10 }}
      onChange={(e) => onChange(e.target.value)}
    >
      {!required && <MenuItem value={""}>...</MenuItem>}
      <MenuItem value="FK">FK</MenuItem>
      <MenuItem value="PK">PK</MenuItem>
    </Select>
  );
};
