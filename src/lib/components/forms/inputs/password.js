import React from 'react'
import { Field as FinalField } from 'react-final-form'
import { Input } from 'semantic-ui-react'
import { FieldAdapter } from './adapters/field'
import {
	merge,
	Required as RequiredValidator
} from './validators'

export const Password = (props) => {
	// separate the form props from user props
	const { formProps, ...InputProps } = props
	// pick the final form instance from props
	const { form } = formProps
	const name = 'email'
	return (<FinalField
		name={name}
		component={FieldAdapter}
		reactFinalForm={form}
		validate={
			merge(
				RequiredValidator('Email is Required'))
		}
		props={{
			id: "passwprd",
			name: name,
			label: "Password",
			required: true,
			control: Input,
			type: 'password',
			...InputProps
		}}

	/>)
}
