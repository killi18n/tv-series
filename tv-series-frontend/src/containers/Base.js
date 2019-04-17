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
    const loggedInfo = storage.get('loggedInfo');
    if (!loggedInfo) return;

    const { AuthActions } = this.props;
    AuthActions.setLoggedInfo({ loggedInfo });

    try {
      await AuthActions.check();
    } catch (e) {
      localStorage.remove('loggedInfo');
      window.location.href = '/auth/login?expired';
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
