import React from 'react';
export const WindowComponent = ({ window, onClose }) => {

	if (!window) return <React.Fragment></React.Fragment>

	const Component = window.component
	return <Component key={window.id} window={window} onClose={onClose} />
}