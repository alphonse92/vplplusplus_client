import { FinalFormAdapter } from './base'

export class FieldAdapter extends FinalFormAdapter {
	render() {
		const { meta, input, FieldProps } = super.getProperties()
		const renderProps = { meta, input, FieldProps }
		return super.renderFinalFormAdapter(renderProps)
	}
}