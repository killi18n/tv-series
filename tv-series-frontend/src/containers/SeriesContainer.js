import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as seriesActions from 'store/modules/series';
import * as baseActions from 'store/modules/base';
import * as listActions from 'store/modules/list';
import SeriesTemplate from 'components/contents/SeriesTemplate';
import SeriesMain from 'components/contents/SeriesMain';
import SeriesHeader from 'components/contents/SeriesHeader';
// import data from 'data.json';
import SideBarContainer from 'containers/SideBarContainer';

class SeriesContainer extends Component {
    showSideBar = () => {
        const { BaseActions } = this.props;
        BaseActions.showSideBar();
    };

    showPostModal = () => {
        const { BaseActions } = this.props;
        BaseActions.showPostModal();
    };

    getSeries = async () => {
        const { ListActions, id } = this.props;

        try {
            await ListActions.getSeriesById({ id });
        } catch (e) {
            console.log(e);
        }
    };

    initializeSeries = () => {
        const { ListActions } = this.props;
        ListActions.initializeSeries();
    };

    componentDidMount() {
        this.getSeries();
    }

    // componentWillUnmount() {
    //     this.initializeSeries();
    // }

    render() {
        const { showSideBar, showPostModal } = this;
        const { id, series, admin } = this.props;

        if (series === undefined) return null;
        return (
            <SeriesTemplate>
                <SeriesHeader
                    thumbnail={series.thumbnail}
                    name={series.name}
                    genres={series.genre}
                    startYear={series.startYear}
                    endYear={series.endYear}
                    onClickMenu={showSideBar}
                    onClickPlayNow={this.handleClickPlayNow}
                    admin={admin}
                    showPostModal={showPostModal}
                />
                <SeriesMain
                    id={id}
                    story={series.story}
                    teasers={series.teasers}
                    actors={series.actors}
                />
                <SideBarContainer />
            </SeriesTemplate>
        );
    }
}
export default connect(
    state => ({
        series: state.list.get('series'),
        admin: state.auth.get('admin'),
    }),
    dispatch => ({
        // SeriesActions: bindActionCreators(seriesActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch),
        ListActions: bindActionCreators(listActions, dispatch),
    })
)(SeriesContainer);
