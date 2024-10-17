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
        borderRadius: 5,
        ...sx,
      }}
      className="db__flow-bradius-top db-node-min"
      onClick={onClick}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#1976d2" }}>
          <TableRow>
            <TableCell
              sx={{ fontSize: 10, color: "#fff" }}
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
            <TableCell className="border-cell-left" variant="footer">
              <SubtitlesIcon sx={{ fontSize: 10 }} />
            </TableCell>
            <TableCell variant="footer">
              <DataArrayIcon sx={{ fontSize: 10 }} />
            </TableCell>
            <TableCell className="border-cell-right" variant="footer">
              <KeyIcon sx={{ fontSize: 10 }} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="border-cell-left" sx={{ fontSize: 8 }}>
              name
            </TableCell>

            <TableCell sx={{ fontSize: 8 }}>type</TableCell>
            <TableCell className="border-cell-right" sx={{ fontSize: 8 }}>
              Key
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
