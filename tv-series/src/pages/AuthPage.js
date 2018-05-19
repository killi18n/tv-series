import React from 'react';
import ListPageTemplate from 'components/ListPageTemplate/ListPageTemplate';
import AuthForm from 'components/AuthForm/AuthForm';
import AuthContainer from '../containers/AuthContainer';

const AuthPage = ({match}) => {
    const { what } = match.params;
    return (
        <ListPageTemplate>
           <AuthContainer what={what}/>
        </ListPageTemplate>
    );
};

export default AuthPage;