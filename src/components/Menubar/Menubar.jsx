import { AppBar, Chip, Divider, ListItem, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { NewFlowPopover } from "./NewFlowPopover";
import { BasicMenu } from "./ExportImport";

export const Menubar = ({ centerViewport }) => {
  const selected = useSelector((state) => state.diagrams.selected);

  return (
    <AppBar className="menubar">
      <Stack elevation={2} direction={"row"}>
        <ListItem>
          <Chip color="primary" label={"Выбрано: " + selected.length} />
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem>
          <NewFlowPopover centerViewport={centerViewport} />
        </ListItem>
        <Divider orientation="vertical" flexItem />
        <ListItem>
          <BasicMenu />
        </ListItem>
      </Stack>
    </AppBar>
  );
};
