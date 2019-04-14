import React from 'react';
import styles from './Introduction.scss';
import classNames from 'classnames/bind';
import data from 'intro.json';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Introduction = () => (
  <div className={cx('Introduction')}>
    <div className={cx('contents')}>
      <div className={cx('label')}>
        {data.labelIntroduction}
      </div>
      <div className={cx('description')}>
        {data.descriptionIntroduction}
      </div>
      <div className={cx('label')}>
        {data.labelMaker}
      </div>
      <div className={cx('description')}>
        {data.descriptionMaker}
      </div>
      <div className={cx('label')}>
        {data.labelGithubLink}
      </div>
      <div className={cx('description')}>
        <a href={data.descriptionGithubLink}>
          {data.descriptionGithubLink}
        </a>
      </div>
    </div>
  </div>
);

export default Introduction;