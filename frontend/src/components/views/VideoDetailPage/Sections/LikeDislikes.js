import React, {
    useEffect,
    useState,
} from 'react';
import { Tooltip } from 'antd';
import {
    DislikeFilled,
    LikeFilled,
    LikeOutlined,
    DislikeOutlined,
} from '@ant-design/icons';
import Axios from 'axios';

function LikeDislikes(props) {
    const [Likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(
        null
    );
    const [Dislikes, setDislikes] = useState(0);
    const [
        DislikeAction,
        setDislikeAction,
    ] = useState(null);
    let variable = {};

    if (props.video) {
        variable = {
            videoId: props.videoId,
            userId: props.userId,
        };
    } else {
        variable = {
            commentId: props.commentId,
            userId: props.userId,
        };
    }
    useEffect(() => {
        Axios.post(
            '/api/like/getLikes',
            variable
        ).then((res) => {
            if (res.data.success) {
                // 좋아요 얼마나 받았는지
                setLikes(res.data.likes.length);
                // 내가 이미 좋아요를 눌렀는지
                res.data.likes.map((like) => {
                    if (
                        like.useId ===
                        props.userId
                    ) {
                        setLikeAction('liked');
                    }
                });
            } else {
                alert(
                    '좋아요 정보 가져오기 실패'
                );
            }
        });
    }, []);
    useEffect(() => {
        Axios.post(
            '/api/like/getDislikes',
            variable
        ).then((res) => {
            if (res.data.success) {
                // 싫어요 얼마나 받았는지
                setDislikes(
                    res.data.dislikes.length
                );
                // 내가 이미 싫어요를 눌렀는지
                res.data.dislikes.map(
                    (dislike) => {
                        if (
                            dislike.useId ===
                            props.userId
                        ) {
                            setDislikeAction(
                                'disiked'
                            );
                        }
                    }
                );
            } else {
                alert(
                    '싫어요 정보 가져오기 실패'
                );
            }
        });
    }, []);

    const onLike = () => {
        if (LikeAction === null) {
            Axios.post(
                '/api/like/upLike',
                variable
            ).then((res) => {
                if (res.data.success) {
                    setLikes(Likes + 1);
                    setLikeAction('liked');
                    if (DislikeAction !== null) {
                        setDislikeAction(null);
                        setDislikes(Dislikes - 1);
                    }
                } else {
                    alert('Like 실패');
                }
            });
        } else {
            Axios.post(
                '/api/like/unLike',
                variable
            ).then((res) => {
                if (res.data.success) {
                    setLikes(Likes - 1);
                    setLikeAction(null);
                } else {
                    alert('Like 내리기 실패');
                }
            });
        }
    };

    const onDisLike = () => {
        if (DislikeAction !== null) {
            Axios.post(
                '/api/like/unDislike',
                variable
            ).then((res) => {
                if (res.data.success) {
                    setDislikes(Dislikes - 1);
                    setDislikeAction(null);
                } else {
                    alert('Dislike 실패');
                }
            });
        } else {
            Axios.post(
                '/api/like/upDislike',
                variable
            ).then((res) => {
                if (res.data.success) {
                    setDislikes(Dislikes + 1);
                    setDislikeAction('disliked');
                    if (LikeAction !== null) {
                        setLikeAction(null);
                        setLikes(Likes - 1);
                    }
                }
            });
        }
    };
    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    {LikeAction === 'liked' ? (
                        <LikeFilled
                            onClick={onLike}
                        />
                    ) : (
                        <LikeOutlined
                            onClick={onLike}
                        />
                    )}
                </Tooltip>
            </span>
            <span
                style={{
                    paddingLeft: '8px',
                    cursor: 'auto',
                }}
            >
                {Likes}
            </span>
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {DislikeAction ===
                    'disliked' ? (
                        <DislikeFilled
                            onClick={onDisLike}
                        />
                    ) : (
                        <DislikeOutlined
                            onClick={onDisLike}
                        />
                    )}
                </Tooltip>
            </span>
            <span
                style={{
                    paddingLeft: '8px',
                    cursor: 'auto',
                }}
            >
                {Dislikes}
            </span>
        </div>
    );
}

export default LikeDislikes;
