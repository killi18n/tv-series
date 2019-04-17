import React from 'react';
import classNames from 'classnames/bind';
import MoreIcon from 'react-icons/lib/md/more-horiz';
import styles from './LoadMoreEpisode.scss';

const cx = classNames.bind(styles);

const LoadMoreEpisode = ({ onClick }) => (
  <div className={cx('LoadMoreEpisode')} onClick={onClick}>
    <div className={cx('icon-circle')}>
      <MoreIcon />
    </div>
    <div className={cx('text')}>더보기</div>
  </div>
);

export default LoadMoreEpisode;
