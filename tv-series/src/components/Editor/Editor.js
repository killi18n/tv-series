import React, {Fragment} from 'react';
import styles from './Editor.scss';
import classNames from 'classnames/bind';
import CancelIcon from 'react-icons/lib/md/cancel';

const cx = classNames.bind(styles);

const Editor = ({ inputs, onChangeInput, name,
  teasername,
  videoId,
  actorname,
  story,
  genre,
  startYear,
  endYear,
  firstBroadcasted,
  onUpload,
  storedFiles,
  onFilter,
  thumbnailUpload,
  thumbnailFiles,
  onFilterThumbnail,
  onPost }) => {

  const handleClickImage = () => {
    this.actorImage.click();
  }

  const handleThumbnailClick = () => {
    this.thumbnailImage.click();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({ name, value });
  }

  const handleUpload = (e) => {
    const image = e.target.files[0];
    let fd = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    fd.append('image', image);

    onUpload(fd, config);


  }

  const handleThumbnail = (e) => {
    const image = e.target.files[0];
    let fd = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    fd.append('image', image);
    thumbnailUpload(fd, config);
  }

  const handleFilterImage = (e) => {
    const { id } = e.target;
    onFilter({ image: id });
  }

  const handleFilterThumbnail = (e) => {
    const { id } = e.target;
    onFilterThumbnail({ image: id });
  }

  const fileList = storedFiles.map(
    (file, i) => {
      return (
        <div className={cx('text')} key={file.id}>
          {file.id} 
          <svg id={file.id} onClick={handleFilterImage} fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style={{ verticalAlign: "middle" }}><g id={file.id} onClick={handleFilterImage}><path id={file.id} onClick={handleFilterImage} d="m28.4 26l-6.1-6 6.1-6-2.4-2.4-6 6.1-6-6.1-2.4 2.4 6.1 6-6.1 6 2.4 2.4 6-6.1 6 6.1z m-8.4-22.6c9.2 0 16.6 7.4 16.6 16.6s-7.4 16.6-16.6 16.6-16.6-7.4-16.6-16.6 7.4-16.6 16.6-16.6z"></path></g></svg>

        </div>
      )
    }
  );
  const thumbnailList = (
    <Fragment>
      {thumbnailFiles.id}
      <svg id={thumbnailFiles.id} onClick={handleFilterThumbnail} fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style={{ verticalAlign: "middle" }}><g id={thumbnailFiles.id} onClick={handleFilterThumbnail}><path id={thumbnailFiles.id} onClick={handleFilterThumbnail} d="m28.4 26l-6.1-6 6.1-6-2.4-2.4-6 6.1-6-6.1-2.4 2.4 6.1 6-6.1 6 2.4 2.4 6-6.1 6 6.1z m-8.4-22.6c9.2 0 16.6 7.4 16.6 16.6s-7.4 16.6-16.6 16.6-16.6-7.4-16.6-16.6 7.4-16.6 16.6-16.6z"></path></g></svg>
    </Fragment>
  );

  return (
    <div className={cx('editor')}>
      <div className={cx('contents')}>
        <div className={cx('content')}>
          <div className={cx('label')}>
            시리즈 제목
          </div>
          <div className={cx('input-wrapper')}>
            <input type="text" name="name" value={name} onChange={handleChange} className={cx('input')} />
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('label')}>
            티저 제목(쉼표로 구분)
          </div>
          <div className={cx('input-wrapper')}>
            <input type="text" name="teasername" value={teasername} onChange={handleChange} className={cx('input')} />
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('label')}>
            티저 유튜브 Id(쉼표로 구분)
          </div>
          <div className={cx('input-wrapper')}>
            <input type="text" name="videoId" value={videoId} onChange={handleChange} className={cx('input')} />
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('label')}>
            배우 이름(쉼표로 구분)
          </div>
          <div className={cx('input-wrapper')}>
            <input type="text" name="actorname" value={actorname} onChange={handleChange} className={cx('input')} />
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('label')}>
            배우 이미지 업로드
          </div>
          <div className={cx('input-wrapper')}>
            <input
              type="file"
              name="actorImage"
              className={cx('input')}
              ref={actorImage => this.actorImage = actorImage}
              style={{ display: "none" }}
              onChange={handleUpload} />
          </div>
          <div className={cx('button-wrapper')}>
            <div className={cx('button')} onClick={handleClickImage}>
              이미지 업로드
            </div>
          </div>
          <div className={cx('imageList')}>
            {
              fileList
              
            }
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('label')}>
            줄거리
          </div>
          <div className={cx('input-wrapper')}>
            <textarea name="story" className={cx('textarea')} onChange={handleChange} value={story}></textarea>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('label')}>
            썸네일 이미지 업로드
          </div>
          <div className={cx('input-wrapper')}>
            <input
              type="file"
              name="thumbnailImage"
              className={cx('input')}
              ref={thumbnailImage => this.thumbnailImage = thumbnailImage}
              style={{ display: "none" }} 
              onChange={handleThumbnail}/>
          </div>
          <div className={cx('button-wrapper')}>
            <div className={cx('button')} onClick={handleThumbnailClick}>
              이미지 업로드
            </div>
          </div>
          <div>
            {
              thumbnailFiles.size !== 0 && thumbnailList
            }
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('label')}>
            장르 (쉼표로 구분)
          </div>
          <div className={cx('input-wrapper')}>
            <input type="text" name="genre" value={genre} onChange={handleChange} className={cx('input')} />
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('label')}>
            시작년도
          </div>
          <div className={cx('input-wrapper')}>
            <input type="text" name="startYear" value={startYear} onChange={handleChange} className={cx('input')} />
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('label')}>
            종영 연도
          </div>
          <div className={cx('input-wrapper')}>
            <input type="text" name="endYear" value={endYear} onChange={handleChange} className={cx('input')} />
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('label')}>
            첫 방송일(yyyy-MM-dd)
          </div>
          <div className={cx('input-wrapper')}>
            <input type="text" name="firstBroadcasted" value={firstBroadcasted} onChange={handleChange} className={cx('input')} />
          </div>
        </div>
        <div className={cx('button-wrapper')}>
          <div className={cx('button')} onClick={onPost}>
            포스팅 하기
            </div>
        </div>
      </div>
    </div>
  );

}
export default Editor;