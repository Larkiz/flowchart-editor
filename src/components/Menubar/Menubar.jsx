import { AppBar, Chip, Divider, ListItem, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { NewFlowPopover } from "./NewFlowPopover";
import { BasicMenu } from "./ExportImport";

import { EdgeTypePopover } from "./EdgeTypePopover";
import { useTranslation } from "react-i18next";

export const Menubar = ({ centerViewport }) => {
  const selected = useSelector((state) => state.diagrams.selected);
  const { t } = useTranslation();

  return (
    <AppBar className="menubar">
      <Stack elevation={2} direction={"row"}>
        <ListItem>
          <Chip color="primary" label={t("selected") + selected.length} />
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem>
          <NewFlowPopover centerViewport={centerViewport} />
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem>
          <EdgeTypePopover />
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem>
          <BasicMenu />
        </ListItem>
      </Stack>
    </AppBar>
  );
};
