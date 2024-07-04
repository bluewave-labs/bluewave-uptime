import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StatusLabel } from "../../Components/Label/";

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
 * Creates a data object for the table row.
 * @param {JSX.Element} name - The status label JSX element.
 * @param {string} date - The date and time string.
 * @param {string} message - The message string.
 * @returns {object} The data object containing name, date, and message.
 */
function createData(name, date, message) {
  return { name, date, message };
}

/**
 * Customized table component displaying incident history.
 * @returns {JSX.Element} The JSX element representing the customized table.
 */
export default function CustomizedTables() {
  const theme = useTheme();

  const rows = [
    createData(<StatusLabel status="Down" customStyles={{ backgroundColor: '#fff9f9', borderColor: '#ffcac6', color: '#344054' }} />, '2024-03-14 21:41:09', 'HTTP 350 - NOK'),
    createData(<StatusLabel status="Down" customStyles={{ backgroundColor: '#fff9f9', borderColor: '#ffcac6', color: '#344054' }} />, '2024-03-14 21:41:09', 'timeout of 48000ms exceeded'),
    createData(<StatusLabel status="Cannot resolve" customStyles={{ backgroundColor: '#f2f4f7', borderColor: '#d2d6de', color: '#344054' }} />, '2024-03-14 21:41:09', 'timeout of 48000ms exceeded'),
    createData(<StatusLabel status="Cannot resolve" customStyles={{ backgroundColor: '#f2f4f7', borderColor: '#d2d6de', color: '#344054' }} />, '2024-03-14 21:41:09', 'timeout of 48000ms exceeded'),
    createData(<StatusLabel status="Down" customStyles={{ backgroundColor: '#fff9f9', borderColor: '#ffcac6', color: '#344054' }} />, '2024-03-14 21:41:09', 'HTTP 350 - NOK'),
  ];

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
      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: theme.spacing(4) }}>
        {[...Array(4)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: '223.35px',
              height: '87px',
              borderRadius: '4px',
              border: '1px solid',
              borderColor: '#EAECF0',
              padding: theme.spacing(1),
              textAlign: 'left',
              boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
              backdropFilter: 'blur(2px)',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#1570EF',
                marginBottom: theme.spacing(1),
              }}
            >
              Currently up for
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 600,
                fontSize: '13px',
                lineHeight: '20px',
                color: '#344054',
              }}
            >
              4h 30m 2s
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing(2) }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: 16 }}>
          History
        </Typography>
      </Box>
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
