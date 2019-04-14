import React from 'react';
import styles from './AuthForm.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const AuthForm = ({
    what,
    onChangeInput,
    email,
    password,
    passwordCheck,
    onLogin,
    onKeydownLogin,
    onRegister,
    onKeydownRegister,
    error,
}) => {
    const handleChangeInput = e => {
        const { name, value } = e.target;
        onChangeInput({ name, value });
    };
    return (
        <div className={cx('AuthForm')}>
            {what === 'login' && (
                <div className={cx('contents')}>
                    <div className={cx('title')}>Login</div>
                    {error && <div className={cx('error')}>{error}</div>}
                    <div className={cx('OneOfLine')}>
                        <div className={cx('label')}>email</div>
                        <div className={cx('input-wrapper')}>
                            <input
                                type="email"
                                name="email"
                                onKeyDown={onKeydownLogin}
                                value={email}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    <div className={cx('OneOfLine')}>
                        <div className={cx('label')}>password</div>
                        <div className={cx('input-wrapper')}>
                            <input
                                type="password"
                                name="password"
                                onKeyDown={onKeydownLogin}
                                value={password}
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    <div className={cx('button-wrapper')}>
                        <div className={cx('button')} onClick={onLogin}>
                            Login
                        </div>
                    </div>
                    <div className={cx('desc')}>
                        <Link className={cx('text')} to="/auth/register">
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
            {what === 'register' && (
                <div className={cx('contents')}>
                    <div className={cx('title')}>Sign up</div>
                    <div className={cx('OneOfLine')}>
                        <div className={cx('label')}>email</div>
                        <div className={cx('input-wrapper')}>
                            <input
                                type="email"
                                name="email"
                                placeholder="valid email"
                                value={email}
                                onChange={handleChangeInput}
                                onKeyDown={onKeydownRegister}
                            />
                        </div>
                    </div>
                    <div className={cx('OneOfLine')}>
                        <div className={cx('label')}>password</div>
                        <div className={cx('input-wrapper')}>
                            <input
                                type="password"
                                name="password"
                                placeholder="any characters but more than 6"
                                value={password}
                                onChange={handleChangeInput}
                                onKeyDown={onKeydownRegister}
                            />
                        </div>
                    </div>
                    <div className={cx('OneOfLine')}>
                        <div className={cx('label')}>password check</div>
                        <div className={cx('input-wrapper')}>
                            <input
                                type="password"
                                name="passwordCheck"
                                placeholder="same password"
                                value={passwordCheck}
                                onChange={handleChangeInput}
                                onKeyDown={onKeydownRegister}
                            />
                        </div>
                    </div>
                    <div className={cx('button-wrapper')}>
                        <div className={cx('button')} onClick={onRegister}>
                            Sign up
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthForm;
