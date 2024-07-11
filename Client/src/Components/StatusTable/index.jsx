import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

/**
 * Creates a styled TableCell component.
 * @param {object} theme - The theme object.
 * @returns {JSX.Element} The styled TableCell component.
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/**
 * Creates a styled TableRow component.
 * @param {object} theme - The theme object.
 * @returns {JSX.Element} The styled TableRow component.
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.common.white,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

/**
 * Customized table component displaying incident history.
 * @param {object} props - The props object.
 * @param {array} props.data - The array of data objects containing name, date, and message.
 * @returns {JSX.Element} The JSX element representing the customized table.
 */
export default function StatusTable({ data }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: theme.spacing(4),
        marginX: 'auto',
        width: '80%',
        paddingX: theme.spacing(6),
        [theme.breakpoints.down('md')]: {
          width: '100%',
        },
      }}
    >
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
            {data.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">{row.message}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

StatusTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.node.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
};
