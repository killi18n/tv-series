import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './PageFooter.scss';

const cx = classNames.bind(styles);

const PageFooter = ({ admin }) => (
  <div className={cx('footer')}>
    <div className={cx('Column')}>
      <Link to="/" className={cx('logo')}>
        Fresh Tomato
      </Link>
    </div>
    {/* <div className={cx('Column')}>
      <Link className={cx('column-text')} to="/introduction">
        Introduction
      </Link>
    </div> */}

    {admin && (
      <Link to="/editor" className={cx('Column')}>
        <div className={cx('column-text')}>Upload Post</div>
      </Link>
    )}
  </div>
);

export default PageFooter;
