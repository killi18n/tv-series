import React, { Component } from 'react';

import classNames from 'classnames/bind';
import styles from './ModalWrapper.scss';

const cx = classNames.bind(styles);

class ModalWrapper extends Component {
  state = {
    animate: false,
  };

  componentDidMount() {
    const { addListeners } = this.props;
    if (addListeners) {
      addListeners();
    }
  }

  componentDidUpdate(prevProps) {
    const { thisVisible } = this.props;
    const { prevVisible } = prevProps;
    if (prevVisible !== thisVisible) {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    const { removeListeners } = this.props;
    if (removeListeners) {
      removeListeners();
    }
  }

  startAnimation = () => {
    this.setState({
      animate: true,
    });
    setTimeout(() => {
      this.setState({
        animate: false,
      });
    }, 250);
  };

  render() {
    const { children, visible } = this.props;
    const { animate } = this.state;
    if (!visible && !animate) return null;
    const animation = animate && (visible ? 'enter' : 'leave');

    return (
      <div>
        <div className={cx('gray-background')}>
          <div className={cx('modal-wrapper')}>
            <div className={cx('modal', animation)}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWrapper;
