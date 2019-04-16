import React, { Component } from 'react'
const HORIZONTAL = 'row'
const VERTICAL = 'column'
const REVERSE = '-reverse'

const START = 'flex-start'
const END = 'flex-end'
const CENTER = 'flex-center'
const BETWEEN = 'space-between'
const AROUND = 'space-around'
const EVENLY = 'space-evenly'

const getDirectionReversed = (direction, isReverse) => direction + (isReverse ? REVERSE : '')
const getDirection = (horizontal, vertical) =>
	horizontal
		? HORIZONTAL
		: vertical
			? VERTICAL
			: HORIZONTAL

export const Item = (props) => {
	const style = {}
	return (
		<div style={style}>{props.children}</div>
	)
}
export const Flex = (props) => {
	const {
		horizontal,
		vertical,
		reverse: isReverse,
		display = 'flex',
		...customStyle
	} = props
	const flexDirection = getDirectionReversed(getDirection(horizontal, vertical), isReverse)
	const style = { display, flexDirection, ...customStyle }
	console.log({ ...style })

	return (
		<div style={style}>{props.children}</div>
	)
}