import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ListSubheader, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { VplLang } from '../../redux/lang';
import { ActionCreators } from '../../redux/lang/redux/actions';
import { LanguageSchema } from '../../lang'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class MiniDrawer extends React.Component {

  static mapStateToProps = (state) => {
    return { lang: state.lang.lang }
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = bindActionCreators({ ...ActionCreators }, dispatch)
    return { DISPATCHERS }
  }

  constructor(props) {
    super(props)
    this.state = {
      open: props.openAtStart,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  setLang = event => {
    const { value: lang } = event.target
    this.props.DISPATCHERS.SET_LANG(lang)
  };

  render() {
    const { classes, theme, menu, onSelect } = this.props;
    const DrawerClassName = classNames(classes.drawer, {
      [classes.drawerOpen]: this.state.open,
      [classes.drawerClose]: !this.state.open,
    })
    const DrawerClasses = {
      paper: classNames({
        [classes.drawerOpen]: this.state.open,
        [classes.drawerClose]: !this.state.open,
      }),
    }
    const isOpen = this.state.open


    const DrawerToolbar = () => (
      <div className={classes.toolbar}>
        <IconButton onClick={this.handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
    )

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Virtual Programming Lab ++
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" className={DrawerClassName} classes={DrawerClasses} open={isOpen}>
          <DrawerToolbar />
          <Divider />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple"><VplLang string="LANGUAGE" /></InputLabel>
            <Select
              onChange={this.setLang}
              value={this.props.lang}
            >

              {
                Object
                  .keys(LanguageSchema)
                  .map(shortName => {
                    const name = LanguageSchema[shortName]
                    return <MenuItem key={shortName} value={shortName}>{name}</MenuItem>
                  })
              }

            </Select>
          </FormControl>

          {
            menu.map((group) => {
              const { name } = group
              const SubHeader = isOpen
                ? <ListSubheader component="div"><VplLang string={name} /></ListSubheader>
                : <React.Fragment></React.Fragment>
              return (
                <List key={name} subheader={SubHeader}>
                  {
                    group.items.map(item => {
                      const { icon, text } = item
                      return (
                        <ListItem button key={text} onClick={() => onSelect(item)}>
                          <ListItemIcon>{icon}</ListItemIcon>
                          {isOpen && <ListItemText primary={<VplLang string={text} />} />}
                        </ListItem>)
                    })
                  }
                </List>
              )
            })}
        </Drawer>


        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const ConnectedComponent = connect(
  MiniDrawer.mapStateToProps,
  MiniDrawer.mapDispatchToProps
)(MiniDrawer)

export default withStyles(styles, { withTheme: true })(ConnectedComponent);