import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { TextField, Select, MenuItem, FormControlLabel, Switch } from '@material-ui/core';
import { Flex } from "../../../../lib/components/flex";
import { ActionCreators } from './redux/actions';
import { Typeahead } from '../../../../lib/components/material/form/typeahead';

export class ProjectReportModalClass extends React.Component {


  static mapStateToProps = (state) => {
    const { projects } = state
    const { topics } = projects
    return { topics: topics.list.pagination.docs }
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
    }
    return { DISPATCHERS }
  }

  static Date = {
    type: {
      semestre: 'semestre',
      custom: 'custom',
    }
  }

  state = {
    typeDateSelect: ProjectReportModalClass.Date.type.semestre,
    form: {
      semestre: 1,
    }
  }

  componentDidMount() {
    this.props.DISPATCHERS.GET_TOPICS()
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleModalResponse = (isOk) => () => {
    this.props.onClose && this.props.onClose({ ok: isOk, value: this.state.form })
  }

  handleToggleDatePicker = (event) => {

    const typeDateSelect = event.target.checked
      ? ProjectReportModalClass.Date.type.semestre
      : ProjectReportModalClass.Date.type.custom

    this.setState({ typeDateSelect })
  }

  selectSemestre = (event) => {
    const { target } = event
    const { value } = target
    const newForm = { ...this.state.form }
    newForm.semestre = value
    this.setState({ form: newForm })

  }

  selectSemestreYear = (event) => {
    const { target } = event
    const { value } = target
    const newForm = { ...this.state.form }
    newForm.currentYear = +value
    this.setState({ form: newForm })
  }

  isSelectingBySemestre = () => ProjectReportModalClass.Date.type.semestre === this.state.typeDateSelect

  getDateComponent = (showSemestre) => {
    const momentNow = moment()
    const currentYear = this.state.form.currentYear
      ? this.state.form.currentYear
      : momentNow.get('year')

    if (showSemestre) return (

      <React.Fragment>
        <Flex vertical >
          <Select value={this.state.form.semestre} onChange={this.selectSemestre}>
            <MenuItem value={1}>First</MenuItem>
            <MenuItem value={2}>Second</MenuItem>
          </Select>
          <TextField
            label="Year"
            value={currentYear}
            onChange={this.selectSemestreYear}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </Flex>
      </React.Fragment>

    )

    return (
      <React.Fragment>
        <TextField
          label="From"
          type="date"
          defaultValue={"2017-05-24"}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={console.log}
        />
      </React.Fragment>

    )
  }

  extractOptionsFromTopics = ({ _id: value, name, description: label }) => {
    return { value, label }
  }

  render() {
    const showSemestreDatePicker = this.isSelectingBySemestre()
    const { topics = [] } = this.props
    const topicOptions = topics.map(this.extractOptionsFromTopics)

    console.log(this.props, topics, topicOptions)
    const DateComponent = () => {
      return (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={this.isSelectingBySemestre()}
                onChange={this.handleToggleDatePicker}
                value="checkedB"
                color="primary"
              />
            }
            label="Primary"
          />
          {this.getDateComponent(showSemestreDatePicker)}
        </>
      )
    }

    return (
      <Dialog size="md" fullWidth open={this.props.open} >
        <DialogTitle>Create project report</DialogTitle>
        <DialogContent>
          <Flex width='100%' vertical>
            <DateComponent />
            <Typeahead
              id='topics'
              onChange={this.onChangeTopic}
              options={topicOptions}
              defaultValue={this.selectedTopics}
              name='topics'
              isDisabled={this.state.readOnly}
              placeholder="Select topic"
              portal={false}
            />
          </Flex>
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

const ConnectedComponent = connect(
  ProjectReportModalClass.mapStateToProps,
  ProjectReportModalClass.mapDispatchToProps
)(ProjectReportModalClass)

export const ProjectReportModal = props => <ConnectedComponent {...props} />