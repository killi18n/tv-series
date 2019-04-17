import React from 'react';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SeriesItem.scss';

const cx = classNames.bind(styles);

const SeriesItem = ({ id, thumbnail, name }) => (
  <Link to={`/series/${id}`} className={cx('list')}>
    <div className={cx('thumbnail')}>
      <img src={`/uploads/${thumbnail}`} alt="thumbnail-series" />
    </div>
    <div className={cx('title')}>{name}</div>
  </Link>
);

export default SeriesItem;
