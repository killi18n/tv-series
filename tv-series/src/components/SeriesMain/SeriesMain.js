import React from 'react';
import styles from './SeriesMain.scss';
import classNames from 'classnames/bind';
import EpisodeItemList from 'components/EpisodeItemList';
import ActorList from 'components/ActorList';

const cx = classNames.bind(styles);

const SeriesMain = ({ episodes, story, actors }) => (
  <div className={cx('SeriesMain')}>
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <section>
          <h2>티저 영상</h2>
          <EpisodeItemList episodes={episodes} />
        </section>
        <section>
          <h2>배우</h2>
          <ActorList actors={actors}/>
        </section>
        <section>
          <h2>줄거리</h2>
          <p>{story}</p>
        </section>
      </div>
    </div>
  </div>
);

export default SeriesMain;