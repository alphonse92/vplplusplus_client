import React from 'react'
import { HelpLabel } from "../../constants";
export const MvAuthHelp = ({ label, onClick }) => <button className="ui fluid button" onClick={onClick}>{label || HelpLabel}</button>
