import React from 'react'
import { Form } from 'semantic-ui-react'
import { Form as FinalForm } from 'react-final-form'
import { Email } from '../../forms/inputs/email'
import { Submit } from '../../forms/inputs/submit'
import { Password } from '../../forms/inputs/password'

export const MvSingleAuth = (props) => {
	return (
		<FinalForm
			initialValues={{ email: "" }}
			onSubmit={props.onSubmit || console.log}
			render={renderProps => {
				const { handleSubmit } = renderProps
				return (
					<Form onSubmit={handleSubmit} noValidate={true}>
						<Email formProps={renderProps} />
						<Password formProps={props} />
						<Submit formProps={renderProps} fluid />
					</Form>
				)

			}}
		/>
	)
}