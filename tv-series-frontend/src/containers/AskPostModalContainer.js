import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as base from 'store/modules/base';
import * as post from 'store/modules/post';
import AskPostModal from 'components/AskPostModal/AskPostModal';
import { withRouter } from 'react-router-dom';

class AskPostModalContainer extends Component {

    hidePostModal = () => {
        const { BaseActions } = this.props;
        BaseActions.hidePostModal();
    }

    handleUpdateClick = () => {
        const { history, id } = this.props;
        this.hidePostModal();
        history.push(`/editor?id=${id}`);

    }

    handleRemove = async () => {
        const { PostActions, history, id } = this.props;

        try {
            await PostActions.removePost({id});
            this.hidePostModal();
            history.push("/");
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const { postModalVisible } = this.props;
        const { hidePostModal, handleUpdateClick, handleRemove } = this;


        return (
            <AskPostModal visible={postModalVisible}
                onHide={hidePostModal}
                onUpdateClick={handleUpdateClick}
                onRemove={handleRemove}
                 />
        )
    }
}
export default connect(
    (state) => ({
        postModalVisible: state.base.get('postModalVisible')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(base, dispatch),
        PostActions: bindActionCreators(post, dispatch)
    })
)(withRouter(AskPostModalContainer));