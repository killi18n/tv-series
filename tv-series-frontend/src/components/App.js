import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  SeriesListPage,
  SeriesPage,
  // IntroductionPage,
  CategoryListPage,
  EditorPage,
  NotFoundPage,
} from 'pages';
import Base from 'containers/Base';
import RouteListener from '../lib/RouteListener';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={SeriesListPage} />
        {/* <Route path="/introduction" component={IntroductionPage} /> */}
        <Route path="/editor" component={EditorPage} />
        <Route path="/series/:id" component={SeriesPage} />
        <Route path="/list/:category/:page?" component={CategoryListPage} />
        <Route component={NotFoundPage} />
        {/* <Route path="/auth/:what" component={AuthPage} /> */}
      </Switch>
      <Base />
      <RouteListener />
    </div>
  );
};

export default App;
