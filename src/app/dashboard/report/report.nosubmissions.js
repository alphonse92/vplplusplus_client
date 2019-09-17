import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { Card, CardContent } from '@material-ui/core';
export const NoReportsComponent = () => {
  return (
    <Flex vertical width="100%">
      <Flex vertical width="100%" margin="7px">
        <Card>
          <CardContent>
            <p style={{ textAlign: 'center' }}>Project has not reports. It is be caused because no students has submitted subbmisions yet.</p>
          </CardContent>
        </Card>
      </Flex>
    </Flex>)
}