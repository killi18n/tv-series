import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as rateActions from 'store/modules/rate';
import RatingResult from 'components/contents/RatingResult';

class RatingResultContainer extends Component {
  componentDidMount() {
    this.getRating();
  }

  getRating = async () => {
    const { RateActions, id } = this.props;

    try {
      await RateActions.getRatingOfItem({ id });
      // console.log(this.props.hit);
    } catch (e) {
      throw new Error(e);
    }
  };

  render() {
    const { hit, good, bad } = this.props;
    return <RatingResult hit={hit} good={good} bad={bad} />;
  }
}
export default connect(
  state => ({
    hit: state.rate.get('hit'),
    good: state.rate.get('good'),
    bad: state.rate.get('bad'),
  }),
  dispatch => ({
    RateActions: bindActionCreators(rateActions, dispatch),
  })
)(RatingResultContainer);
