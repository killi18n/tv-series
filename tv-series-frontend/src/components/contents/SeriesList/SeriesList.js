import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import SeriesItem from 'components/contents/SeriesItem';
import styles from './SeriesList.scss';

const cx = classNames.bind(styles);

const SeriesList = ({ top4Rated, brand4 }) => {
  const top4List = top4Rated.map(list => {
    return (
      <SeriesItem
        id={list.get('_id')}
        key={list.get('_id')}
        thumbnail={list.get('thumbnail')}
        name={list.get('name')}
      />
    );
  });

  const brand4List = brand4.map(list => {
    return (
      <SeriesItem
        id={list.get('_id')}
        key={list.get('_id')}
        thumbnail={list.get('thumbnail')}
        name={list.get('name')}
      />
    );
  });

  return (
    <div className={cx('SeriesList')}>
      <div className={cx('label')}>
        <div className={cx('left-label')}>Top-Rated Series</div>
        <Link to="/list/all" className={cx('right-label')}>
          View All
        </Link>
      </div>
      <div className={cx('ListWrapper')}>{top4List}</div>
      <div className={cx('label')}>
        <div className={cx('left-label')}>Brand New Seires</div>
        <Link to="/list/all" className={cx('right-label')}>
          View All
        </Link>
      </div>
      <div className={cx('ListWrapper')}>{brand4List}</div>
    </div>
  );
};

export default SeriesList;
