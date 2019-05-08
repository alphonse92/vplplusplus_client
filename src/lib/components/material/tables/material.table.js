import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import { EnhancedTableToolbar } from './material.toolbar'
import { EnhancedTableHead } from './material.table.header'
import { EnhancedTableFilter } from './material.table.dataFilter'
class EnhancedTable extends React.Component {
	state = {
		order: 'asc',
		orderBy: 'calories',
		selected: [],
		page: 0,
		rowsPerPage: 5,
		columnNames: [],
		data: [],
		dataFiltered: [],
		showFilterComponent: false
	};

	componentDidMount() {

		const {
			data = [],
			columns = [],
			showFilterComponent = this.state.showFilterComponent
		} = this.props

		const dataFiltered = data
		const extractColumnName = colDef => colDef.attribute
		const columnNames = columns.map(extractColumnName)
		const newState = { data, dataFiltered, columnNames, showFilterComponent }

		this.setState(newState)
	}

	toggleFilter = () => {
		this.setState({ showFilterComponent: !this.state.showFilterComponent })
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		this.setState({ order, orderBy });
	};

	handleSelectAllClick = event => {
		if (event.target.checked) {
			this.setState(state => ({ selected: state.data.map(n => n.id) }));
			return;
		}
		this.setState({ selected: [] });
	};

	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		this.setState({ selected: newSelected });
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	getCellsForRow =
		row =>
			columns =>
				(colName, index) => {
					const colDef = columns[colName]
					const { attribute, numeric } = colDef
					const align = numeric ? "right" : 'left'
					const rowValue = row[attribute]
					const key = `${colDef.attribute}-${index}`
					const props = { align, key }
					const value = rowValue
						? rowValue
						: numeric
							? 0
							: ''
					return <TableCell  {...props}>{value}</TableCell>
				}

	getRowComponents = columns => row => {
		const isSelected = this.isSelected(row.id);
		const controlCells = [<TableCell key={`chk-${row.id}`} padding="checkbox"><Checkbox checked={isSelected} /></TableCell>]
		const dataRowCells = Object.keys(columns).map(this.getCellsForRow(row)(columns))
		const cells = controlCells.concat(dataRowCells)
		return (
			<TableRow
				hover
				onClick={event => this.handleClick(event, row.id)}
				role="checkbox"
				aria-checked={isSelected}
				tabIndex={-1}
				key={row.id}
				selected={isSelected}
			>{cells}</TableRow>
		)
	}

	onFilter = (findFor, filterBy) => {

		const ALL = filterBy.length === 0
		const { state } = this
		const { data, columnNames } = state

		if (!findFor.length) return this.setState({ dataFiltered: data })

		const FilterBy = ALL
			? columnNames
			: Array.isArray(filterBy)
				? filterBy
				: [filterBy]

		const columnReducer =
			findFor =>
				row =>
					(isMatch, attribute) => {
						const value = row[attribute]
						const type = typeof value
						const matchWithValue = type === "number"
							? value === findFor
							: value.toLowerCase().indexOf(findFor.toLowerCase()) >= 0
						return isMatch || matchWithValue
					}
		const dataReducer =
			findFor =>
				(array, row) => {
					return FilterBy
						.reduce(columnReducer(findFor)(row), false)
						? array.concat([row])
						: array.concat([])
				}

		const dataFiltered = data.reduce(dataReducer(findFor), [])
		this.setState({ dataFiltered })
	}

	render() {

		const {
			state,
			props,
			toggleFilter,
			handleSelectAllClick,
			handleRequestSort,
			handleChangePage,
			handleChangeRowsPerPage
		} = this

		const {
			title,
			classes,
			columns,
			onRemoveItems,
			onFilter = this.onFilter,
		} = props;

		const {
			dataFiltered: data,
			order,
			orderBy,
			selected,
			rowsPerPage,
			page,
			columnNames,
			showFilterComponent,
		} = state;

		const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
		const sliceFrom = page * rowsPerPage
		const sliceTo = page * rowsPerPage + rowsPerPage

		const rows = stableSort(data, getSorting(order, orderBy))
			.slice(sliceFrom, sliceTo)
			.map(this.getRowComponents(columns))

		return (
			<Paper className={classes.root}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					title={title}
					onDeletePressed={()=>onRemoveItems(selected)}
					onFilterPressed={toggleFilter}
				/>

				{showFilterComponent && <EnhancedTableFilter onFilter={onFilter} options={columnNames} />}

				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle">
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={data.length}
							columns={columns}
						/>

						<TableBody>
							{rows}
							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page',
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page',
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		);
	}
}

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	table: {
		minWidth: 1020,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
});

EnhancedTable.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	title: PropTypes.string,
};

export const MaterialTable = withStyles(styles)(EnhancedTable);