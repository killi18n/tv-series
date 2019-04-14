import React from 'react';
import ListPageTemplate from 'components/common/ListPageTemplate';
import CategoryListContainer from 'containers/CategoryListContainer';

const CategoryListPage = ({ match }) => {
    const { category, page = 1 } = match.params;
    return (
        <ListPageTemplate>
            <CategoryListContainer category={category} page={page} />
        </ListPageTemplate>
    );
};

export default CategoryListPage;
