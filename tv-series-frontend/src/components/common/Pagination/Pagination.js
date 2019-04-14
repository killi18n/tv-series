import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Pagination = ({ page, lastPage }) => {
  const createPagePath = (page) => {
    return `/list/all/${page}`;
  }
  return (
    <div className={cx('pagination')}>
      {
        parseInt(page, 10) === 1 ?
          <div className={cx('button')}>
            이전 페이지
          </div>
          :
          <Link className={cx('button')}to={createPagePath(parseInt(page, 10) - 1)}>
            이전 페이지
          </Link>
      }

      <div className={cx('number')}>
        페이지 {page}
      </div>
      {
        parseInt(page, 10) === parseInt(lastPage, 10) ?
          <div className={cx('button')}>
            다음 페이지
          </div>
          :
          <Link className={cx('button')} to={createPagePath(parseInt(page, 10) + 1)}>
            다음 페이지
          </Link>
      }
    </div>
  );

}
export default Pagination;