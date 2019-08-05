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
import { isEqual } from 'lodash'
import { EnhancedTableToolbar } from './material.toolbar'
import { EnhancedTableHead } from './material.table.header'
import { EnhancedTableFilter } from './material.table.dataFilter'
class EnhancedTable extends React.PureComponent {
	state = {
		selected: []
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

	onChangePage = (data, value) => {
		const { handleChangePage, pagination } = this.props
		const { page: statePage, limit: stateLimit } = this.state
		const { page: propsPage, limit: propsLimit, } = pagination
		console.log({ statePage, stateLimit, propsPage, propsLimit})
		if (statePage !== propsPage || stateLimit !== propsLimit) {
			handleChangePage(data, value)
			this.setState({ page: propsPage, limit: propsLimit })
		}
	}


	render() {

		const {
			state,
			props,
			toggleFilter,
			handleSelectAllClick,
			onChangePage
		} = this

		const {
			pagination = {},
			title,
			classes,
			columns,
			onRemoveItems,
			handleRequestSort,
			handleChangeRowsPerPage,
			handleChangeFilter: onFilter = this.onFilter,
		} = props;
		const { limit, page, total, docs: data = [] } = pagination
		const {
			order,
			orderBy,
			selected,
			columnNames,
			showFilterComponent,
		} = state;

		const emptyComponent = this.props.emptyComponent || <p style={{ width: '100%', textAlign: 'center' }}> No data to shown</p>
		const rows = data.map(this.getRowComponents(columns))

		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>

					{!data.length && (
						<Table className={classes.table} aria-labelledby="tableTitle">
							<TableBody>
								<TableRow style={{ height: '150px' }}>
									<TableCell colSpan={columns.length + 1} > {emptyComponent}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					)}

					{!!data.length && (
						<React.Fragment>
							{!!showFilterComponent && <EnhancedTableFilter onFilter={onFilter} options={columnNames} />}
							<EnhancedTableToolbar
								numSelected={selected.length}
								title={title}
								onDeletePressed={() => onRemoveItems(selected)}
								onFilterPressed={toggleFilter}
							/>
							<Table className={classes.table} aria-labelledby="tableTitle">
								{!!data.length && <EnhancedTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={data.length}
									columns={columns}
								/>}

								<TableBody>{rows}</TableBody>
							</Table>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								component="div"
								count={total}
								rowsPerPage={limit}
								page={page-1}
								backIconButtonProps={{
									'aria-label': 'Previous Page',
								}}
								nextIconButtonProps={{
									'aria-label': 'Next Page',
								}}
								onChangePage={onChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
							/>
						</React.Fragment>
					)}
				</div>
			</Paper>
		);
	}
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
	pagination: PropTypes.object.isRequired,
	columns: PropTypes.array.isRequired,
	title: PropTypes.string,
};

export const MaterialTable = withStyles(styles)(EnhancedTable);