import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthFormModal from 'components/common/AuthFormModal';
import * as baseActions from 'store/modules/base';

class AuthFormModalContainer extends Component {
  hideAuthFormModal = ({ type }) => {
    const { BaseActions } = this.props;
    BaseActions.hideAuthFormModal({ type });
  };

  //   addListeners = ({ type }) => {
  //     if (document && document.documentElement) {
  //       document
  //         .getElementById('authform-modal')
  //         .addEventListener('mousedown', () => this.hideAuthFormModal({ type }));
  //     }

  //     if (window) {
  //       window.document
  //         .getElementById('authform-modal')
  //         .addEventListener('mousedown', () => this.hideAuthFormModal({ type }));
  //     }
  //   };

  //   removeListeners = ({ type }) => {
  //     if (document && document.documentElement) {
  //       document
  //         .getElementById('authform-modal')
  //         .removeEventListener('mousedown', () =>
  //           this.hideAuthFormModal({ type })
  //         );
  //     }

  //     if (window) {
  //       window.document
  //         .getElementById('authform-modal')
  //         .removeEventListener('mousedown', () =>
  //           this.hideAuthFormModal({ type })
  //         );
  //     }
  //   };

  render() {
    const { registerModalVisible, loginModalVisible } = this.props;
    // const { addListeners, removeListeners } = this;
    return (
      <React.Fragment>
        <AuthFormModal
          type="login"
          visible={loginModalVisible}
          //   addListeners={addListeners}
          //   removeListeners={removeListeners}
        />
        <AuthFormModal
          type="register"
          visible={registerModalVisible}
          //   addListeners={addListeners}
          //   removeListeners={removeListeners}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    registerModalVisible: state.base.get('registerModalVisible'),
    loginModalVisible: state.base.get('loginModalVisible'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(AuthFormModalContainer);
