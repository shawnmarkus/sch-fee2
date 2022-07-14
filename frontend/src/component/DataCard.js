import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { feesMap } from "./data";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DataCard = ({ resp }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([...resp]);
  }, []);

  return (
    // <>
    <TableContainer style={{ marginTop: "50px" }} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Father Name</StyledTableCell>
            <StyledTableCell align="center">class</StyledTableCell>
            <StyledTableCell align="center">Roll no</StyledTableCell>
            <StyledTableCell align="center">year</StyledTableCell>
            <StyledTableCell align="center">months</StyledTableCell>
            <StyledTableCell align="center">fees</StyledTableCell>
            <StyledTableCell align="center">Discount</StyledTableCell>
            <StyledTableCell align="center">Dues</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">
                {row.Name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.fatherName}</StyledTableCell>
              <StyledTableCell align="center">{row.cls}</StyledTableCell>
              <StyledTableCell align="center">{row.rollNo}</StyledTableCell>
              <StyledTableCell align="center">{row.year}</StyledTableCell>
              <StyledTableCell align="center">
                {row.months.map((item, i) => (
                  <span key={i}>
                    {i > 0 && ", "}
                    <>{item}</>
                  </span>
                ))}
              </StyledTableCell>
              <StyledTableCell align="center">{row.fees}</StyledTableCell>
              <StyledTableCell align="center">{row.Discount}</StyledTableCell>
              <StyledTableCell align="center">
                {parseInt(feesMap[row.cls]) * row.months.length -
                  (parseInt(row.fees) + parseInt(row.Discount))}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // </>
  );
};

export default DataCard;
