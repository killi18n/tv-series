import React, { Component } from 'react';
import styles from './CategoryList.scss';
import classNames from 'classnames/bind';
// import { Link } from "react-router-dom";
import CategoryItem from 'components/contents/CategoryItem';
import Pagination from 'components/common/Pagination';
const cx = classNames.bind(styles);

class CategoryList extends Component {
    render() {
        const { categories, category, all, lastPage, page } = this.props;
        const categoryList = all.map(category => (
            <CategoryItem
                key={category.get('_id')}
                id={category.get('_id')}
                thumbnail={category.get('thumbnail')}
                name={category.get('name')}
                actors={category.get('actors')}
                genres={category.get('genre')}
            />
        ));
        if (all.size === 0) return null;
        return (
            <div className={cx('CategoryList')}>
                <div className={cx('label')}>{category.toUpperCase()}</div>
                <div className={cx('wrapper')}>{categoryList}</div>
                <Pagination lastPage={lastPage} page={page} />
            </div>
        );
    }
}

export default CategoryList;
