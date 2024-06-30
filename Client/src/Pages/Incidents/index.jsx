import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StatusLabel } from "../../Components/Label/";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover, 
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(1)': {
    backgroundColor: theme.palette.action.hover, 
  },
  '&:nth-of-type(n+1)': {
    backgroundColor: theme.palette.common.white, 
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(<StatusLabel status="Down" customStyles={{ backgroundColor: '#fff9f9', borderColor: '#ffcac6', color: '#344054' }} />, '2024-03-14 21:41:09', 'HTTP 350 - NOK'),
  createData(<StatusLabel status="Down" customStyles={{ backgroundColor: '#fff9f9', borderColor: '#ffcac6', color: '#344054' }} />, '2024-03-14 21:41:09', 'timeout of 48000ms exceeded'),
  createData(<StatusLabel status="Cannot resolve" customStyles={{ backgroundColor: '#f2f4f7', borderColor: '#d2d6de', color: '#344054' }} />, '2024-03-14 21:41:09', 'timeout of 48000ms exceeded'),
  createData(<StatusLabel status="Cannot resolve" customStyles={{ backgroundColor: '#f2f4f7', borderColor: '#d2d6de', color: '#344054' }} />, '2024-03-14 21:41:09', 'timeout of 48000ms exceeded'),
  createData(<StatusLabel status="Down" customStyles={{ backgroundColor: '#fff9f9', borderColor: '#ffcac6', color: '#344054' }} />, '2024-03-14 21:41:09', 'HTTP 350 - NOK'),
];


export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="right">Date & Time</StyledTableCell>
            <StyledTableCell align="right">Message</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
