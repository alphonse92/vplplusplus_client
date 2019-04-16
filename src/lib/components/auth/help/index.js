import React from 'react'
import { Button } from 'semantic-ui-react'
import { HelpLabel } from "../../constants";
export const MvAuthHelp = ({ label, onClick }) => <Button fluid onClick={onClick}>{label || HelpLabel}</Button>
