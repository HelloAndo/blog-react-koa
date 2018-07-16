import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class FormDialog extends React.Component {

  constructor () {
    super()

  }

  state = {
    user: '',
    password: ''
  }

  // state = {
  //   open: false,
  // };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  handleClose = () => {
    this.setState({ open: false });
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

  render() {
    return (
      <div>
        {/* <Button onClick={this.handleClickOpen}>Open form dialog</Button> */}
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
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
            <Button onClick={this.props.closeRegisterDialog} color="primary">
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
