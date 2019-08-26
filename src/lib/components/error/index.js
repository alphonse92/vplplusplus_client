import React from 'react';
import { Ok, Dialog } from "../material/modals/input";


const getErrorTextByType = {
  'resource not found': ({ error }) => error.message,
  'action-cant-perform': ({ error }) => error.message,
  'validation': ({ error }) => {
    return Object
      .keys(error)
      .reduce((acc, validationType) => {
        const list = error[validationType].map(({ field }) => <li key={field}>{field}</li>)
        const ulWrapper = <ul>{list}</ul>
        const component = (
          <div key={validationType}>
            <p><strong>{validationType}</strong></p>
            {ulWrapper}
          </div>

        )
        return acc.concat([component])
      }, [])
  }
}


export const DialogBroker = ({ error, handleClose }) => {
  if (error) return <Dialog component={Ok} open={!!error} handleClose={handleClose} title={'Something Happened'} text={getErrorTextByType[error.type](error)} />

  return <></>
}