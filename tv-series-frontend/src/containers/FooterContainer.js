import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as MyActionModule from 'store/modules/MyActionModule';
import PageFooter from 'components/common/PageFooter';

class FooterContainer extends Component {
    render() {
        const { admin } = this.props;
        return <PageFooter admin={admin} />;
    }
}
export default connect(
    state => ({
        admin: state.auth.get('admin'),
    }),
    dispatch => ({})
)(FooterContainer);
