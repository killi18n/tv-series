import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editorActions from 'store/modules/editor';
import * as postActions from 'store/modules/post';
import * as listActions from 'store/modules/list';
import Editor from 'components/admin/Editor';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class EditorContainer extends Component {
    initializeInput = () => {
        const { EditorActions } = this.props;
        EditorActions.initializeInput();
    };

    initializeSeries = () => {
        const { ListActions } = this.props;
        ListActions.initializeSeries();
    };

    componentDidMount() {
        const { location, ListActions } = this.props;
        this.initializeInput();
        this.initializeSeries();
        const { id } = queryString.parse(location.search);

        if (id) {
            ListActions.getSeriesById({ id });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { EditorActions } = this.props;

        if (
            prevProps.series !== this.props.series &&
            this.props.series.size !== 0
        ) {
            EditorActions.setServerInputs({ serverSeries: this.props.series });
            const files = this.props.series.actors.map((actor, i) => {
                return {
                    id: actor.img,
                    localFileName: null,
                };
            });
            const thumbnail = {
                id: this.props.series.thumbnail,
                localFileName: null,
            };
            EditorActions.setServerFiles({ files });
            EditorActions.setThumbnailFile({ thumbnail });
        }
    }

    handleAddServerFile = async (fd, config) => {
        const { EditorActions } = this.props;

        try {
            await EditorActions.addServerFiles(fd, config);
        } catch (e) {
            console.log(e);
        }
    };

    handleAddServerThumbnail = async (fd, config) => {
        const { EditorActions } = this.props;

        try {
            await EditorActions.setPrevServerThumbnail();
            await EditorActions.setPrevServerThumbnailList();
            await EditorActions.addServerThumbnail(fd, config);
        } catch (e) {
            console.log(e);
        }
    };

    handleFilterServerFiles = ({ removed }) => {
        const { EditorActions } = this.props;
        EditorActions.filterServerFiles({ removed });
    };

    handleFilterServerThumbnail = ({ removed }) => {
        const { EditorActions } = this.props;
        EditorActions.filterServerThumbnail({ removed });
    };

    handleChangeInput = ({ name, value }) => {
        const { EditorActions } = this.props;
        EditorActions.changeInput({ name, value });
    };

    uploadImage = async (fd, config) => {
        const { EditorActions } = this.props;

        try {
            await EditorActions.uploadImage(fd, config);
        } catch (e) {
            console.log(e);
        }
    };

    thumbnailUpload = async (fd, config) => {
        const { EditorActions, prevThumbnail } = this.props;

        try {
            await EditorActions.setPrevThumbnail();
            await EditorActions.uploadImageThumbnail(fd, config);
            if (this.props.prevThumbnail.size !== 0) {
                await EditorActions.filterImageApi({
                    image: this.props.prevThumbnail.id,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    filterImage = async ({ image }) => {
        const { EditorActions } = this.props;

        EditorActions.filterImage({ image });

        try {
            await EditorActions.filterImageApi({ image });
        } catch (e) {
            console.log(e);
        }
    };

    filterThumbnail = async ({ image }) => {
        const { EditorActions } = this.props;

        EditorActions.filterThumbnail();

        try {
            await EditorActions.filterImageApi({ image });
        } catch (e) {
            console.log(e);
        }
    };

    handlePost = async () => {
        const {
            EditorActions,
            storedFiles,
            thumbnailFiles,
            history,
            location,
            PostActions,
            serverThumbnail,
            prevServerThumbnailList,
            willRemoveServerFiles,
            willRemoveThumbnailFile,
            serverFiles,
        } = this.props;
        const {
            name,
            teasername,
            videoId,
            actorname,
            story,
            genre,
            startYear,
            endYear,
            firstBroadcasted,
        } = this.props.inputs.toJS();

        const { id } = queryString.parse(location.search);
        try {
            let teasers = [];
            let teasernameArr = [
                ...new Set(teasername.split(',').map(name => name.trim())),
            ];
            let videoIdArr = [
                ...new Set(videoId.split(',').map(video => video.trim())),
            ];
            teasers = teasernameArr.map((name, i) => {
                return {
                    name: name,
                    videoId: videoIdArr[i],
                };
            });
            let actors = [];
            let actornameArr = [
                ...new Set(actorname.split(',').map(name => name.trim())),
            ];
            let imgArr = null;
            if (id) {
                imgArr = serverFiles.map((file, i) => {
                    return file.id;
                });
            } else {
                imgArr = storedFiles.toJS().map((file, i) => {
                    return file.id;
                });
            }
            actors = actornameArr.map((name, i) => {
                return {
                    name: name,
                    img: imgArr[i],
                };
            });
            let genreArr = [
                ...new Set(genre.split(',').map(gen => gen.trim())),
            ];

            if (id) {
                // console.log(serverThumbnail.id);
                // return;
                await PostActions.editPost({
                    id,
                    name,
                    teasers,
                    actors,
                    story,
                    thumbnail: serverThumbnail.id,
                    genre: genreArr,
                    startYear,
                    endYear,
                });
                await PostActions.trash({
                    prevServerThumbnailList,
                    willRemoveServerFiles,
                    willRemoveThumbnailFile,
                });
                // window.location.reload();
                history.push(`/series/${id}`);
                return;
            }

            await EditorActions.post({
                name,
                teasers,
                actors,
                story,
                thumbnail: thumbnailFiles.id,
                genre: genreArr,
                startYear,
                endYear,
                firstBroadcasted,
            });
            history.push(`/series/${this.props.postedPost._id}`);
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {
            handleChangeInput,
            uploadImage,
            filterImage,
            thumbnailUpload,
            filterThumbnail,
            handlePost,
            handleFilterServerFiles,
        } = this;
        const {
            name,
            teasername,
            videoId,
            actorname,
            story,
            genre,
            startYear,
            endYear,
            firstBroadcasted,
        } = this.props.inputs.toJS();
        const { storedFiles, thumbnailFiles, series, serverFiles } = this.props;
        const {
            handleAddServerFile,
            handleFilterServerThumbnail,
            handleAddServerThumbnail,
        } = this;
        const { serverThumbnail } = this.props;

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
                series={series}
                serverFiles={serverFiles}
                onFilterServerFiles={handleFilterServerFiles}
                onAddServerFile={handleAddServerFile}
                serverThumbnail={serverThumbnail}
                onFilterServerThumbnail={handleFilterServerThumbnail}
                onAddServerThumbnail={handleAddServerThumbnail}
            />
        );
    }
}
export default connect(
    state => ({
        inputs: state.editor.get('inputs'),
        storedFiles: state.editor.get('storedFiles'),
        thumbnailFiles: state.editor.get('thumbnailFiles'),
        prevThumbnail: state.editor.get('prevThumbnail'),
        postedPost: state.editor.get('postedPost'),
        series: state.list.get('series'),
        serverFiles: state.editor.get('serverFiles'),
        serverThumbnail: state.editor.get('serverThumbnail'),
        prevServerThumbnailList: state.editor.get('prevServerThumbnailList'),
        willRemoveServerFiles: state.editor.get('willRemoveServerFiles'),
        willRemoveThumbnailFile: state.editor.get('willRemoveThumbnailFile'),
    }),
    dispatch => ({
        EditorActions: bindActionCreators(editorActions, dispatch),
        ListActions: bindActionCreators(listActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch),
    })
)(withRouter(EditorContainer));
