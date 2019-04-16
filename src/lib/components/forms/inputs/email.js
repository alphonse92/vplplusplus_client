import React from 'react'
import { Field as FinalField } from 'react-final-form'
import { Input } from 'semantic-ui-react'
import { FieldAdapter } from './adapters/field'
import {
	merge,
	Email as EmailValidator,
	Required as RequiredValidator
} from './validators'

export const Email = (props) => {
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
				EmailValidator('Email is required'),
				RequiredValidator('Email is Required'))
		}
		props={{
			id: "email",
			name: name,
			label: "Email",
			placeholder: "Enter email",
			required: true,
			control: Input,
			...InputProps
		}}

	/>)
}
