import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import ListPageHeader from 'components/ListPageHeader/ListPageHeader';

class ListHeaderContainer extends Component {
    onMenuClick = () => {
        const { BaseActions } = this.props;
        BaseActions.showSideBar();
    }

    render() {
        const { onMenuClick } = this;
        return (
            <ListPageHeader onMenuClick={onMenuClick}/>
        )
    }
}
export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(ListHeaderContainer);