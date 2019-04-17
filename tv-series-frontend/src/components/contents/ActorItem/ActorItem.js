import React from 'react';

import classNames from 'classnames/bind';
import styles from './ActorItem.scss';

const cx = classNames.bind(styles);

const ActorItem = ({ thumbnail, name }) => (
  <div className={cx('ActorItem')}>
    <div className={cx('thumbnail')}>
      <img src={`/uploads/${thumbnail}`} alt="thumbnail-actor" />
    </div>
    <div className={cx('name')}>{name}</div>
  </div>
);

export default ActorItem;
