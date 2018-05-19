import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CategoryList from 'components/CategoryList/CategoryList';
import data from 'data.json';
// // import * as MyActionModule from 'store/modules/MyActionModule';

class CategoryListContainer extends Component {
 
    render() {
        const { category } = this.props;
        return (
            <CategoryList categories={data.categories} category={category}/>
        )
    }
}
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
    })
)(CategoryListContainer);