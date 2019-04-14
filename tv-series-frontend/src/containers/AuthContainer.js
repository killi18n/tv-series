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

    handleKeydownLogin = (e) => {
        if(e.key === "Enter") {
            this.handleLogin();
        }
    }

    handleKeydownRegister = (e) => {
        if(e.key === "Enter") {
            this.handleRegister();
        }
    }

    intializeInputs = () => {
        const { AuthActions } = this.props;
        AuthActions.initializeInputs();
    }

    componentDidMount() {
        this.intializeInputs();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.what !== this.props.what) {
            this.intializeInputs();
        }
    }

    handleRegister = async () => {
        const { AuthActions, 
            email, 
            password, 
            passwordCheck, 
            history } = this.props;

        try {   
            await AuthActions.register({email, password, passwordCheck});
            history.push("/auth/login");
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { what, email, password, passwordCheck, error } = this.props;
        const { handleChangeInput, 
            handleLogin, 
            handleKeydownLogin, 
            handleRegister,
            handleKeydownRegister } = this;
        return (
            <AuthForm
                what={what}
                onChangeInput={handleChangeInput}
                email={email}
                password={password}
                passwordCheck={passwordCheck}
                onLogin={handleLogin}
                onKeydownLogin = {handleKeydownLogin}
                onRegister={handleRegister}
                onKeydownRegister={handleKeydownRegister}
                error={error} />
        )
    }
}
export default connect(
    (state) => ({
        email: state.auth.get('email'),
        password: state.auth.get('password'),
        passwordCheck: state.auth.get('passwordCheck'),
        error: state.auth.get('error')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(withRouter(AuthContainer));