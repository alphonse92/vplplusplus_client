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
  constructor(props) {
    super(props)
    const currentMoment = moment()
    const currentYear = currentMoment.get('year')
    const startOfFirstSemestre = moment(`${currentYear}-01-01`, 'YYYY-MM-DD')
    const endOfFirstSemestre = moment(`${currentYear}-06-30`, 'YYYY-MM-DD')
    const isFirstSemestre =
      currentMoment.isSameOrAfter(startOfFirstSemestre)
      && currentMoment.isSameOrBefore(endOfFirstSemestre)
    const semestre = isFirstSemestre ? 1 : 2
    this.state = {
      typeDateSelect: ProjectReportModalClass.Date.type.semestre,
      form: { semestre, currentYear, }
    }
  }


  componentDidMount() {
    this.props.DISPATCHERS.GET_TOPICS()
  }

  getSemestre = (nSem, year) => {
    if (nSem === 1) return {
      from: `${year}-01-01`,
      to: `${year}-06-30`
    }
    return {
      from: `${year}-07-1`,
      to: `${year}-12-31`
    }
  }

  getForm = () => {

    const selectBySem = this.isSelectingBySemestre()
    const { topics = [] } = this.props
    const selectedTopics = this.selectedTopics || []
    const formValue = {
      ...this.state.form,
      topics: selectedTopics.map(({ index }) => topics[index])
    }

    if (selectBySem) {
      const { from, to } = this.getSemestre(formValue.semestre, formValue.currentYear)
      formValue.from = from
      formValue.to = to
    }

    return formValue

  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleModalResponse = (isOk) => () => {
    this.props.onClose && this.props.onClose({ ok: isOk, value: this.getForm() })
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

  setDate = (attribute) => (event) => {
    const { target } = event
    const { value } = target
    this.setState({ form: { ...this.state.form, [attribute]: value } })
  }

  isSelectingBySemestre = () => ProjectReportModalClass.Date.type.semestre === this.state.typeDateSelect

  getDateComponent = (showSemestre) => {
    const momentNow = moment()
    const currentYear = this.state.form.currentYear

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
          defaultValue={this.state.form.from || momentNow.format('YYYY-MM-DD')}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.setDate('from')}
        />
        <TextField
          label="From"
          type="date"
          defaultValue={this.state.form.to || momentNow.format('YYYY-MM-DD')}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.setDate('to')}
        />
      </React.Fragment>

    )
  }

  onChangeTopic = selectedTopics => {
    this.selectedTopics = selectedTopics
  }

  extractOptionsFromTopics = ({ _id: value, name, description: label }, index) => {
    return { value, label, index }
  }

  render() {
    const showSemestreDatePicker = this.isSelectingBySemestre()
    const { topics = [] } = this.props
    const topicOptions = topics.map(this.extractOptionsFromTopics)
    const bySem = this.isSelectingBySemestre()
    const DateComponent = () => {
      return (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={bySem}
                onChange={this.handleToggleDatePicker}
                value="checkedB"
                color="primary"
              />
            }
            label={bySem ? 'Filter by Semestre' : 'Custom range dates'}
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