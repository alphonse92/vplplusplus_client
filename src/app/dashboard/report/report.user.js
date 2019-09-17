import React from 'react';
export const UserReport = (props) => {
  const { report } = props
  return (
    <p>{report.firstname}</p>
  )
}