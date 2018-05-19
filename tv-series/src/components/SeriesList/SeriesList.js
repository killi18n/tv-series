import React, { Component } from 'react';
import styles from './SeriesList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import SeriesItem from 'components/SeriesItem/SeriesItem';
const cx = classNames.bind(styles);

class SeriesList extends Component {
  render() {
    const { series } = this.props;
    const seriesList = series.map(
      series => (
        <SeriesItem
          id={series.id}
          key={series.id}
          thumbnail={series.img}
          name={series.name} />
      )
    )
    return (
      <div className={cx('SeriesList')}>
        <div className={cx('label')}>
          <div className={cx('left-label')}>
            Top-Rated Series
        </div>
          <div className={cx('right-label')}>
            View All
        </div>
        </div>
        <div className={cx('ListWrapper')}>
          {
            seriesList
          }
        </div>
        <div className={cx('label')}>
          <div className={cx('left-label')}>
            Top-Rated Series
        </div>
          <div className={cx('right-label')}>
            View All
        </div>
        </div>
        <div className={cx('ListWrapper')}>
          {
            seriesList
          }
        </div>
      </div>
    );
  }
}

export default SeriesList;