import React, {Component} from 'react';
import styles from './ActorList.scss';
import classNames from 'classnames/bind';
import LoadMoreEpisode from 'components/LoadMoreEpisode/LoadMoreEpisode';
import ActorItem from 'components/ActorItem/ActorItem';

const cx = classNames.bind(styles);

class ActorList extends Component {
  state = {
    limit: 2,
  }

  handleLoadMore = () => {
    const { actors } = this.props;
    const { limit } = this.state;

    const nextLimit = limit + 3;

    this.setState({
      limit: nextLimit > actors.length ? actors.length : nextLimit
    });
  }

  

  render() {
    const { limit } = this.state;
    const { actors } = this.props;
    const { handleLoadMore } = this;
    if(actors === undefined) return null;
    const actorList = actors.slice(0, limit).map(
      actor => (
        <ActorItem
          key={actor._id}
          id={actor._id}
          thumbnail={actor.img}
          name={actor.name}
          />
      )
    )
    return (
      <div className={cx('ActorList')}>
      {
        actorList
      }
      {
        actors.length !== limit && 
        <LoadMoreEpisode onClick={handleLoadMore}/>
      }
        
      </div>
    );
  }
}

export default ActorList;