import React from 'react';
import styles from './ListPageHeader.scss';
import classNames from 'classnames/bind';
// import MenuIcon from 'react-icons/lib/md/menu';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ListPageHeader = ({ showAuthForm }) => (
    <div className={cx('ListPageHeader')}>
        <div className={cx('contents')}>
            <Link to="/" className={cx('logo')}>
                Fresh Tomato
            </Link>
            <div className={cx('header-right')}>
                <div className={cx('top-header-right')}>
                    <div
                        className={cx('top-header-right-text')}
                        onClick={() => showAuthForm({ type: 'login' })}
                    >
                        login
                    </div>
                    <div
                        className={cx('top-header-right-text')}
                        onClick={() => showAuthForm({ type: 'register' })}
                    >
                        sign up
                    </div>
                </div>
                <div className={cx('bottom-header-right')}>
                    <Link to="/list/all" className={cx('bottom-header-text')}>
                        See All
                    </Link>
                </div>
            </div>
            {/* <div className={cx('menu-wrapper')}>
        <div className={cx('menu-button')} onClick={onMenuClick}><MenuIcon /></div>
      </div> */}
        </div>
    </div>
);

export default ListPageHeader;
