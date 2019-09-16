import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { Card, CardHeader } from '@material-ui/core';
export const ReportHeader = (props) => {
  const { title = "no title" } = props
  return (
    <Flex vertical width="100%">
      <Flex vertical width="100%" margin="7px">
        <Card>
          <CardHeader title={title} subheader={<p>header</p>} />
        </Card>
      </Flex>
    </Flex>)
}