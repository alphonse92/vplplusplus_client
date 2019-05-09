import React from 'react';
import { Toolbar, Button, } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { Flex, Item } from '../../../../../lib/components/flex'

export const NewProjectToolbarComponent = ({ goTo }) => (
	<Toolbar disableGutters>
		<Flex horizontal reverse width='100%' height='100%' >
			<Item>
				<Button onClick={goTo}><AddIcon /> Start a New Project</Button>
			</Item>
		</Flex>
	</Toolbar>
)