import React from 'react';
import classNames from 'classnames/bind';
import styles from './RatingResult.scss';

const cx = classNames.bind(styles);

const RatingResult = ({ hit, good, bad }) => {
  // componentDidUpdate(prevProps, prevState) {
  //   if(prevProps.hit !== this.props.hit) {
  //     console.log(prevProps.hit);
  //     console.log(this.props.hit);
  //   }
  // }
  let likedFlex = null;
  let hatedFlex = null;
  if (hit === 0 && good === 0 && bad === 0) {
    likedFlex = {
      flex: 0.5,
    };
    hatedFlex = {
      flex: 0.5,
    };
  } else {
    likedFlex = {
      flex: good / hit,
    };

    hatedFlex = {
      flex: bad / hit,
    };
  }
  if (hit === null) return null;
  return (
    <div className={cx('RatingResult')}>
      <div className={cx('bar')}>
        <div className={cx('liked')} style={likedFlex}>
          <div
            className={cx('text')}
            style={{ display: likedFlex.flex === 0 ? 'none' : 'block' }}
          >
            Liked!
          </div>
        </div>
        <div className={cx('hated')} style={hatedFlex}>
          <div
            className={cx('text')}
            style={{ display: hatedFlex.flex === 0 ? 'none' : 'block' }}
          >
            Hated...
          </div>
        </div>
      </div>
      <div className={cx('desc')}>
        <div className={cx('item')}>hit: {hit}</div>
        <div className={cx('item')}>liked: {good}</div>
        <div className={cx('item')}>hated: {bad}</div>
      </div>
    </div>
  );
};

export default RatingResult;
