import React from 'react';
import ListPageTemplate from 'components/common/ListPageTemplate';
import SeriesListContainer from 'containers/SeriesListContainer';

const SeriesListPage = () => {
    return (
        <ListPageTemplate>
            <SeriesListContainer />
        </ListPageTemplate>
    );
};

export default SeriesListPage;
