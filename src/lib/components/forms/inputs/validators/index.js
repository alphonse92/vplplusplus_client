import validator from 'validator'
import { InvalidField, RequiredField } from '../../../constants/'

// CREATOR
const createValidator =
	(validator, MESSAGE_DEFAULT = InvalidField) =>
		(message) =>
			(value) =>
				validator(value)
					? undefined
					: message
						? message
						: MESSAGE_DEFAULT

// VALIDATORS
const isFilled = value => !!value
const isValidPassword = value => value.length >= 8
const isEmail = value => value ? validator.isEmail(value) : false


// CREATE VALIDATORS FOR FINAL FORM
export const Email = createValidator(isEmail)
export const Password = createValidator(isValidPassword)
export const Required = createValidator(isFilled, RequiredField)
export const merge = (...validators) => {
	return value => {
		return validators.reduce(
			(error, validator) => error || validator(value),
			undefined
		)
	}
}
