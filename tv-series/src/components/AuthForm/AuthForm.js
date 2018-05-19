import React from 'react';
import styles from './AuthForm.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

const AuthForm = ({ what,
  onChangeInput,
  email,
  password,
  passwordCheck,
  onLogin,
  onKeydownLogin,
  onRegister,
  onKeydownRegister,
  error }) => {
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  }
  return (
    <div className={cx('AuthForm')}>
      {
        what === "login" &&
        <div className={cx('contents')}>
          <div className={cx('title')}>
            로그인
          </div>
          {
            error &&
            <div className={cx('error')}>
              {error}
            </div>
          }
          <div className={cx('OneOfLine')}>
            <div className={cx('label')}>
              이메일
            </div>
            <div className={cx('input-wrapper')}>
              <input type="email" name="email" onKeyDown={onKeydownLogin} value={email} onChange={handleChangeInput} />
            </div>
          </div>
          <div className={cx('OneOfLine')}>
            <div className={cx('label')}>
              비밀번호
            </div>
            <div className={cx('input-wrapper')}>
              <input type="password" name="password" onKeyDown={onKeydownLogin} value={password} onChange={handleChangeInput} />
            </div>
          </div>
          <div className={cx('button-wrapper')}>
            <div className={cx('button')} onClick={onLogin}>
              로그인
            </div>
          </div>
          <div className={cx('desc')}>
            아직 회원이 아니시라면? <Link className={cx('text')} to="/auth/register">회원가입하기</Link>
          </div>
        </div>
      }
      {
        what === "register" &&
        <div className={cx('contents')}>
          <div className={cx('title')}>
            회원가입
          </div>
          <div className={cx('OneOfLine')}>
            <div className={cx('label')}>
              이메일
            </div>
            <div className={cx('input-wrapper')}>
              <input type="email" name="email" placeholder="이메일 플리즈.." value={email} onChange={handleChangeInput} onKeyDown={onKeydownRegister} />
            </div>
          </div>
          <div className={cx('OneOfLine')}>
            <div className={cx('label')}>
              비밀번호
            </div>
            <div className={cx('input-wrapper')}>
              <input type="password" name="password" placeholder="6자 이상 아무거나!" value={password} onChange={handleChangeInput} onKeyDown={onKeydownRegister} />
            </div>
          </div>
          <div className={cx('OneOfLine')}>
            <div className={cx('label')}>
              비밀번호 한번 더
            </div>
            <div className={cx('input-wrapper')}>
              <input type="password" name="passwordCheck" placeholder="6자 이상 아무거나!" value={passwordCheck} onChange={handleChangeInput} onKeyDown={onKeydownRegister} />
            </div>
          </div>
          <div className={cx('button-wrapper')}>
            <div className={cx('button')} onClick={onRegister}>
              회원가입
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default AuthForm;