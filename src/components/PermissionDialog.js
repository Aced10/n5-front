import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function PermissionsDialog(data) {
  const [open, setOpen] = useState(true);
  const [permissionType, setPermissionType] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setPermissionType(event.target.value);
  };

  return (
    <Dialog open={data.openDialog && open} onClose={handleClose}>
      <DialogTitle>dialogTitle</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="lastName"
          label="Apellido"
          type="text"
          fullWidth
          variant="standard"
        />
        <Select
          id="permission-type"
          value={permissionType}
          onChange={handleChange}
          label="Tipo de Permiso"
        >
          <MenuItem value={permissionType}>Ten</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
