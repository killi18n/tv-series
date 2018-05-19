import React from 'react';
import styles from './SeriesMain.scss';
import classNames from 'classnames/bind';
import EpisodeItemList from 'components/EpisodeItemList';
import ActorList from 'components/ActorList';

import Rating from 'components/Rating/Rating';
import RatingContainer from 'containers/RatingContainer';
import RatingResultContainer from 'containers/RatingResultContainer';

const cx = classNames.bind(styles);

const SeriesMain = ({ teasers, story, actors, id }) => (
  <div className={cx('SeriesMain')}>
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <section>
          <h2>평가 하기</h2>
          <RatingContainer id={id}/>
        </section>
        <section>
            <h2>Rating</h2>
            <RatingResultContainer id={id}/>
        </section>
        <section>
          <h2>티저 영상</h2>
          <EpisodeItemList teasers={teasers} />
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