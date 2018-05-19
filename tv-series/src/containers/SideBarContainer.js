import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import SideBarWrapper from 'components/SideBarWrapper/SideBarWrapper';
import SideBar from 'components/SideBar/SideBar';
import onClickOutside from "react-onclickoutside";


class SideBarContainer extends Component {

    handleClickOutside = () => {
        const { BaseActions } = this.props;
        BaseActions.hideSideBar();
    }

    hideSideBar = () => {
        const { BaseActions } = this.props;
        BaseActions.hideSideBar();
    }
    
    render() {
        const { sideBarVisible } = this.props;
        const { hideSideBar } = this;
        return (
            <SideBarWrapper visible={sideBarVisible}>
                <SideBar onHide={hideSideBar}/>
            </SideBarWrapper>
        )
    }
}
export default connect(
    (state) => ({
        sideBarVisible: state.base.get('sideBarVisible')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(onClickOutside(SideBarContainer));