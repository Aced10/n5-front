import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

import { getPermissionTypes } from "../services/PermissionTypesServices";
import {
  createPermission,
  updatePermission,
} from "../services/PermissionsServices";
import { FormControl, InputLabel } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
    display: "block",
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function PermissionsDialog(data) {
  const classes = useStyles();
  const [permissionTypes, setPermissionTypes] = useState([]);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [permissionType, setPermissionType] = useState(0);
  const [permissionDate, setPermissionDate] = useState(null);

  const createData = async () => {
    let permissionTypes = await getPermissionTypes();
    setPermissionTypes(permissionTypes.data);
  };

  const create = async () => {
    let permission = {
      employeeFirstName: firstName,
      employeeLastName: lastName,
      permissionType: permissionType,
      permissionDate: permissionDate,
    };
    await createPermission(permission);
    data.closeModal();
    data.createData();
  };

  const update = async () => {
    let permissionID = data?.permission?.PermissionID;
    let permission = {
      employeeFirstName: firstName ?? data?.permission?.EmployeeFirstName,
      employeeLastName: lastName ?? data?.permission?.EmployeeLastName,
      permissionType: permissionType ?? data?.permission?.PermissionType,
      permissionDate: permissionDate ?? data?.permission?.PermissionDate,
    };
    await updatePermission(permission, permissionID);
    data.closeModal();
    data.createData();
  };

  useEffect(() => {
    createData();
    setPermissionType(data?.permission?.PermissionType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    data.closeModal();
  };

  const permissionTypeChange = (event) => {
    setPermissionType(event.target.value);
  };

  const firstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const permissionDateChange = (event) => {
    setPermissionDate(event.target.value);
  };

  return (
    <Dialog open={data.openDialog} onClose={handleClose}>
      <DialogTitle>
        {data.createMode ? "CREAR PERMISO" : "ACTUALIZAR PERMISO"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
          onChange={firstNameChange}
          defaultValue={data?.permission?.EmployeeFirstName}
        />
        <TextField
          autoFocus
          margin="dense"
          id="lastName"
          label="Apellido"
          type="text"
          fullWidth
          variant="standard"
          onChange={lastNameChange}
          defaultValue={data?.permission?.EmployeeLastName}
        />
        <TextField
          id="date"
          label="Permission Date"
          margin="dense"
          type="date"
          fullWidth
          variant="standard"
          onChange={permissionDateChange}
          defaultValue={data?.permission?.PermissionDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl sx={{ mt: 2, width: 1 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            Permission Type
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            value={permissionType}
            onChange={permissionTypeChange}
            MenuProps={MenuProps}
            F
            input={<OutlinedInput label="Permission Type" />}
            defaultValue={data?.permission?.PermissionType}
          >
            {permissionTypes?.map((row) => (
              <MenuItem
                value={row?.permissionTypeID}
                key={row?.permissionTypeID}
              >
                {row?.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={data.createMode ? create : update}>
          {data.createMode ? "Crear" : "Actualizar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
