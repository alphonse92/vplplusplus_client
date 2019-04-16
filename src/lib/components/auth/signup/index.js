import React from 'react'
import { Button } from 'semantic-ui-react'
import { NoAccountLabel } from "../../constants";
export const MvSignUp = ({ label, onClick }) => <Button fluid onClick={onClick}>{label || NoAccountLabel}</Button>
