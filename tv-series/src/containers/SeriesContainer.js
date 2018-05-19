import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as seriesActions from 'store/modules/series';
import * as baseActions from 'store/modules/base';
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
    render() {
        const { showSideBar } = this;
        const { id } = this.props;
        const series = data.series.find(
            series => {
                return series.id === parseInt(id, 10);
            }
        );

        const seriesDetail = series.detail;
        return (
            <SeriesTemplate>
                <SeriesHeader
                    thumbnail={seriesDetail.img}
                    name={seriesDetail.name}
                    genres={seriesDetail.genres}
                    startYear={seriesDetail.start_year}
                    endYear={seriesDetail.end_year}
                    onClickMenu={showSideBar}
                    onClickPlayNow={this.handleClickPlayNow} />
                <SeriesMain
                    story={seriesDetail.story}
                    episodes={seriesDetail.episodes}
                    actors={seriesDetail.actors} />
                <SideBarContainer/>
            </SeriesTemplate>
        )
    }
}
export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        // SeriesActions: bindActionCreators(seriesActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(SeriesContainer);