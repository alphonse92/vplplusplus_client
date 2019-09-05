import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { TableSortLabel, Tooltip } from '@material-ui/core';

export const EnhancedTableHead = props => {

	const { onSelectAllClick, order, orderBy, numSelected, rowCount, columns, onRequestSort } = props;
	const createSortHandler = property => event => onRequestSort(event, property);
	const getCellByColumns = row => {

		const { disablePadding, numeric, orderable, attribute, key, label } = row
		const isActive = orderable && orderBy === attribute
		const onClick = orderable
			? createSortHandler({ row, orderBy, order })
			: () => true
		return (
			<TableCell key={key} align="center" padding={disablePadding ? 'none' : 'default'} sortDirection={orderBy === key ? order : false}>
				<Tooltip title="Sort" placement={numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
					<TableSortLabel active={isActive} direction={order} onClick={onClick}>
						{label}
					</TableSortLabel>
				</Tooltip>
			</TableCell>
		)
	}

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					{typeof numSelected === "number" && <Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={numSelected === rowCount}
						onChange={onSelectAllClick}
					/>}
				</TableCell>
				{columns.map(getCellByColumns)}
			</TableRow>
		</TableHead>
	);
}