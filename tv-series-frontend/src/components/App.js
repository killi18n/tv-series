import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    SeriesListPage,
    SeriesPage,
    IntroductionPage,
    CategoryListPage,
    EditorPage,
} from 'pages';
import Base from 'containers/Base';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact={true} path="/" component={SeriesListPage} />
                    <Route path="/introduction" component={IntroductionPage} />
                    <Route path="/editor" component={EditorPage} />
                    <Route
                        path="/list/:category/:page?"
                        component={CategoryListPage}
                    />
                    <Route path="/series/:id" component={SeriesPage} />
                    {/* <Route path="/auth/:what" component={AuthPage} /> */}
                </Switch>
                <Base />
            </div>
        );
    }
}

export default App;
