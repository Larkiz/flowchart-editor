import KeyIcon from "@mui/icons-material/Key";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import DataArrayIcon from "@mui/icons-material/DataArray";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const DatabaseNodeMin = ({ sx, onClick }) => {
  return (
    <TableContainer
      sx={{
        backgroundColor: "#fff",
        width: 149,
        ...sx,
      }}
      onClick={onClick}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#b0c1ff" }}>
          <TableRow>
            <TableCell
              sx={{ fontSize: 10 }}
              align="center"
              colSpan={3}
              scope="row"
            >
              Title
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ border: "1px solid #e9e9e9" }}>
          <TableRow key={"sub"}>
            <TableCell variant="footer">
              <SubtitlesIcon sx={{ fontSize: 10 }} />
            </TableCell>
            <TableCell variant="footer">
              <DataArrayIcon sx={{ fontSize: 10 }} />
            </TableCell>
            <TableCell variant="footer">
              <KeyIcon sx={{ fontSize: 10 }} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ fontSize: 8 }}>name</TableCell>

            <TableCell sx={{ fontSize: 8 }}>type</TableCell>
            <TableCell sx={{ fontSize: 8 }}>Key</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
