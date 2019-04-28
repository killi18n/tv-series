import {
  SeriesListPage,
  EditorPage,
  CategoryListPage,
  SeriesPage,
} from 'pages';

const routes = [
  {
    path: '/',
    exact: true,
    component: SeriesListPage,
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
  },
  {
    path: '/series/:id',
    exact: false,
    component: SeriesPage,
  },
];

export default routes;
