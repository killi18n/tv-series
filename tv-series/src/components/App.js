import React, { Component } from 'react';
import data from 'data.json';
import { Switch, Route } from 'react-router-dom';
import { SeriesListPage, SeriesPage, AuthPage, IntroductionPage, CategoryListPage } from 'pages';

class App extends Component {
  render() {
    return (
      // <SeriesPage data={data}/>
      <div>
        <Switch>
          <Route exact={true} path="/" component={SeriesListPage} />
          <Route path="/introduction" component={IntroductionPage} />
          <Route path="/list/:category" component={CategoryListPage} />
          <Route path="/series/:id" component={SeriesPage} />
          <Route path="/auth/:what" component={AuthPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
