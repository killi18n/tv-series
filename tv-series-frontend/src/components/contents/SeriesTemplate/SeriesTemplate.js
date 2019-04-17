import React from 'react';
import classNames from 'classnames/bind';
import styles from './SeriesTemplate.scss';

const cx = classNames.bind(styles);

const SeriesTemplate = ({ children }) => (
  <div className={cx('series-template')}>{children}</div>
);

export default SeriesTemplate;
