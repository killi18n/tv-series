import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SeriesList from '../components/SeriesList/SeriesList';
import data from 'data.json';
// import * as MyActionModule from 'store/modules/MyActionModule';

class SeriesListContainer extends Component {
    render() {
        const { series } = data;
        return (
            <SeriesList series={series}/>
        )
    }
}
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
    })
)(SeriesListContainer);