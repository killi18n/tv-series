import React from 'react';
import styles from './ListPageHeader.scss';
import classNames from 'classnames/bind';
import MenuIcon from 'react-icons/lib/md/menu';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ListPageHeader = ({ onMenuClick }) => (
  <div className={cx('ListPageHeader')}>
    <div className={cx('contents')}>
      <Link to="/" className={cx('logo')}>
        Fresh Tomato
      </Link>
      <div className={cx('menu-wrapper')}>
        <div className={cx('menu-button')} onClick={onMenuClick}><MenuIcon /></div>
      </div>
    </div>
  </div>
);

export default ListPageHeader;