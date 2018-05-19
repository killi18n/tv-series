import React from 'react';
import styles from './SeriesTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SeriesTemplate = ({children}) => (
  <div className={cx('series-template')}>
    {children}
  </div>
);

export default SeriesTemplate;