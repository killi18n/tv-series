import React from 'react';

let cancel =
  process.env.NODE_ENV === 'production' &&
  typeof window !== 'undefined' &&
  window.__PRELOADED_STATE__;

const shouldCancel = () => {
  return cancel;
};

export class Rendered extends React.Component {
  componentDidMount() {
    cancel = false;
  }

  render() {
    return null;
  }
}

export default shouldCancel;
