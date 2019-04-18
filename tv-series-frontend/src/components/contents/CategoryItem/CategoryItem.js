import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './CategoryItem.scss';

const cx = classNames.bind(styles);

const CategoryItem = ({ thumbnail, name, id, actors, genres, onClickTag }) => {
  const actorList = actors.slice(0, 3).map((actor, i) => {
    if (i === 2 || i === actors.size - 1) {
      return (
        <div className={cx('actor')} key={actor.get('_id')}>
          {actor.get('name')}
        </div>
      );
    }
    return (
      <div className={cx('actor')} key={actor.get('_id')}>
        {actor.get('name')}
        ,&nbsp;
      </div>
    );
  });

  const genreList = genres.map((genre, i) => {
    return (
      <div
        className={cx('genre')}
        key={i}
        onClick={e => {
          e.preventDefault();
          onClickTag({ tag: genre });
        }}
      >
        #{genre}
      </div>
    );
  });

  return (
    <Link to={`/series/${id}`} className={cx('OneLine')}>
      <div className={cx('left')}>
        <div className={cx('thumbnail')}>
          <img src={`/uploads/${thumbnail}`} alt="thumbnail-category" />
        </div>
      </div>
      <div className={cx('right')}>
        <div className={cx('title')}>{name}</div>
        <div className={cx('actors')}>{actorList} 외 다수</div>
        <div className={cx('genres')}>{genreList}</div>
      </div>
    </Link>
  );
};

export default CategoryItem;
