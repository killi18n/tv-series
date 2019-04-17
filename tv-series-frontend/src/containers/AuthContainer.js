import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onClickOutside from 'react-onclickoutside';
import * as authActions from 'store/modules/auth';
import * as baseActions from 'store/modules/base';
import AuthForm from 'components/auth/AuthForm';

class AuthContainer extends Component {
  componentDidMount() {
    this.intializeInputs();
  }

  componentDidUpdate(prevProps) {
    const { what } = this.props;
    const { what: prevWhat } = prevProps;
    if (prevWhat !== what) {
      this.intializeInputs();
    }
  }

  handleClickOutside = () => {
    this.hideAuthFormModal();
  };

  hideAuthFormModal = () => {
    const { BaseActions, what } = this.props;
    BaseActions.hideAuthFormModal({ type: what });
  };

  handleRegister = async () => {
    const { AuthActions, email, password, passwordCheck } = this.props;

    try {
      await AuthActions.register({ email, password, passwordCheck });
      // history.push('/auth/login');
      this.hideAuthFormModal();
    } catch (e) {
      console.log(e);
    }
  };

  handleChangeInput = ({ name, value }) => {
    const { AuthActions } = this.props;

    AuthActions.changeInput({ name, value });
  };

  handleLogin = async () => {
    const { AuthActions, email, password } = this.props;

    try {
      await AuthActions.login({ email, password });
      // history.push('/');
      this.hideAuthFormModal();
    } catch (e) {
      console.log(e);
    }
  };

  handleKeydownLogin = e => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  };

  handleKeydownRegister = e => {
    if (e.key === 'Enter') {
      this.handleRegister();
    }
  };

  intializeInputs = () => {
    const { AuthActions } = this.props;
    AuthActions.initializeInputs();
  };

  render() {
    const { what, email, password, passwordCheck, error } = this.props;
    const {
      handleChangeInput,
      handleLogin,
      handleKeydownLogin,
      handleRegister,
      handleKeydownRegister,
    } = this;
    return (
      <AuthForm
        what={what}
        onChangeInput={handleChangeInput}
        email={email}
        password={password}
        passwordCheck={passwordCheck}
        onLogin={handleLogin}
        onKeydownLogin={handleKeydownLogin}
        onRegister={handleRegister}
        onKeydownRegister={handleKeydownRegister}
        error={error}
      />
    );
  }
}
export default connect(
  state => ({
    email: state.auth.get('email'),
    password: state.auth.get('password'),
    passwordCheck: state.auth.get('passwordCheck'),
    error: state.auth.get('error'),
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(withRouter(onClickOutside(AuthContainer)));
