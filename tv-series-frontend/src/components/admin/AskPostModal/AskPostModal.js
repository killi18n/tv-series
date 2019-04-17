import React from 'react';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/common/ModalWrapper';
import styles from './AskPostModal.scss';

const cx = classNames.bind(styles);

const AskPostModal = ({ visible, onHide, onRemove, onUpdateClick }) => (
  <ModalWrapper visible={visible}>
    <div className={cx('question')}>
      <div className={cx('title')}>포스트 수정 / 삭제</div>
      <div className={cx('description')}>수정 혹은 삭제하시겠습니까?</div>
    </div>
    <div className={cx('options')}>
      <div className={cx('button', 'remove')} onClick={onRemove}>
        <div className={cx('text')}>삭제</div>
      </div>
      <div className={cx('button', 'update')} onClick={onUpdateClick}>
        <div className={cx('text')}>수정</div>
      </div>
      <div className={cx('button', 'cancel')} onClick={onHide}>
        <div className={cx('text')}>취소</div>
      </div>
    </div>
  </ModalWrapper>
);

export default AskPostModal;
