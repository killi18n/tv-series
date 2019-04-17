import React from 'react';
import AuthContainer from 'containers/AuthContainer';
import ModalWrapper from 'components/common/ModalWrapper';
// import classNames from 'classnames/bind';
// import styles from './AuthFormModal.scss';
// import AuthForm from 'components/auth/AuthForm';
// import ModalWrapperContainer from 'containers/ModalWrapperContainer';

// const cx = classNames.bind(styles);

const AuthFormModal = ({ type, visible }) => {
  return (
    <ModalWrapper
      visible={visible}
      //   addListeners={() => addListeners({ type })}
      //   removeListeners={() => removeListeners({ type })}
    >
      {type === 'login' ? (
        <AuthContainer what="login" />
      ) : (
        <AuthContainer what="register" />
      )}
    </ModalWrapper>
  );
};

export default AuthFormModal;
