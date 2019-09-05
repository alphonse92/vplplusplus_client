import React from 'react';
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
import { get } from 'lodash'
class EnhancedTable extends React.PureComponent {

	state = {
		selected: []
	};
	getDocs = () => this.props.pagination.docs || []

	unSelectAllItems = () => {

		this.setState({ selected: [] })
	}

	handleSelectAllItems = async () => {
		const docs = this.getDocs()
		const selected = await this.props.handleSelectAllItems(this.state.selected, docs)
		this.setState({ selected })
	};

	handleSelectItem = async (row, isSelected) => {
		const data = await this.props.handleSelectItem(isSelected, row)
		const selected = Array.isArray(data) ? data : [data]
		this.setState({ selected });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1

	getCellsForRow =
		row =>
			columns =>
				(colName, index) => {
					const colDef = columns[colName]
					const { attribute, numeric } = colDef
					const align = numeric ? "right" : 'left'
					const rowValue = get(row, attribute)
					const key = `${colDef.attribute}-${index}`
					const props = { align, key }
					const value = typeof rowValue !== undefined
						? rowValue
						: numeric
							? 0
							: ''
					return <TableCell  {...props}>{value}</TableCell>
				}

	getRowComponents = columns => keyProp => row => {
		const key = row[keyProp]
		const isSelected = this.isSelected(key);
		const controlCells = [<TableCell key={`chk-${key}`} padding="checkbox"><Checkbox checked={isSelected} /></TableCell>]
		const dataRowCells = Object.keys(columns).map(this.getCellsForRow(row)(columns))
		const cells = controlCells.concat(dataRowCells)
		return (
			<TableRow
				hover
				onClick={event => this.handleSelectItem(row, isSelected)}
				role="checkbox"
				aria-checked={isSelected}
				tabIndex={-1}
				key={key}
				selected={isSelected}
			>{cells}</TableRow>
		)
	}

	onChangePage = (data, value) => {
		const { handleChangePage, pagination } = this.props
		const { page: statePage, limit: stateLimit, selected } = this.state
		const { page: propsPage, limit: propsLimit, } = pagination
		if (!selected.length && (statePage !== propsPage || stateLimit !== propsLimit)) {
			handleChangePage(data, value)
			this.setState({ page: propsPage, limit: propsLimit })
		}
	}

	handleChangeRowsPerPage = (data, value) => {
		const { selected } = this.state
		if (!selected.length) this.props.handleChangeRowsPerPage(data, value)
	}
	render() {

		const {
			state,
			props,
			// handleSelectAllItems,
			handleChangeRowsPerPage,
			onChangePage,
			unSelectAllItems
		} = this

		const {
			keyProp = 'id',
			pagination = {},
			title,
			classes,
			columns,
			// handleRequestSort,
			handleChangeFilter: onFilter = this.onFilter,
			getButtons,
		} = props;
		const { limit, page, total, /*sort,*/ docs: data = [] } = pagination
		const {
			selected,
			columnNames,
			showFilterComponent,
		} = state;

		const buttonsWhenSelected = getButtons(selected);
		const buttonsWhenNotSelected = getButtons();
		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>

					{ //  case when there arent data
						!data.length && (
							<Table className={classes.table} aria-labelledby="tableTitle">
								<TableBody>
									<TableRow style={{ height: '150px' }}>
										<TableCell colSpan={columns.length + 1} >
											{this.props.emptyComponent || <p style={{ width: '100%', textAlign: 'center' }}> No data to shown</p>}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						)}

					{ // case when there are data
						!!data.length && (
							<React.Fragment>
								{!!showFilterComponent && <EnhancedTableFilter onFilter={onFilter} options={columnNames} />}
								<EnhancedTableToolbar
									numSelected={selected.length}
									title={title}
									buttonsWhenSelected={buttonsWhenSelected}
									buttonsWhenNotSelected={buttonsWhenNotSelected}
									onClose={unSelectAllItems}
								/>
								<Table className={classes.table} aria-labelledby="tableTitle">
									{!!data.length && <EnhancedTableHead
										// order={!!this.state.order}
										// orderBy={sort}
										// onSelectAllClick={handleSelectAllItems}
										// onRequestSort={handleRequestSort}
										rowCount={data.length}
										columns={columns}
									/>}
									<TableBody>{data.map(this.getRowComponents(columns)(keyProp))}</TableBody>
								</Table>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									component="div"
									count={total}
									rowsPerPage={limit}
									page={page - 1}
									backIconButtonProps={{
										disabled: !!(this.state.selected.length || page === 1),
										'aria-label': 'Previous Page',
									}}
									nextIconButtonProps={{
										disabled: !!(this.state.selected.length || (page * limit) >= total),
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


export const MaterialTable = withStyles(styles)(EnhancedTable);