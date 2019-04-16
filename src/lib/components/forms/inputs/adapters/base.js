import React from 'react'
import { Form, Label } from 'semantic-ui-react'

/**
 *  OnChangeWrapper wrapps the custom on change method. The value returned by the custom on change
 *  method will be seted to the final fomr field input node. It allows to parse/format the data 
 *  that will passed to the input node of final form. If the custom onChange method doesnt return, 
 *  then the value of event will passed
 * @param {props} {
 *             input:   FinalForm input that store the value of the final form 
 *    onChangeToWrap:   is the on change that was passed as a props for the finalform field, 
 *                      commonly is the custom on change,
 * } 
 */
export const OnChangeWrapper = ({ input, onChange: onChangeToWrap = () => undefined, children }) => {
	const { onChange: inputOnChange, name } = input
	const props = {
		onChange: (valueEvent, event) => {
			const valueFromOnChange = onChangeToWrap(event, { name, value: valueEvent })
			inputOnChange(valueFromOnChange || valueEvent)
		}
	}
	return (React.cloneElement(children, props))
}

/**
 * FinalFormAdapter provides a abstract custom implementation for a FinalForm adapter.
 * 
 */
export class FinalFormAdapter extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		const { props } = this
		const before = props.input.value.toString()
		const after = nextProps.input.value.toString()
		const shouldUpdate = before !== after
		return shouldUpdate
	}

	// function to get the values that allow to you manage the properties of custom component
	getProperties() {
		const AdapterProps = this.props
		const { meta, input, ...rest } = AdapterProps
		const { value, name } = input
		const { props = rest } = AdapterProps
		const FieldProps = { ...props }

		return {
			meta,
			input,
			props,
			FieldProps,
			value,
			name
		}
	}

	// function for easy render the final form adapter
	renderFinalFormAdapter({ meta, input, onChange, FieldProps }) {
		const hasError = meta.error && meta.touched
		const ErrorComponent = (props) => <Label style={{ maxWidth: '350px' }} basic color="red" pointing> {props.error}</Label>
		const LabelError = hasError ? <ErrorComponent error={meta.error} /> : null
		return (
			<div style={{ marginBottom: '10px' }}>
				<OnChangeWrapper input={input} onChange={onChange}>
					<Form.Field  {...FieldProps} />
				</OnChangeWrapper>
				{LabelError}
			</div>
		)
	}

}