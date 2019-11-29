import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MaterialDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import { VplLang } from '../../../../../redux/lang';

export class Dialog extends React.Component {

  componentDidUpdate() {
    this.props.onRender && this.props.onRender()
  }

  render() {
    const {
      open,
      component: Component,
      ...modal
    } = this.props

    return (
      <MaterialDialog size="md" fullWidth open={open}>
        <Component {...modal} />
      </MaterialDialog>
    )
  }


}

export const Ok = (props) => {
  const { handleClose, title = "Please add the value", text: textOrComponent = "" } = props
  const closeDialog = ok => () => { handleClose({ ok }) }
  return (
    <React.Fragment>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {
          typeof textOrComponent === 'string'
            ? <DialogContentText>{textOrComponent}</DialogContentText>
            : textOrComponent
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog(true)} color="primary">Ok</Button>
      </DialogActions>
    </React.Fragment>
  )
}

export const ConfirmationDialog = (props) => {
  const { handleClose, title = "Please add the value", text = "" } = props

  const closeDialog = ok => () => { handleClose({ ok }) }
  return (
    <React.Fragment>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {typeof text === "string" ? <DialogContentText>{text}</DialogContentText> : text}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog(false)} color="primary">
          <VplLang string="CANCEL" />
        </Button>
        <Button onClick={closeDialog(true)} color="primary">
          <VplLang string="OK" />
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export const InputDialog = (props) => {
  const id = Date.now().toString()
  const {
    handleClose,
    title = "Please add the value",
    text = "",
    type = "text",
    label
  } = props

  const closeDialog = ok => () => {
    const value = document.getElementById(id).value
    handleClose({ ok, value })
  }

  return (
    <React.Fragment>
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
          <VplLang string="CANCEL" />
        </Button>
        <Button onClick={closeDialog(true)} color="primary">
          <VplLang string="OK" />
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}




