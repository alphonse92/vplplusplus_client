import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { ActionCreators } from './redux/actions';


import { Button } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { Flex } from '../../../lib/components/flex';
import { ProjectReportModal } from '../laboratory/project/project.report.modal';

class ReportFilterButton extends React.Component {

  state = {
    showReportModal: false
  }
  static mapStateToProps = (state) => {
    const { report: root } = state
    const { project = {} } = root
    const { filter = {} } = project
    return { filter }
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
    }
    return { DISPATCHERS }
  }

  showReportModal = () => {
    this.setState({ showReportModal: true })
  }

  onCloseReportModal = ({ ok, value }) => {

    if (ok) {
      const { project } = this.props
      const { from, to, topic: topics } = value
      const topic = topics.map(t => t.name)
      const data = { from, to, topic }
      this.props.DISPATCHERS.SET_FILTER(!!project, data)
    }
    this.setState({ showReportModal: false })
  }

  render() {
    return (
      <Flex vertical width="100%">
        <ProjectReportModal open={this.state.showReportModal} onClose={this.onCloseReportModal} />
        <Button onClick={this.showReportModal}><FilterList />Filter </Button>
      </Flex>
    )


  }
}

const connectedComponent = connect(
  ReportFilterButton.mapStateToProps,
  ReportFilterButton.mapDispatchToProps,
)(ReportFilterButton)

export {
  connectedComponent as ReportFilterButton
}