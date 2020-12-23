import React, {
    useEffect,
    useState,
} from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {
    const videoId = props.match.params.videoId;
    const [
        CommentLists,
        setCommentLists,
    ] = useState([]);
    const variable = { videoId: videoId };
    const [
        VideoDetail,
        setVideoDetail,
    ] = useState([]);
    useEffect(() => {
        Axios.post(
            '/api/video/getVideoDetail',
            variable
        ).then((res) => {
            if (res.data.success) {
                setVideoDetail(
                    res.data.videoDetail
                );
            } else {
                alert(
                    '비디오 정보 가져오기 실패'
                );
            }
        });
    }, []);
    useEffect(() => {
        Axios.post(
            '/api/comment/getComments',
            variable
        ).then((res) => {
            if (res.data.success) {
                if (
                    res.data.comments !==
                    CommentLists
                ) {
                    setCommentLists(
                        res.data.comments
                    );
                }
            } else {
                alert('댓글 정보 가져오기 실패');
            }
        });
    }, []);
    if (VideoDetail.writter) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div
                        style={{
                            width: '100%',
                            padding: '3rem 4rem',
                        }}
                    >
                        <video
                            src={`http://localhost:5000/${VideoDetail.filePath}`}
                            controls
                            style={{
                                width: '100%',
                            }}
                        ></video>
                        <List.Item
                            actions={[
                                <Subscribe
                                    userTo={
                                        VideoDetail
                                            .writter
                                            ._id
                                    }
                                />,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={
                                            VideoDetail
                                                .writter
                                                .image
                                        }
                                    />
                                }
                                title={
                                    VideoDetail
                                        .writter
                                        .name
                                }
                                description={
                                    VideoDetail.description
                                }
                            />
                        </List.Item>
                        {/* comments */}
                        <Comment
                            postId={videoId}
                            CommentLists={
                                CommentLists
                            }
                        />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        );
    } else {
        return <div>...Loading</div>;
    }
}

export default VideoDetailPage;
