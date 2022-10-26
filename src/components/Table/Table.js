import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const StyledEditIcon = styled(EditIcon)({
  cursor: "pointer",
  "& :hover": {
    color: "gray",
  },
});

const StyledDeleteIcon = styled(Delete)({
  cursor: "pointer",
  "& :hover": {
    color: "gray",
  },
});

function CustomTable({ columns, rows, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column, idx) => {
              const { name } = column;
              return (
                <TableCell
                  key={`column-${name}-${idx.toString()}`}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {name}
                </TableCell>
              );
            })}
            <TableCell align="center">Editar</TableCell>
            <TableCell align="center">Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={`ROW-${row.id}-${idx.toString()}`}>
              {row.map((info, key) => (
                <TableCell align="center" key={`${info.content}-${key.toString()}`}>
                  {info.content}
                </TableCell>
              ))}
              <TableCell align="center">
                <StyledEditIcon onClick={() => onEdit(row)} />
              </TableCell>
              <TableCell align="center">
                <StyledDeleteIcon onClick={() => onDelete(row)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;

