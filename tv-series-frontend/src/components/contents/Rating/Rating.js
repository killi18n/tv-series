import React, { Fragment } from 'react';
import ThumbUpIcon from 'react-icons/lib/fa/thumbs-o-up';
import ThumbDownIcon from 'react-icons/lib/fa/thumbs-o-down';
import SelectedUpIcon from 'react-icons/lib/fa/thumbs-up';
import SelectedDownIcon from 'react-icons/lib/fa/thumbs-down';
import classNames from 'classnames/bind';
import styles from './Rating.scss';

const cx = classNames.bind(styles);

const Rating = ({ onRate, selected, liked }) => {
  const handleRateUp = () => {
    // console.log('good');
    onRate({ what: 'good' });
  };

  const handleRateDown = () => {
    // console.log('bad');
    onRate({ what: 'bad' });
  };

  return (
    <div className={cx('rating')}>
      {selected ? (
        liked ? (
          <Fragment>
            <div className={cx('item')} onClick={handleRateUp}>
              <SelectedUpIcon />
            </div>
            <div className={cx('item')} onClick={handleRateDown}>
              <ThumbDownIcon />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={cx('item')} onClick={handleRateUp}>
              <ThumbUpIcon />
            </div>
            <div className={cx('item')} onClick={handleRateDown}>
              <SelectedDownIcon />
            </div>
          </Fragment>
        )
      ) : (
        <Fragment>
          <div className={cx('item')} onClick={handleRateUp}>
            <ThumbUpIcon />
          </div>
          <div className={cx('item')} onClick={handleRateDown}>
            <ThumbDownIcon />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Rating;
