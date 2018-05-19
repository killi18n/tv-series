import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as seriesActions from 'store/modules/series';
import * as baseActions from 'store/modules/base';
import * as listActions from 'store/modules/list';
import SeriesTemplate from 'components/SeriesTemplate/SeriesTemplate';
import SeriesMain from 'components/SeriesMain/SeriesMain';
import SeriesHeader from 'components/SeriesHeader/SeriesHeader';
import data from 'data.json';
import SideBarContainer from 'containers/SideBarContainer';

class SeriesContainer extends Component {
    showSideBar = () => {
        const { BaseActions } = this.props;
        BaseActions.showSideBar();
    }

    getSeries = async () => {
        const { ListActions, id } = this.props;

        try {
            await ListActions.getSeriesById({id});
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getSeries();
    }

    render() {
        const { showSideBar } = this;
        const { id, series } = this.props;
        // const series = data.series.find(
        //     series => {
        //         return series.id === parseInt(id, 10);
        //     }
        // );

        // const seriesDetail = series.detail;
        // if(series)
        if(series === undefined) return null;
        return (
            <SeriesTemplate>
                <SeriesHeader
                    thumbnail={series.thumbnail}
                    name={series.name}
                    genres={series.genre}
                    startYear={series.startYear}
                    endYear={series.endYear}
                    onClickMenu={showSideBar}
                    onClickPlayNow={this.handleClickPlayNow} />
                <SeriesMain
                    id={id}
                    story={series.story}
                    teasers={series.teasers}
                    actors={series.actors} />
                <SideBarContainer/>
            </SeriesTemplate>
        )
    }
}
export default connect(
    (state) => ({
        series: state.list.get('series')
    }),
    (dispatch) => ({
        // SeriesActions: bindActionCreators(seriesActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch),
        ListActions: bindActionCreators(listActions, dispatch)
    })
)(SeriesContainer);