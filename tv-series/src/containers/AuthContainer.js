import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import AuthForm from 'components/AuthForm/AuthForm';
import { withRouter } from 'react-router-dom';

class AuthContainer extends Component {
    handleChangeInput = ({ name, value }) => {
        const { AuthActions } = this.props;

        AuthActions.changeInput({ name, value });
    }

    handleLogin = async () => {
        const { AuthActions, email, password, history } = this.props;

        try {
            await AuthActions.login({ email, password });
            history.push("/");
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const { what, email, password, passwordCheck } = this.props;
        const { handleChangeInput, handleLogin } = this;
        return (
            <AuthForm
                what={what}
                onChangeInput={handleChangeInput}
                email={email}
                password={password}
                passwordCheck={passwordCheck}
                onLogin={handleLogin} />
        )
    }
}
export default connect(
    (state) => ({
        email: state.auth.get('email'),
        password: state.auth.get('password'),
        passwordCheck: state.auth.get('passwordCheck')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(withRouter(AuthContainer));