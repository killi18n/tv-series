import React from 'react';
import { withRouter } from 'react-router-dom';

class RouteListener extends React.Component {
  componentDidMount() {
    const { history } = this.props;
    this.unlisten = history.listen(this.handleChange);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleChange = location => {
    console.log(location);
    window.shouldCancel = false;
  };

  render() {
    return null;
  }
}

export default withRouter(RouteListener);
