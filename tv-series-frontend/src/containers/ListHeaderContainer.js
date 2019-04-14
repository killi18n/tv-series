import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

    render() {
        const { onMenuClick, showAuthFormModal } = this;
        return (
            <ListPageHeader
                onMenuClick={onMenuClick}
                showAuthForm={showAuthFormModal}
            />
        );
    }
}
export default connect(
    state => ({}),
    dispatch => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
    })
)(ListHeaderContainer);
