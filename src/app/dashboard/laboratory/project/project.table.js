import React from 'react';
import { MaterialTable } from '../../../../lib/components/material/tables/material.table';
let counter = 0
function createData(name, calories, fat, carbs, protein) {
	counter += 1;
	return { id: counter, name, calories, fat, carbs, protein };
}

export class ProjectTable extends React.Component {

	onDelete = (idsToDelete) => {
		return console.log(idsToDelete)
		const { data: stateData = [] } = this.state
		const data = stateData.filter(row => !idsToDelete.includes(row.id))
		this.setState({ data })
	}

	render() {
		const columns = [
			{ attribute: 'id', key: 'id', numeric: true, disablePadding: false, label: 'Id' },
			{ attribute: 'name', key: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
			{ attribute: 'calories', key: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
			{ attribute: 'fat', key: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
			{ attribute: 'carbs', key: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
			{ attribute: 'protein', key: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
		]
		const data = [
			createData('Cupcake', 305, 3.7, 67, 4.3),
			createData('Donut', 452, 25.0, 51, 4.9),
			createData('Eclair', 262, 16.0, 24, 6.0),
			createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
			createData('Gingerbread', 356, 16.0, 49, 3.9),
			createData('Honeycomb', 408, 3.2, 87, 6.5),
			createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
			createData('Jelly Bean', 375, 0.0, 94, 0.0),
			createData('KitKat', 518, 26.0, 65, 7.0),
			createData('Lollipop', 392, 0.2, 98, 0.0),
			createData('Marshmallow', 318, 0, 81, 2.0),
			createData('Nougat', 360, 19.0, 9, 37.0),
			createData('Oreo', 437, 18.0, 63, 4.0),
		]
		const onFilter = console.log
		const props = { columns, data, onFilter }
		return <MaterialTable {...props} title="Projects" />

	}
}