import React from 'react';
import styles from './EpisodeItem.scss';
import classNames from 'classnames/bind';
import PlayIcon from 'react-icons/lib/md/play-arrow';


const cx = classNames.bind(styles);

const EpisodeItem = ({ thumbnail, name, id, onClick }) => {
  return (
    <div className={cx('EpisodeItem')} onClick={() => onClick(id)}>
      <div className={cx('episode-thumbnail')}>
        <img src={thumbnail} alt="episode-thumbnail" />
        <div className={cx('play-circle')}>
          <PlayIcon/>
        </div>
      </div>
      <div className={cx('title')}>
        {name}
      </div>
    </div>
  );
}

export default EpisodeItem;