import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as rateActions from 'store/modules/rate';
import Rating from 'components/contents/Rating';
import storage from 'lib/storage';
import { withRouter } from 'react-router-dom';

class RatingContainer extends Component {
  componentDidMount() {
    this.initialize();
    this.getRatingOfItem();
    this.getRatedList();
  }

  initialize = () => {
    const { RateActions } = this.props;
    RateActions.initialize();
  };

  getRatingOfItem = async () => {
    const { RateActions, id } = this.props;

    try {
      await RateActions.getRatingOfItem({ id });
    } catch (e) {
      throw new Error(e);
    }
  };

  getRatedList = async () => {
    const { RateActions, id } = this.props;
    const loggedInfo = storage.get('loggedInfo');

    if (!loggedInfo) {
      return;
    }

    try {
      await RateActions.getRatedList({ email: loggedInfo });
      const { rated } = this.props;
      rated.toJS().forEach(rate => {
        if (rate.itemId === id) {
          if (rate.good === 1) {
            RateActions.setSelected({ what: true });
          } else {
            RateActions.setSelected({ what: false });
          }
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  handleRate = async ({ what }) => {
    const { BaseActions, RateActions, id } = this.props;
    const loggedInfo = storage.get('loggedInfo');

    if (!loggedInfo) {
      BaseActions.showAuthFormModal({ type: 'login' });
      return;
    }

    try {
      await RateActions.rate({ postId: id, what, email: loggedInfo });
      this.getRatingOfItem();
      this.getRatedList();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { selected, liked, hated } = this.props;
    const { handleRate } = this;
    return (
      <Rating
        onRate={handleRate}
        selected={selected}
        liked={liked}
        hated={hated}
      />
    );
  }
}
export default connect(
  state => ({
    hit: state.rate.get('hit'),
    good: state.rate.get('good'),
    bad: state.rate.get('bad'),
    rated: state.rate.get('rated'),
    selected: state.rate.get('selected'),
    liked: state.rate.get('liked'),
    hated: state.rate.get('hated'),
  }),
  dispatch => ({
    RateActions: bindActionCreators(rateActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(withRouter(RatingContainer));
