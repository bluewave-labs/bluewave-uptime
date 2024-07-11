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
 * @param {array} props.data - The array of data objects containing JSX elements for name, and strings for date and message.
 * @param {array} props.columns - The array of column headers and alignments.
 * @returns {JSX.Element} The JSX element representing the customized table.
 */
export default function StatusTable({ data, columns }) {
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
              {columns.map((column, index) => (
                <StyledTableCell key={index} align={column.align || 'left'}>
                  {column.header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <StyledTableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <StyledTableCell key={colIndex} align={column.align || 'left'}>
                    {column.id === 'name' ? (
                      <div style={row.name.props.customStyles}>
                        {row.name}
                      </div>
                    ) : (
                      row[column.id]
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

StatusTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      header: PropTypes.node.isRequired,
      align: PropTypes.oneOf(['left', 'right', 'center']),
    })
  ).isRequired,
};
