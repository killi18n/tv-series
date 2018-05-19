import React from 'react';
import styles from './SideBar.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SideBar = ({ onMenuClick, onHide, logged, onLogout }) => (
  <div className={cx('SideBar')} onClick={onMenuClick}>
    <div className={cx('contents')}>
      <Link to="/introduction" className={cx('menu')} onClick={onHide}>
        <div className={cx('text')}>
          소개 페이지
        </div>
      </Link>
      <Link to="/list/all" className={cx('menu')} onClick={onHide}>
        <div className={cx('text')}>
          모든 미드 보기
        </div>
      </Link>
      {
        logged ? [
          <div className={cx('menu')} onClick={onLogout} key="logout">
            <div className={cx('text')}>
              로그아웃
            </div>
          </div>
        ] :
          [
            <Link to="/auth/login" className={cx('menu')} onClick={onHide} key="login">
              <div className={cx('text')}>
                로그인 / 회원가입
              </div>
            </Link>
          ]
      }
    </div>
  </div>
);

export default SideBar;