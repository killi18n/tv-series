import React, { Component } from 'react';
import styles from './SeriesList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import SeriesItem from 'components/SeriesItem/SeriesItem';
const cx = classNames.bind(styles);

class SeriesList extends Component {
  render() {
    const { series, top4Rated, brand4 } = this.props;
    const seriesList = series.map(
      series => (
        <SeriesItem
          id={series.id}
          key={series.id}
          thumbnail={series.img}
          name={series.name} />
      )
    );


    const top4List = top4Rated.map(
      (list, i) => {
        return (
          <SeriesItem
            id={list.get("_id")}
            key={list.get("_id")}
            thumbnail={list.get("thumbnail")}
            name={list.get("name")}/>
        )
      }
    );

    const brand4List = brand4.map(
      (list, i) => {
        return (
          <SeriesItem
            id={list.get("_id")}
            key={list.get("_id")}
            thumbnail={list.get("thumbnail")}
            name={list.get("name")}/>
        )
      }
    );
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
            top4List
          }
        </div>
        <div className={cx('label')}>
          <div className={cx('left-label')}>
            Brand New Seires
        </div>
          <div className={cx('right-label')}>
            View All
        </div>
        </div>
        <div className={cx('ListWrapper')}>
          {
            brand4List
          }
        </div>
      </div>
    );
  }
}

export default SeriesList;