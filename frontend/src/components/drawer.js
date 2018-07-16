import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom'

import {
  Collapse,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import StarBorder from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import SendIcon from '@material-ui/icons/Send'
import DraftsIcon from '@material-ui/icons/Drafts'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { mailFolderListItems, otherMailFolderListItems } from './titleData';

import store from '../store/index'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
})

const menus = [
  {
    icon: 'InboxIcon',
    text: '预览文章',
    open: true,
    children: [
      {
        icon: 'StarBorder',
        text: '我的文章',
        url: '/list/my'
      }
    ]
  },
  {
    icon: 'StarIcon',
    text: '编辑文章',
    url: '/edit'
  },
  {
    icon: 'StarIcon',
    text: '文章列表',
    url: '/list/all'
  }
]

class Sidebar extends React.Component {
  state = {
    open: true,
    menus: menus,
    test: true,
    menuOpen: store.getState().menuOpen
  }

  handleClick = e => {
    this.setState({ open: !this.state.open })
  }

  collapseMenu () {
    this.setState({
      menuOpen: store.getState().menuOpen
    })
  }

  componentDidMount () {
    store.subscribe(this.collapseMenu.bind(this));
  }

  deepGet = (data, nested) => {
    const { classes } = this.props
    let nodes
    nodes = data.map(item => {
      let node = (
        <List className={nested && classes.nested}>
          <ListItem button>
            <Link to={item.url || '/'}>
              <ListItemText primary={item.text} />
            </Link>
          </ListItem>
        </List>
      )

      if (item.children && item.children.length) {
        node = (
          <div>
            <List >
              <ListItem button>
                <ListItemText primary={item.text} />
                {item.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </List>
            <Collapse in>
              {this.deepGet(item.children, true)}
            </Collapse>
          </div>
        )
      }

      return node
    })
    return nodes
  }

  render () {
    const { classes, theme } = this.props

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.state.menuOpen && classes.drawerPaperClose)
        }}
        open={this.state.menuOpen}
      >
        <div className={classes.toolbar} />
        <Divider />
        {
          this.deepGet(menus)
          // menus.map(menu => {
          //   return (
          //     <List>
          //       <ListItem button>
          //         <ListItemText primary={menu.text} />
          //         {/* </ListItemText> */}
          //       </ListItem>
          //     </List>
          //   )
          // })
        }
        {/* <List>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className={classes.nested}>
              <ListItem button>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Send mail" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List> */}
        {/* <List>{demo(this.state)}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List> */}
      </Drawer>
    )
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Sidebar)