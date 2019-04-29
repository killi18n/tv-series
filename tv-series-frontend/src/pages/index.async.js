import asyncComponent from 'lib/asyncComponent';

export const SeriesListPage = asyncComponent(() => import('./SeriesListPage'));
export const SeriesPage = asyncComponent(() => import('./SeriesPage'));
export const AuthPage = asyncComponent(() => import('./AuthPage'));
export const IntroductionPage = asyncComponent(() =>
  import('./IntroductionPage')
);
export const CategoryListPage = asyncComponent(() =>
  import('./CategoryListPage')
);
export const EditorPage = asyncComponent(() => import('./EditorPage'));
export const NotFoundPage = asyncComponent(() => import('./NotFoundPage'));
