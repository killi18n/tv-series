import React from 'react';
import classNames from 'classnames/bind';
// import { Link } from "react-router-dom";
import CategoryItem from 'components/contents/CategoryItem';
import Pagination from 'components/common/Pagination';
import styles from './CategoryList.scss';

const cx = classNames.bind(styles);

const CategoryList = ({ category, all, lastPage, page }) => {
  const categoryList = all.map(targetCategory => (
    <CategoryItem
      key={targetCategory.get('_id')}
      id={targetCategory.get('_id')}
      thumbnail={targetCategory.get('thumbnail')}
      name={targetCategory.get('name')}
      actors={targetCategory.get('actors')}
      genres={targetCategory.get('genre')}
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
};

// class CategoryList extends Component {
//   render() {
//     const { category, all, lastPage, page } = this.props;
//     const categoryList = all.map(category => (
//       <CategoryItem
//         key={category.get('_id')}
//         id={category.get('_id')}
//         thumbnail={category.get('thumbnail')}
//         name={category.get('name')}
//         actors={category.get('actors')}
//         genres={category.get('genre')}
//       />
//     ));
//     if (all.size === 0) return null;
//     return (
//       <div className={cx('CategoryList')}>
//         <div className={cx('label')}>{category.toUpperCase()}</div>
//         <div className={cx('wrapper')}>{categoryList}</div>
//         <Pagination lastPage={lastPage} page={page} />
//       </div>
//     );
//   }
// }

export default CategoryList;
