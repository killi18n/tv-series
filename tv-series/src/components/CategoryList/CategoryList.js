import React, { Component } from 'react';
import styles from './CategoryList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import CategoryItem from '../CategoryItem/CategoryItem';
const cx = classNames.bind(styles);

class CategoryList extends Component {


  render() {
    const { categories, category } = this.props;
    const categoryList = categories.map(
      category => (
        <CategoryItem
          key={category.id}
          id={category.id}
          thumbnail={category.img}
          name={category.name}
          />
      )
    )
    return (
      <div className={cx('CategoryList')}>
        <div className={cx('label')}>
          {category.toUpperCase()}
        </div>
        <div className={cx('wrapper')}>
          {
            categoryList
          }
        </div>
      </div>
    );
  }
}

export default CategoryList;