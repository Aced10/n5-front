import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import EditIcon from "@mui/icons-material/Edit";
import { getPermissions } from "../services/PermissionsServices";
import PermissionsDialog from "../components/PermissionDialog";

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

export default function CustomizedTables() {
  const [permissions, setPermissions] = useState([]);
  const [permissionsLength, setPermissionsLength] = useState(-1);
  const [open, setOpen] = useState(false);

  const createData = async () => {
    let permissions = await getPermissions();
    setPermissions(permissions.data);
    setPermissionsLength(permissions.data.length);
  };

  const openDialog = () => {
    setOpen(true);
  };

  if (permissionsLength !== permissions.length) createData();

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Empleado</StyledTableCell>
              <StyledTableCell>Tipo Permiso</StyledTableCell>
              <StyledTableCell>Fecha</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions?.map((row) => (
              <StyledTableRow key={row.permissionID}>
                <StyledTableCell component="th" scope="row">
                  {`${row.EmployeeFirstName} ${row.EmployeeLastName}`}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.Description}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.PermissionDate}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <IconButton aria-label="delete" onClick={openDialog}>
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PermissionsDialog openDialog={open} dialogTitle="Prueba" />
      <Button variant="contained">AGREGAR PERMISO</Button>
    </>
  );
}
