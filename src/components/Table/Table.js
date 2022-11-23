import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useState } from "react";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, idx) => (
            <TableRow key={`ROW-${row.id}-${idx.toString()}`}>
              {row.map((info, key) => (
                <TableCell
                  align="center"
                  key={`${info.content}-${key.toString()}`}
                >
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
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Clientes por página',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;

