import React, { Component } from 'react';
import styles from './EpisodeItemList.scss';
import classNames from 'classnames/bind';
import EpisodeItem from 'components/EpisodeItem/EpisodeItem';
import LoadMoreEpisode from 'components/LoadMoreEpisode/LoadMoreEpisode';

const cx = classNames.bind(styles);

class EpisodeItemList extends Component {
  state = {
    limit: 2,
  }

  handlePlayEpisode = (id) => {
    console.log(`Playing episode ${id}`);
  }

  handleLoadMore = () => {
    const { episodes } = this.props;
    const { limit } = this.state;

    const nextLimit = limit + 3;

    this.setState({
      limit: nextLimit > episodes.length ? episodes.length : nextLimit
    });
  }

  render() {
    const { episodes } = this.props;
    const { limit } = this.state;

    const episodeList = episodes.slice(0, limit).map(
      episode => (
       <EpisodeItem
        thumbnail={episode.img}
        name={episode.name}
        key={episode.id}
        id={episode.id}
        onClick={this.handlePlayEpisode}
        /> 
      )
    )

    return (
      <div className={cx('EpisodeItemList')}>
        {episodeList}
        {
          episodes.length !== limit && (
            <LoadMoreEpisode onClick={this.handleLoadMore} />
          )
        }
      </div>
    )
  }
}

export default EpisodeItemList;