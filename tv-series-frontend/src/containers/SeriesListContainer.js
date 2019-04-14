import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SeriesList from '../components/SeriesList/SeriesList';
import data from 'data.json';
import * as listActions from 'store/modules/list';

class SeriesListContainer extends Component {
    getLists = async () => {
        const { ListActions } = this.props;

        try {
            await ListActions.getTop4Rated();
            await ListActions.getBrand4();
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getLists();

    }
    render() {
        const { series } = data;
        const { top4Rated, brand4 } = this.props;
        return (
            <SeriesList 
                series={series}
                top4Rated={top4Rated}
                brand4={brand4}/>
        )
    }
}
export default connect(
    (state) => ({
        top4Rated: state.list.get('top4'),
        brand4: state.list.get('brand4')
    }),
    (dispatch) => ({
        ListActions: bindActionCreators(listActions, dispatch)
    })
)(SeriesListContainer);