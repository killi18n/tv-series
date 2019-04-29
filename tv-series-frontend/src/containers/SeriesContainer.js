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
// import SideBarContainer from 'containers/SideBarContainer';

class SeriesContainer extends Component {
  componentDidMount() {
    if (window.shouldCancel) return;
    this.getSeries();
  }

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
      throw new Error(e);
    }
  };

  initializeSeries = () => {
    const { ListActions } = this.props;
    ListActions.initializeSeries();
  };

  // componentWillUnmount() {
  //     this.initializeSeries();
  // }

  render() {
    const { showSideBar, showPostModal } = this;
    const { id, series, admin, loading } = this.props;

    // if (series === undefined) return null;
    return (
      <SeriesTemplate>
        <SeriesHeader
          loading={loading}
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
          loading={loading}
          id={id}
          story={series.story}
          teasers={series.teasers}
          actors={series.actors}
        />
        {/* <SideBarContainer /> */}
      </SeriesTemplate>
    );
  }
}
export default connect(
  state => ({
    series: state.list.get('series'),
    admin: state.auth.get('admin'),
    loading: state.pender.pending['list/GET_SERIES_BY_ID'],
  }),
  dispatch => ({
    // SeriesActions: bindActionCreators(seriesActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    ListActions: bindActionCreators(listActions, dispatch),
  })
)(SeriesContainer);
