import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';
import { Typography } from '@material-ui/core';
import { UserReportTab } from './report.user.tab';
import { NoReportsComponent } from './report.nosubmissions'

class UserReportTabs extends React.Component {

  static mapStateToProps = (state) => {
    const { report: root } = state
    const { project = {} } = root
    const { report = [] } = project
    return { report }
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
      ...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
    }
    return { DISPATCHERS }
  }

  loadProject() {
    const { project_id } = this.props
    return this.props.DISPATCHERS.GET_PROJECT_REPORT({ id: project_id })
  }

  componentDidMount() {
    this.loadProject()
  }


  render() {
    const { report } = this.props
    return (
      <React.Fragment>
        {!!report.length && <Typography variant="h5" gutterBottom>Student Reports</Typography>}
        {!report.length && <NoReportsComponent />}
        {report.map(r => <UserReportTab key={r._id} report={r} showUserReport={this.props.showUserReport} />)}
      </React.Fragment>
    )
  }

}

const ConnectedUserReportTabs = connect(
  UserReportTabs.mapStateToProps,
  UserReportTabs.mapDispatchToProps,
)(UserReportTabs)

export { ConnectedUserReportTabs as UserReportTabs }