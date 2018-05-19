import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CategoryList from 'components/CategoryList/CategoryList';
import data from 'data.json';
import * as listActions from 'store/modules/list';

class CategoryListContainer extends Component {

    getAll = async () => {
        const { ListActions } = this.props;

        try {
            await ListActions.getAll();
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getAll();
    }

    render() {
        const { category, all, lastPage, page } = this.props;
        return (
            <CategoryList 
                categories={data.categories} 
                category={category} 
                all={all} 
                lastPage={lastPage}
                page={page} />
        )
    }
}
export default connect(
    (state) => ({
        all: state.list.get('all'),
        lastPage: state.list.get('lastPage')
    }),
    (dispatch) => ({
        ListActions: bindActionCreators(listActions, dispatch)
    })
)(CategoryListContainer);