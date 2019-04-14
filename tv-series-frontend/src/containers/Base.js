import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import storage from 'lib/storage';

class Base extends Component {
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

    componentDidMount() {
        this.check();
    }

    render() {
        return <div />;
    }
}
export default connect(
    state => ({}),
    dispatch => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(Base);
