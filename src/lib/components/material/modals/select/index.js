import React from 'react';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export class SelectDialog extends React.Component {

  state = {}

  handleEntering = () => {
    if (this.radioGroupRef.current != null) {
      this.radioGroupRef.current.focus();
    }
  }

  handleCancel = () => {
    this.props.onClose({ ok: false })
  }

  handleOk = (event, value) => {
    this.props.onClose({ ok: true, value: this.state.value })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const {
      control = <Radio />,
      optionsKey = 'id',
      getLabel = opt => opt.label,
      getValue = opt => opt.value
    } = this.props

    const { options = [] } = this.props

    return (
      <Dialog size="md" fullWidth open={this.props.open}  >
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={ref => this.radioGroupRef = ref}
            aria-label="ringtone"
            name="ringtone"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <FormControlLabel
                label={getLabel(option).toString()}
                value={getValue(option).toString()}
                key={option[optionsKey]}
                control={control}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
        </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
        </Button>
        </DialogActions>
      </Dialog>
    );

  }
}