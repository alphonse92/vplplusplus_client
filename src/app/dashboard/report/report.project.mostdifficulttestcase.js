import React from 'react';
import {
  Paper
  , ListItem
  , ListItemIcon
  , ListItemText
  , Collapse
  , Table
  , TableBody
  , TableHead
  , TableRow
  , TableCell
} from '@material-ui/core';

import {
  ExpandLess as ExpandLessIcon
  , ExpandMore as ExpandMoreIcon,
  TrendingDown
} from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';

class MostDifficultTestCardNoStyled extends React.Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  // shouldComponentUpdate(prevprops, prevstate) {
  //   return this.state.isOpen !== prevstate.isOpen
  // }


  render() {
    const { data, classes } = this.props
    const { isOpen } = this.state
    return (
      <Paper style={{ marginBottom: '13px', borderTop: '7px solid', width: '100%' }} >
        <ListItem button onClick={this.toggle}>
          <ListItemIcon>
            <TrendingDown />
          </ListItemIcon>
          <ListItemText
            inset
            primary="Test Cases difficult"
            secondary="These test cases required most effort to be solved" />
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse style={{ root: { padding: '0px' } }} in={isOpen} timeout="auto" unmountOnExit>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Test</TableCell>
                <TableCell >Objective</TableCell>
                <TableCell >Failted attemps</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((testCase) => {
                const { _id, name, objective, summaries_not_approved } = testCase
                return (
                  <React.Fragment key={_id} >
                    {summaries_not_approved > 0 && <TableRow className={classes.tr}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{objective}</TableCell>
                      <TableCell>{summaries_not_approved}</TableCell>
                    </TableRow>}

                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
        </Collapse>
      </ Paper>
    )
  }

}

const tableStyles = theme => ({
  tr: {
    '&:hover': {
      backgroundColor: 'transparent !important'
    }
  }
});

export const MostDifficultTestCard = withStyles(tableStyles)(MostDifficultTestCardNoStyled)