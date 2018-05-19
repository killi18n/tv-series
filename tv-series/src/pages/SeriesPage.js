import React from 'react';
import SeriesContainer from 'containers/SeriesContainer';

const SeriesPage = ({match}) => {
    const { id } = match.params;
    return (
        <SeriesContainer id={id}/>
    );
};

export default SeriesPage;