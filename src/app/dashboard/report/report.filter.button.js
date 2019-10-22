import React from 'react';
import { connect } from 'react-redux'

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

  static mapDispatchToProps = () => ({})

  showReportModal = () => {
    this.setState({ showReportModal: true })
  }

  onCloseReportModal = (data) => {
    this.props.onClose && this.props.onClose(data)
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