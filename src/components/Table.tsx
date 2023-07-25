import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import React from 'react';

// Styling the TableCell with custom styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Styling the TableRow with custom styles
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// CustomizedTableCell: Interface for defining table cell data
interface CustomizedTableCell {
  key: string;
  label: string;
}

// CustomizedTableProps: Props for the CustomizedTable component
interface CustomizedTableProps {
  data: any[];
  tableCells: CustomizedTableCell[];
}

// CustomizedTable: Custom table component with custom styling for TableCells and TableRows
const CustomizedTable: React.FC<CustomizedTableProps> = ({ data, tableCells }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableCells.map(cell =>
              <StyledTableCell key={cell.key}>{cell.label}</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              {tableCells.map(cell =>
                <StyledTableCell key={cell.key}>{row[cell.key]}</StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTable;
