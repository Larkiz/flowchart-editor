import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}
export const SettingsModal = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <Stack direction={"row"}>
          <Box flexGrow={1} sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={t("language")} />
            </Tabs>
          </Box>
          <Button sx={{ alignItems: "flex-start" }} onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <CustomTabPanel value={value} index={0}>
          <LanguageSelect />
        </CustomTabPanel>
      </DialogContent>
    </Dialog>
  );
};
