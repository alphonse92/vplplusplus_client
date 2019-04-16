import React from 'react'
import { Button } from 'semantic-ui-react'

export const Submit = (props) => {
	const { formProps, ...customProps } = props
	const { submitting, pristine, invalid, isValid } = formProps
	const isValidDefault = typeof isValid === 'undefined' ? true : isValid
	const isEnabled = isValidDefault
		&& !submitting
		&& !pristine
		&& !invalid
	return (<Button
		primary
		type="submit"
		disabled={!isEnabled}
		{...customProps}> Submit </Button>)
}