import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Pagination = ({ page, lastPage }) => {
  const createPagePath = (page) => {
    return `/page/${page}`;
  }
  return (
    <div className={cx('pagination')}>
      <div className={cx('button')} disabled={page === 1} to={createPagePath(page - 1)}>
        이전 페이지
      </div>
      <div className={cx('number')}>
        페이지 {page}
      </div>
      <div className={cx('button')} disabled={page === lastPage} to={createPagePath(page + 1)}>
        다음 페이지
      </div>
    </div>
  );

}
export default Pagination;