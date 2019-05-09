import React from 'react'
import { Toolbar, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Flex, Item } from '../../../..//lib/components/flex'

const ProjectCreateComponent = props => {
	const { classes } = props
	return (
		<React.Fragment>
			<Flex horizontal className="w100">
				<Paper className={classes.root}>
					<Toolbar disableGutters> <h1 className='w100 center'>New Project</h1></Toolbar>
					<p className="justify">
						A continuación crearás un caso de prueba para VPL usando VPL++. Una prueba agrupa varios casos
						de prueba con el fin de evaluar cierto contenido curricular. Normalmente para una actividad de
						VPL solo necesitarás una prueba, sin embargo podrás crear tantas pruebas necesites. La prueba
						será convertida a una prueba unitaria en JUnit.
							</p>

				</Paper>
			</Flex>
			<Flex horizontal className="w100">
				<Paper className={classes.root + " w50"}>
					<Toolbar disableGutters> <h1 className='w100 center'>New</h1></Toolbar>
				</Paper>
				<Paper className={classes.root + " w50"}>
					<Toolbar disableGutters> <h1 className='w100 center'>Preview</h1></Toolbar>
				</Paper>
			</Flex>

		</React.Fragment>
	)
}

const styles = theme => {
	return ({
		root: {
			// width: '100%',
			// marginTop: theme.spacing.unit * 3,
		}
	});
}

const StyledProjectCreateComponent = withStyles(styles)(ProjectCreateComponent)
export const ProjectCreate = props => <StyledProjectCreateComponent {...props} />



