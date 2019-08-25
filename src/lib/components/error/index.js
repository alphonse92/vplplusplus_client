import React from 'react';
import { Ok, Dialog } from "../material/modals/input";


const getErrorTextByType = {
  'resource not found': ({ message }) => message
}


export const DialogBroker = ({ error, handleClose }) => {
  if (error) return <Dialog component={Ok} handleClose={handleClose} title={'Something Happened'} text={getErrorTextByType[error.type](error)} />

  return <></>
}