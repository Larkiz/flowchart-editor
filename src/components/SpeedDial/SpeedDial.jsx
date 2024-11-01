import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { SettingsModal } from "./SettingsModal";
import { useModalControl } from "../../utils/useModal";
export const SpeedDialCustom = () => {
  const { modalData, modalClose, modalOpen } = useModalControl();
  return (
    <>
      <SettingsModal handleClose={modalClose} open={modalData.show} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": { backgroundColor: "#0e5dab" },
          }}
          icon={<SettingsIcon />}
          color="primary"
          onClick={modalOpen}
          tooltipTitle={"Settings"}
        />
      </SpeedDial>
    </>
  );
};
