import React from 'react';
import styles from './CategoryItem.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const CategoryItem = ({ thumbnail, name, id }) => (
  <Link to={`/series/${id}`} className={cx('OneLine')}>
    <div className={cx('left')}>
      <div className={cx('thumbnail')}>
        <img src={`/uploads/${thumbnail}`} alt="thumbnail-category" />
      </div>
    </div>
    <div className={cx('right')}>
      <div className={cx('title')}>
        {name}
      </div>
      <div className={cx('actors')}>
        데이비드 준톨리, 샤샤 로이즈
      </div>
    </div>
  </Link>
);

export default CategoryItem;