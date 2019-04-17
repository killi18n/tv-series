import React from 'react';
import classNames from 'classnames/bind';
import styles from './SideBarWrapper.scss';

const cx = classNames.bind(styles);

const SideBarWrapper = ({ children, visible }) => (
  <div className={cx('SideBarWrapper', { hidden: !visible })}>{children}</div>
);

export default SideBarWrapper;
