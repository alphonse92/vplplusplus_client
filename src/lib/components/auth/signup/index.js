import React from 'react'
import { NoAccountLabel } from "../../constants";
export const MvSignUp = ({ label, url }) =><a className="ui fluid button action" href={url} target="__blank">{label || NoAccountLabel}</a>
