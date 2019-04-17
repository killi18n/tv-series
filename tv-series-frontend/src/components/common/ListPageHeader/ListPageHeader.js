import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ListPageHeader.scss';

const cx = classNames.bind(styles);

const ListPageHeader = ({ showAuthForm, logged, onLogout }) => (
  <div className={cx('ListPageHeader')}>
    <div className={cx('contents')}>
      <Link to="/" className={cx('logo')}>
        Fresh Tomato
      </Link>
      <div className={cx('header-right')}>
        {!logged && (
          <div className={cx('top-header-right')}>
            <div
              className={cx('top-header-right-text')}
              onClick={() => showAuthForm({ type: 'login' })}
            >
              Sign in
            </div>
            <div
              className={cx('top-header-right-text')}
              onClick={() => showAuthForm({ type: 'register' })}
            >
              Sign up
            </div>
          </div>
        )}
        <div className={cx('bottom-header-right')}>
          <Link to="/list/all" className={cx('bottom-header-text')}>
            See All
          </Link>
          {logged && (
            <div className={cx('bottom-header-text')} onClick={onLogout}>
              Sign out
            </div>
          )}
        </div>
      </div>
      {/* <div className={cx('menu-wrapper')}>
        <div className={cx('menu-button')} onClick={onMenuClick}><MenuIcon /></div>
      </div> */}
    </div>
  </div>
);

export default ListPageHeader;
