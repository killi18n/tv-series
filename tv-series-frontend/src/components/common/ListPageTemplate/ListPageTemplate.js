import React from 'react';
import styles from './ListPageTemplate.scss';
import classNames from 'classnames/bind';
import SideBarContainer from 'containers/SideBarContainer';
import ListHeaderContainer from 'containers/ListHeaderContainer';
import FooterContainer from 'containers/FooterContainer';

const cx = classNames.bind(styles);

const ListPageTemplate = ({ children }) => (
  <div className={cx('ListPageTemplate')}>
    <ListHeaderContainer />
    <main>
    {children}
    </main>
    <FooterContainer/>
    <SideBarContainer/>
  </div>
);

export default ListPageTemplate;