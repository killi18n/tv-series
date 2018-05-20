import React, { Fragment } from 'react';
import SeriesContainer from 'containers/SeriesContainer';
import AskPostModalContainer from 'containers/AskPostModalContainer';

const SeriesPage = ({ match }) => {
    const { id } = match.params;
    return (
        <Fragment>
            <SeriesContainer id={id} />
            <AskPostModalContainer id={id} />
        </Fragment>
    );
};

export default SeriesPage;