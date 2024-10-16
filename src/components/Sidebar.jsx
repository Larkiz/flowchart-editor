import { Box, Chip, Stack, Typography } from "@mui/material";
import { DatabaseNodeMin } from "./Diagrams/DatabaseNode/DatabaseNodeMin";
import { useDispatch, useSelector } from "react-redux";
import { addDiagram } from "../redux/diagramsStore";

const schemeSx = { border: "1px solid #55b0ff" };

export const Sidebar = ({ centerViewport }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.diagrams.selected);

  return (
    <Box sx={{ padding: 0.5 }} width={440}>
      <Box>
        <Typography variant="h6">Свойства</Typography>
        <Stack width={150}>
          <Chip label={"Выбрано: " + selected.length} variant="outlined" />
        </Stack>
      </Box>
      <Box>
        <Typography variant="h6">Схемы</Typography>
        <Stack direction={"row"} flexWrap={"wrap"}>
          <DatabaseNodeMin
            onClick={() =>
              dispatch(
                addDiagram({
                  type: "database",
                  x: centerViewport.x,
                  y: centerViewport.y,
                })
              )
            }
            sx={{ ...schemeSx }}
          />
        </Stack>
      </Box>
    </Box>
  );
};
