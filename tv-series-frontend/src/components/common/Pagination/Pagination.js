import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Pagination.scss';

const cx = classNames.bind(styles);

const Pagination = ({ page, lastPage }) => {
  const createPagePath = pageNum => {
    return `/list/all/${pageNum}`;
  };
  return (
    <div className={cx('pagination')}>
      {parseInt(page, 10) === 1 ? (
        <div className={cx('button')}>이전 페이지</div>
      ) : (
        <Link
          className={cx('button')}
          to={createPagePath(parseInt(page, 10) - 1)}
        >
          이전 페이지
        </Link>
      )}

      <div className={cx('number')}>페이지 {page}</div>
      {parseInt(page, 10) === parseInt(lastPage, 10) ? (
        <div className={cx('button')}>다음 페이지</div>
      ) : (
        <Link
          className={cx('button')}
          to={createPagePath(parseInt(page, 10) + 1)}
        >
          다음 페이지
        </Link>
      )}
    </div>
  );
};
export default Pagination;
