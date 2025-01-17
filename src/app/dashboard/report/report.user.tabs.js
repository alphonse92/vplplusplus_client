import React from 'react';
import { Typography } from '@material-ui/core';
import { UserReportTab } from './report.user.tab';
import { NoReportsComponent } from './report.nosubmissions'
import { VplLang } from '../../../redux/lang';

export const UserReportTabs = (props) => {
  const { report, showUserReport } = props
  const shouldShow = {
    nodata: report.length === 0,
    title: report.length > 0,
    data: report.length > 0,
  }
  return (
    <React.Fragment>
      {shouldShow.title && <Typography variant="h5" gutterBottom> <VplLang string="REPORT_STUDENT_REPORTS_TITLE" /> </Typography>}
      {shouldShow.nodata && <NoReportsComponent />}
      {report.map(r => <UserReportTab key={r._id} report={r} showUserReport={showUserReport} />)}
    </React.Fragment>
  )

}