import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CategoryList from 'components/contents/CategoryList';
import data from 'data.json';
import * as listActions from 'store/modules/list';

class CategoryListContainer extends Component {
    getAll = async () => {
        const { ListActions, page, category } = this.props;

        try {
            await ListActions.getAll({ page, genre: category });
        } catch (e) {
            console.log(e);
        }
    };

    componentDidMount() {
        this.getAll();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.page !== this.props.page ||
            prevProps.category !== this.props.category
        ) {
            this.getAll();
            document.documentElement.scrollTop = 0;
        }
    }

    render() {
        const { category, all, lastPage, page } = this.props;
        return (
            <CategoryList
                categories={data.categories}
                category={category}
                all={all}
                lastPage={lastPage}
                page={page}
            />
        );
    }
}
export default connect(
    state => ({
        all: state.list.get('all'),
        lastPage: state.list.get('lastPage'),
    }),
    dispatch => ({
        ListActions: bindActionCreators(listActions, dispatch),
    })
)(CategoryListContainer);
