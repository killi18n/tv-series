import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editorActions from 'store/modules/editor';
import Editor from 'components/Editor/Editor';
import { withRouter } from 'react-router-dom';

class EditorContainer extends Component {
    initializeInput = () => {
        const { EditorActions } = this.props;
        EditorActions.initializeInput();
    }

    componentDidMount() {
        this.initializeInput();
    }

    handleChangeInput = ({ name, value }) => {
        const { EditorActions } = this.props;
        EditorActions.changeInput({ name, value });
    }

    uploadImage = async (fd, config) => {
        const { EditorActions } = this.props;

        try {

            await EditorActions.uploadImage(fd, config);
        } catch (e) {
            console.log(e);
        }
    }

    thumbnailUpload = async (fd, config) => {
        const { EditorActions, prevThumbnail } = this.props;

        try {
            await EditorActions.setPrevThumbnail();
            await EditorActions.uploadImageThumbnail(fd, config);
            if (this.props.prevThumbnail.size !== 0) {
                await EditorActions.filterImageApi({ image: this.props.prevThumbnail.id });
            }

        } catch (e) {
            console.log(e);
        }
    }

    filterImage = async ({ image }) => {
        const { EditorActions } = this.props;

        EditorActions.filterImage({ image });

        try {
            await EditorActions.filterImageApi({ image });
        } catch (e) {
            console.log(e);
        }

    }

    filterThumbnail = async ({ image }) => {
        const { EditorActions } = this.props;

        EditorActions.filterThumbnail();

        try {
            await EditorActions.filterImageApi({ image });
        } catch (e) {
            console.log(e);
        }
    }

    handlePost = async () => {
        const { EditorActions, storedFiles, thumbnailFiles, history } = this.props;
        const { name,
            teasername,
            videoId,
            actorname,
            story,
            genre,
            startYear,
            endYear,
            firstBroadcasted } = this.props.inputs.toJS();

        try {
            let teasers = [];
            let teasernameArr = teasername.split(",");
            let videoIdArr = videoId.split(",");
            teasers = teasernameArr.map(
                (name, i) => {
                    return {
                        "name": name,
                        "videoId": videoIdArr[i]
                    }
                }
            );
            let actors = [];
            let actornameArr = actorname.split(",");
            let imgArr = storedFiles.toJS().map(
                (file, i) => {
                    return file.id;
                }
            );
            actors = actornameArr.map(
                (name, i) => {
                    return {
                        "name": name,
                        "img": imgArr[i]
                    }
                }
            );
            let genreArr = genre.split(",");

            await EditorActions.post({name, teasers, actors, story, thumbnail: thumbnailFiles.id, genre: genreArr, startYear, endYear, firstBroadcasted});
            history.push(`/series/${this.props.postedPost._id}`);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { handleChangeInput, uploadImage, filterImage, thumbnailUpload, filterThumbnail, handlePost } = this;
        const { name,
            teasername,
            videoId,
            actorname,
            story,
            genre,
            startYear,
            endYear,
            firstBroadcasted } = this.props.inputs.toJS();
        const { storedFiles, thumbnailFiles } = this.props;

        return (
            <Editor
                onChangeInput={handleChangeInput}
                name={name}
                teasername={teasername}
                videoId={videoId}
                actorname={actorname}
                story={story}
                genre={genre}
                startYear={startYear}
                endYear={endYear}
                firstBroadcasted={firstBroadcasted}
                onUpload={uploadImage}
                storedFiles={storedFiles}
                onFilter={filterImage}
                thumbnailUpload={thumbnailUpload}
                thumbnailFiles={thumbnailFiles}
                onFilterThumbnail={filterThumbnail}
                onPost={handlePost}
            />
        )
    }
}
export default connect(
    (state) => ({
        inputs: state.editor.get('inputs'),
        storedFiles: state.editor.get('storedFiles'),
        thumbnailFiles: state.editor.get('thumbnailFiles'),
        prevThumbnail: state.editor.get('prevThumbnail'),
        postedPost: state.editor.get('postedPost')

    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions, dispatch)
    })
)(withRouter(EditorContainer));