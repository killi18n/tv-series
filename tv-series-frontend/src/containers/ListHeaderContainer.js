import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as authActions from 'store/modules/auth';
import * as baseActions from 'store/modules/base';
import ListPageHeader from 'components/common/ListPageHeader';

class ListHeaderContainer extends Component {
  onMenuClick = () => {
    const { BaseActions } = this.props;
    BaseActions.showSideBar();
  };

  showAuthFormModal = ({ type }) => {
    const { BaseActions } = this.props;
    BaseActions.showAuthFormModal({ type });
  };

  handleLogout = async () => {
    const { AuthActions, history } = this.props;
    try {
      await AuthActions.logout();
      history.push('/');
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    const { logged } = this.props;
    const { onMenuClick, showAuthFormModal, handleLogout } = this;
    return (
      <ListPageHeader
        onMenuClick={onMenuClick}
        showAuthForm={showAuthFormModal}
        logged={logged}
        onLogout={handleLogout}
      />
    );
  }
}
export default connect(
  state => ({
    logged: state.auth.get('logged'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(withRouter(ListHeaderContainer));
