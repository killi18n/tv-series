import React from 'react';
import styles from './PageFooter.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const PageFooter = ({admin}) => (
  <div className={cx('footer')}>
    <Link to="/" className={cx('logo')}>
      Fresh Tomato
    </Link>
    {
      admin &&
      <Link to="/editor" className={cx('admin')}>
        포스트 작성
      </Link>
    }
  </div>
);

export default PageFooter;