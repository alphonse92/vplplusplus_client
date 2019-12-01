import React from 'react';
import { Flex } from '../../../lib/components/flex';
import { Card, CardContent } from '@material-ui/core';
import { VplLang } from '../../../redux/lang';
export const NoReportsComponent = () => {
  return (
    <Flex vertical width="100%">
      <Flex vertical width="100%" margin="7px">
        <Card>
          <CardContent>
            <p style={{ textAlign: 'center' }}><VplLang string="REPORT_NO_PROJECTS_TO_SHOWN" /></p>
          </CardContent>
        </Card>
      </Flex>
    </Flex>)
}