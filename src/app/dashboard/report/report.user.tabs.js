import React from 'react';
import { Typography } from '@material-ui/core';
import { UserReportTab } from './report.user.tab';
import { NoReportsComponent } from './report.nosubmissions'

export const UserReportTabs = (props) => {
  const { report } = props
  return (
    <React.Fragment>
      {!!report.length && <Typography variant="h5" gutterBottom>Student Reports</Typography>}
      {!report.length && <NoReportsComponent />}
      {report.map(r => <UserReportTab key={r._id} report={r} showUserReport={this.props.showUserReport} />)}
    </React.Fragment>
  )

}