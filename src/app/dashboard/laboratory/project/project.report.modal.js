import React from 'react';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

export class ProjectReportModal extends React.Component {

  state = { form: {} }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleModalResponse = (isOk) => () => {
    this.props.onClose && this.props.onClose({ ok: isOk, value: this.state.form })
  }


  render() {
    return (
      <Dialog size="md" fullWidth open={this.props.open}  >
        <DialogTitle>Create project report</DialogTitle>
        <DialogContent>
          <p>aswedasdasd</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleModalResponse(false)} color="primary">
            Cancel
        </Button>
          <Button onClick={this.handleModalResponse(true)} color="primary">
            Ok
        </Button>
        </DialogActions>
      </Dialog>
    );

  }
}