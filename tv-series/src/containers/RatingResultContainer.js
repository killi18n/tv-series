import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as rateActions from 'store/modules/rate';
import RatingResult from 'components/RatingResult/RatingResult';

class RatingResultContainer extends Component {

    getRating = async () => {
        const { RateActions, id } = this.props;

        try {
            await RateActions.getRatingOfItem({id});
            console.log(this.props.hit);
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getRating();
    }

    render() {
        const { hit, good, bad, loading } = this.props;
        return (
            <RatingResult
                hit={hit}
                good={good}
                bad={bad}/>
        )
    }
}
export default connect(
    (state) => ({
        hit: state.rate.get('hit'),
        good: state.rate.get('good'),
        bad: state.rate.get('bad')
    }),
    (dispatch) => ({
        RateActions: bindActionCreators(rateActions, dispatch)
    })
)(RatingResultContainer);