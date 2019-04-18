import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import CategoryList from 'components/contents/CategoryList';
import data from 'data.json';
import * as listActions from 'store/modules/list';

class CategoryListContainer extends Component {
  componentDidMount() {
    this.getAll();
  }

  componentDidUpdate(prevProps) {
    const { page, category } = this.props;
    const { page: prevPage, category: prevCategory } = prevProps;
    if (prevPage !== page || prevCategory !== category) {
      this.getAll();
      document.documentElement.scrollTop = 0;
    }
  }

  getAll = async () => {
    const { ListActions, page, category } = this.props;

    try {
      await ListActions.getAll({ page, genre: category });
    } catch (e) {
      throw new Error(e);
    }
  };

  handleClickTag = ({ tag }) => {
    const { history } = this.props;
    history.push(`/list/${tag}`);
  };

  render() {
    const { category, all, lastPage, page } = this.props;
    const { handleClickTag } = this;
    return (
      <CategoryList
        categories={data.categories}
        category={category}
        all={all}
        lastPage={lastPage}
        page={page}
        onClickTag={handleClickTag}
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
)(withRouter(CategoryListContainer));
