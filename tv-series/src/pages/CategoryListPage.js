import React from 'react';
import ListPageTemplate from 'components/ListPageTemplate/ListPageTemplate';
import CategoryListContainer from 'containers/CategoryListContainer';

const CategoryListPage = ({match}) => {
    const {category} = match.params;
    return (
        <ListPageTemplate>
            <CategoryListContainer category={category}/>
        </ListPageTemplate>
    );
};

export default CategoryListPage;