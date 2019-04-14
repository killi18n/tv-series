import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import SideBarWrapper from 'components/common/SideBarWrapper';
import SideBar from 'components/common/SideBar';
import storage from 'lib/storage';

class SideBarContainer extends Component {
    hideSideBar = () => {
        const { BaseActions } = this.props;
        BaseActions.hideSideBar();
    };

    logout = async () => {
        const { AuthActions } = this.props;

        try {
            await AuthActions.logout();
            storage.remove('loggedInfo');
            window.location.href = '/';
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { sideBarVisible, logged } = this.props;
        const { hideSideBar, logout } = this;
        return (
            <SideBarWrapper visible={sideBarVisible}>
                <SideBar
                    onHide={hideSideBar}
                    logged={logged}
                    onLogout={logout}
                />
            </SideBarWrapper>
        );
    }
}
export default connect(
    state => ({
        sideBarVisible: state.base.get('sideBarVisible'),
        logged: state.auth.get('logged'),
    }),
    dispatch => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(SideBarContainer);
