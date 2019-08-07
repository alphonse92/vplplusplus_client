import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

export const InputDialog = (props) => {
  const id = Date.now().toString()
  const {
    open,
    handleClose,
    title = "Please add the value",
    text = "",
    type = "text",
    label
  } = props

  const closeDialog = isOk => () => {
    const value = document.getElementById(id).value
    const ok = !!value && value.length && isOk
    handleClose({ ok, value })
  }

  return (
    <Dialog
      size="md"
      fullWidth
      open={open}
      onClose={closeDialog}
      aria-labelledby={label}>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        <TextField
          autoFocus
          id={id}
          label={label}
          type={type}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={closeDialog(true)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}




