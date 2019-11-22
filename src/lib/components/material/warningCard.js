import React from 'react'
import { Paper, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { yellow } from '@material-ui/core/colors'
import { Warning } from '@material-ui/icons'

export const WarningCard = ({ show, title, message }) => {

  return show
    ? (
      <Paper style={{ margin: '7px', background: yellow[700], width: '100%' }} >
        <ListItem >
          <ListItemIcon>
            <Warning />
          </ListItemIcon>
          <ListItemText
            inset
            primary={title}
            secondary={message} />
        </ListItem>
      </ Paper>
    )
    : <></>
}