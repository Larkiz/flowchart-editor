import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Button, ListItemIcon, Menu, MenuItem, styled } from "@mui/material";
import { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { importDataJson } from "../../redux/diagramsStore";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const nodes = useSelector((state) => state.diagrams.nodes);
  const edges = useSelector((state) => state.diagrams.edges);

  const dispatch = useDispatch();

  function exportData() {
    const url = window.URL.createObjectURL(
      new Blob([JSON.stringify({ nodes, edges })])
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `flowchart.json`);

    document.body.appendChild(link);

    link.click();

    link.parentNode.removeChild(link);
    handleClose();
  }

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          dispatch(importDataJson(data));
          handleClose();
        } catch (error) {
          console.error("Ошибка парсинга JSON:", error);
        }
      };
    }
  };
  return (
    <div>
      <Button id="basic-button" onClick={handleClick} variant="contained">
        <ImportExportIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component="label">
          <ListItemIcon>
            <FileUploadIcon />
          </ListItemIcon>
          Импорт
          <VisuallyHiddenInput
            type="file"
            accept=".json"
            onChange={importData}
          />
        </MenuItem>

        <MenuItem onClick={exportData}>
          <ListItemIcon>
            <FileDownloadIcon />
          </ListItemIcon>
          Экспорт
        </MenuItem>
      </Menu>
    </div>
  );
}
