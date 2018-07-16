import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import MenuIcon from '@material-ui/icons/Menu'

import { 
  Avatar,
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Switch, 
  FormControlLabel, 
  FormGroup, 
  Menu, 
  MenuItem } from '@material-ui/core'

import { FormDialog } from './RegisterDialog'

import Api from '../services/api'

import store from '../store/index'
import * as Actions from '../store/actions';

const styles = theme => ({
  flex: {
    flex: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0
  },
})

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    open: true,
    openRegisterDialog: false,
    avatarSrc: '',
    user: '',
    menuOpen: this.getMenuState()
  }

  getMenuState () {
    return store.getState().menuOpen
  }

  /**
   * 展开/收起导航栏
   */
  switchDrawer = () => {
    let open = this.getMenuState()
    store.dispatch(Actions.collapseMenu(!open))
  }

  closeRegisterDialog = () => {
    this.setState({
      openRegisterDialog: false
    })
  }

  switchLoginState = (e, checked) => {
    this.setState({
      auth: checked,
      openRegisterDialog: true
    })

  }

  login = ({ user, password }) => {
    Api.login({ user, password })
      .then(res => {
        console.log(res)
        window.localStorage.setItem('blog-react-koa', res.token)
        // TODO: 触发弹窗关闭
        this.setState({ user })
        this.setState({
          avatarSrc: require('../images/naruto.gif')
        })
      })
      .catch(err => console.log(err))
  }

  onLogout = () => {
    Api.logout({ user: this.state.user })
      .then(res => {})
      .catch(err => console.log(err))
  }

  register = ({ user, password }) => {
    console.log(user, password)
    Api.register({ user, password })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  handleMenu = e => {
    this.setState({
      anchorEl: e.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  collapseMenu () {
    this.setState({
      menuOpen: this.getMenuState()
    })
  }

  componentDidMount () {
    store.subscribe(this.collapseMenu.bind(this));
  }

  componentWillUnmount () {
    store.unsubscribe(this.collapseMenu.bind(this));
  }

  render () {
    const { classes, theme } = this.props
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)
    const spacing = 100

    return (
      <AppBar 
        position="absolute"
        className={classNames(classes.appBar, this.state.menuOpen && classes.appBarShift)}
      >
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
            onClick={this.switchDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Blog
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <Avatar
                  src={this.state.avatarSrc}></Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.onLogout}>登出</MenuItem>
              </Menu>
            </div>
          )}
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={auth} 
                        onChange={this.switchLoginState}
                        aria-label="LoginSwitch" />
              }
              label={auth ? 'Logout' : 'Login'}
            />
          </FormGroup>
          <FormDialog 
            open={this.state.openRegisterDialog}
            closeRegisterDialog={this.closeRegisterDialog} 
            register={this.register}
            login={this.login}
          />
        </Toolbar>
      </AppBar>
    )

  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuAppBar)
// export default withStyles()(MenuAppBar)