import React, { Component } from 'react';
import data from 'data.json';
import { Switch, Route } from 'react-router-dom';
import {
  SeriesListPage,
  SeriesPage,
  AuthPage,
  IntroductionPage,
  CategoryListPage,
  EditorPage
} from 'pages';
import Base from 'containers/Base';

class App extends Component {
  render() {
    return (
      // <SeriesPage data={data}/>
      <div>
        <Switch>
          <Route exact={true} path="/" component={SeriesListPage} />
          <Route path="/introduction" component={IntroductionPage} />
          <Route path="/editor" component={EditorPage} />
          <Route path="/list/:category/:page?" component={CategoryListPage} />
          <Route path="/series/:id" component={SeriesPage} />
          <Route path="/auth/:what" component={AuthPage} />
        </Switch>
        <Base />
      </div>
    );
  }
}

export default App;
