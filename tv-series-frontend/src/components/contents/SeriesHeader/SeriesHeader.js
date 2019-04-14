import React from 'react';
import styles from './SeriesHeader.scss';
import classNames from 'classnames/bind';
import MenuIcon from 'react-icons/lib/md/menu';
import PlayIcon from 'react-icons/lib/md/play-arrow';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SeriesHeader = ({
  thumbnail,
  name,
  genres,
  startYear,
  endYear,
  onClickMenu,
  onClickPlayNow,
  admin,
  showPostModal }) => {
  if (genres === undefined) return null;
  return (
    <div className={cx('SeriesHeader')}>
      <div className={cx('wrapper')}>
        <header>
          <Link to="/" className="logo">Fresh Tomato</Link>
          <div className={cx('menu-button')} onClick={onClickMenu}><MenuIcon /></div>
        </header>
        <div className={cx('header-contents')}>
          <div className={cx("thumbnail-area")}>
            <div className={cx("floating-thumbnail")}>
              <img src={`/uploads/${thumbnail}`} alt="thumbnail" />
            </div>
          </div>
          <div className={cx('information')}>
            <div>
              <h1>{name}</h1>
              <div className={cx("sub-info")}>
                <span>
                  
                {genres.map(
                  (genre, i) => {
                    return <Link to={`/list/${genre}`} key={genre}>{"#" + genre}</Link>
                  }
                )}
                </span>
                <span>{startYear}-{endYear}</span>
              </div>
            </div>
            {
              admin &&
              <div className={cx("play-button")} onClick={showPostModal}>
                수정 / 삭제
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeriesHeader;