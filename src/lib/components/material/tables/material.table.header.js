import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';


export class EnhancedTableHead extends React.Component {
	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
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
					{
						this.props.columns.map(
							row => (
								<TableCell key={row.key} align="center" padding={row.disablePadding ? 'none' : 'default'} sortDirection={orderBy === row.key ? order : false}>
									{row.label}
								</TableCell>
							)
						)
					}
				</TableRow>
			</TableHead>
		);
	}
}

// EnhancedTableHead.propTypes = {
// 	numSelected: PropTypes.number.isRequired,
// 	onRequestSort: PropTypes.func.isRequired,
// 	onSelectAllClick: PropTypes.func.isRequired,
// 	order: PropTypes.string.isRequired,
// 	orderBy: PropTypes.string.isRequired,
// 	rowCount: PropTypes.number.isRequired,
// };