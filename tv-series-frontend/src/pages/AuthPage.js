import React from 'react';
import ListPageTemplate from 'components/common/ListPageTemplate';
import AuthContainer from 'containers/AuthContainer';

const AuthPage = ({ match }) => {
    const { what } = match.params;
    return (
        <ListPageTemplate>
            <AuthContainer what={what} />
        </ListPageTemplate>
    );
};

export default AuthPage;
