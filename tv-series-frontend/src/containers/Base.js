import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import storage from 'lib/storage';
import AuthFormModalContainer from './AuthFormModalContainer';

class Base extends Component {
  componentDidMount() {
    this.check();
  }

  check = async () => {
    const { AuthActions } = this.props;

    const loggedInfo = storage.get('loggedInfo');

    if (!loggedInfo) {
      AuthActions.setIsAuthChecking(false);
      return;
    }
    AuthActions.setLoggedInfo({ loggedInfo });

    try {
      await AuthActions.check();
    } catch (e) {
      storage.remove('loggedInfo');
      window.location.href = '/';
    }
  };

  render() {
    return <AuthFormModalContainer />;
  }
}
export default connect(
  () => ({}),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(Base);
