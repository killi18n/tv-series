import React, { Component } from 'react';
import YouTube from 'react-youtube';
import classNames from 'classnames/bind';
// import EpisodeItem from 'components/EpisodeItem/EpisodeItem';
import LoadMoreEpisode from 'components/contents/LoadMoreEpisode';
import styles from './EpisodeItemList.scss';

const cx = classNames.bind(styles);

class EpisodeItemList extends Component {
  state = {
    limit: 2,
  };

  handlePlayEpisode = id => {
    console.log(`Playing episode ${id}`);
  };

  handleLoadMore = () => {
    const { teasers } = this.props;
    const { limit } = this.state;

    const nextLimit = limit + 3;

    this.setState({
      limit: nextLimit > teasers.length ? teasers.length : nextLimit,
    });
  };

  render() {
    const { teasers } = this.props;
    const { limit } = this.state;
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 0,
      },
    };
    if (teasers === undefined) return null;
    const teaserList = teasers
      .slice(0, limit)
      .map(teaser => (
        <YouTube
          key={teaser._id}
          videoId={teaser.videoId}
          opts={opts}
          onReady={this._onReady}
        />
      ));

    return (
      <div className={cx('EpisodeItemList')}>
        {teaserList}
        {teasers.length > limit && (
          <LoadMoreEpisode onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}

export default EpisodeItemList;
