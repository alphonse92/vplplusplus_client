import React from 'react';
import { Ok, Dialog } from "../material/modals/input";


const getErrorTextByType = {
  'resource not found': ({ error }) => error.message,
  'action-cant-perform': ({ error }) => error.message,
  'web': ({ error }) => error.message,
  'validation': ({ error, model }) => {
    return Object
      .keys(error)
      .reduce((acc, validationType) => {
        const list = error[validationType].map(({ field }) => <li key={field}>{field}</li>)
        const ulWrapper = <ul>{list}</ul>
        const component = (
          <div key={validationType}>
            <p><strong>Related to: </strong> {model}</p>
            <p><strong>{validationType}</strong></p>
            {ulWrapper}
          </div>

        )
        return acc.concat([component])
      }, [])
  },
  'default': () => 'Unknowed error. Please contact VPL plus plus support'
}


export const DialogBroker = ({ error, handleClose }) => {
  if (error) return <Dialog
    component={Ok}
    open={!!error}
    handleClose={handleClose}
    title={'Something Happened'}
    text={(getErrorTextByType[error.type] || getErrorTextByType.default)(error)} />

  return <></>
}