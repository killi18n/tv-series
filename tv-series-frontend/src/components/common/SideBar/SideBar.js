import React from 'react';
import styles from './SideBar.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SideBar = ({ onMenuClick, onHide, logged, onLogout }) => (
    <div className={cx('SideBar')} onClick={onMenuClick}>
        <div className={cx('contents')}>
            <Link to="/introduction" className={cx('menu')} onClick={onHide}>
                <div className={cx('text')}>Introduction</div>
            </Link>
            <Link to="/list/all" className={cx('menu')} onClick={onHide}>
                <div className={cx('text')}>See All</div>
            </Link>
            {logged
                ? [
                      <div
                          className={cx('menu')}
                          onClick={onLogout}
                          key="logout"
                      >
                          <div className={cx('text')}>Logout</div>
                      </div>,
                  ]
                : [
                      <Link
                          to="/auth/login"
                          className={cx('menu')}
                          onClick={onHide}
                          key="login"
                      >
                          <div className={cx('text')}>Sign In / Sign Up</div>
                      </Link>,
                  ]}
        </div>
    </div>
);

export default SideBar;
