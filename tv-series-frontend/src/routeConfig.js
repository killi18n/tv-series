import {
  SeriesListPage,
  EditorPage,
  CategoryListPage,
  SeriesPage,
} from 'pages';
import { bindActionCreators } from 'redux';
import * as listActions from 'store/modules/list';

const routes = [
  {
    path: '/',
    exact: true,
    component: SeriesListPage,
    preload: store => {
      const ListActions = bindActionCreators(listActions, store.dispatch);
      return Promise.all([ListActions.getTop4Rated(), ListActions.getBrand4()]);
    },
  },
  {
    path: '/editor',
    exact: false,
    component: EditorPage,
  },
  {
    path: '/list/:category/:page?',
    exact: false,
    component: CategoryListPage,
    preload: (store, params) => {
      const { page, category } = params;
      const ListActions = bindActionCreators(listActions, store.dispatch);
      return ListActions.getAll({ page, genre: category });
    },
  },
  {
    path: '/series/:id',
    exact: false,
    component: SeriesPage,
    preload: (store, params) => {
      const { id } = params;
      const ListActions = bindActionCreators(listActions, store.dispatch);
      return ListActions.getSeriesById({ id });
    },
  },
];

export default routes;
