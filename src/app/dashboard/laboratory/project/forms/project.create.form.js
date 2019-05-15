import React from 'react';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

export class ProjectCreateForm extends React.Component {
	render() {
		return (
			<React.Fragment>
				<AppBar>
					<Toolbar>
						<IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" color="inherit">Project Creator</Typography>
						<Button color="inherit" onClick={this.handleClose}>Create</Button>
					</Toolbar>
				</AppBar>
				<List>
					<ListItem button>
						<ListItemText primary="Phone ringtone" secondary="Titania" />
					</ListItem>
					<Divider />
					<ListItem button>
						<ListItemText primary="Default notification ringtone" secondary="Tethys" />
					</ListItem>
				</List>
			</React.Fragment>
		)
	}
}
