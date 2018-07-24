import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import store from '../store/index'
import * as Actions from '../store/actions'

export class UserDialog extends React.Component {

  constructor () {
    super()

  }

  state = {
    user: '',
    password: '',
    show: store.getState().showUserDialog
  }

  getStore () {
    const { showUserDialog: show } = store.getState()
    return {
      show,
    }
  }

  // state = {
  //   open: false,
  // };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  closeDialog = () => {
    this.setState({ open: false });
  }

  cancel = () => {
    store.dispatch(Actions.handleUserDialog(false))
    this.closeDialog()
  }

  register = () => {
    const { user, password } = this.state
    if (!user || !password) {
      return
    }
    this.props.register({ user, password })
  }

  login = () => {
    const { user, password } = this.state
    console.log('---', user)
    if (!user || !password) {
      return
    }
    this.props.login({ user, password })
  }

  componentDidMount () {
    store.subscribe(function () {
      this.setState({
        show: this.getStore().show
      })
    }.bind(this))
  }

  render() {
    return (
      <div>
        {/* <Button onClick={this.handleClickOpen}>Open form dialog</Button> */}
        <Dialog
          open={this.state.show}
          onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To register, please enter your username and password here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="user"
              label="User"
              type="text"
              fullWidth
              onChange={(e) => { this.setState({ user: e.target.value }) }}
              value={this.state.user}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="text"
              fullWidth
              onChange={(e) => { this.setState({ password: e.target.value }) }}
              value={this.state.password}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancel} color="primary">
              取消
            </Button>
            <Button onClick={this.login} color="primary">
              登陆
            </Button>
            <Button onClick={this.register} color="primary">
              注册
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
