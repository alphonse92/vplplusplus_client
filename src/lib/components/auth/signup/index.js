import React from 'react'
import { NoAccountLabel } from "../../constants";
export const MvSignUp = ({ label, onClick }) =><button className="ui fluid button action" onClick={onClick}>{label || NoAccountLabel}</button>
