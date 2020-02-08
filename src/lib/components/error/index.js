import React from 'react';
import { Ok, Dialog } from "../material/modals/input";
import { VplLang } from '../../../redux/lang';

const MESSAGE_DEFAULT = 'Unknowed error. Please contact VPL plus plus support'
const getErrorTextByType = {
  'resource not found': ({ error }) => error.message,
  'action-cant-perform': ({ error }) => error.message,
  'web': ({ error }) => error.message,
  'validation': ({ error, model }) => {
    return Object
      .keys(error)
      .reduce((acc, validationType) => {
        const list = error[validationType].map(({ field, message }) => {
          return <li key={field}>{`${message}`}</li>
        })
        const ulWrapper = <ul>{list}</ul>
        const component = (
          <div key={validationType}>
            <p><strong>Related to: </strong> {model}</p>
            {ulWrapper}
          </div>

        )
        return acc.concat([component])
      }, [])
  },
  'default': ({ message }) => message || MESSAGE_DEFAULT
}


export const DialogBroker = ({ error, handleClose, info }) => {
  if (error) return <Dialog
    component={Ok}
    open
    handleClose={handleClose}
    title={<VplLang string="ERROR_UNKNOWED" />}
    text={(getErrorTextByType[error.type] || getErrorTextByType.default)(error)} />
  if (info) return <Dialog
    component={Ok}
    title={info.title || "Atention"}
    text={info.text}
    handleClose={handleClose}
    open
  />
  return <></>
}