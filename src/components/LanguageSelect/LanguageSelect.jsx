import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

export const LanguageSelect = () => {
  const { i18n, t } = useTranslation();
  const onChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Box>
      <InputLabel id="demo-simple-select-label">{t("language")}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={i18n.language}
        label={t("language")}
        onChange={onChange}
      >
        <MenuItem value={"en"}>English</MenuItem>
        <MenuItem value={"ru"}>Русский</MenuItem>
      </Select>
    </Box>
  );
};
