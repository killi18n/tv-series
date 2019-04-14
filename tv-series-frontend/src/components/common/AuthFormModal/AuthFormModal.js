import React from 'react';
import ModalWrapper from 'components/common/ModalWrapper';
import classNames from 'classnames/bind';
import styles from './AuthFormModal.scss';
import AuthForm from '../../auth/AuthForm/AuthForm';

const cx = classNames.bind(styles);

const AuthFormModal = ({ type, visible, addListeners, removeListeners }) => {
    return (
        <ModalWrapper
            visible={visible}
            addListeners={() => addListeners({ type })}
            removeListeners={() => removeListeners({ type })}
        >
            {type === 'login' ? (
                <AuthForm what="login" />
            ) : (
                <AuthForm what="register" />
            )}
        </ModalWrapper>
    );
};

export default AuthFormModal;
