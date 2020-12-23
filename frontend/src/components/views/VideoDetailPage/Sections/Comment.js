import Axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { Avatar, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';

const { TextArea } = Input;

function Comment(props) {
    const user = useSelector(
        (state) => state.user
    );
    const videoId = props.postId;
    const [
        CommentValue,
        setCommentValue,
    ] = useState('');

    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        if (
            user.userData &&
            !user.userData.isAuth
        ) {
            return props.history.push('/login');
        }
        e.preventDefault();
        const variables = {
            content: CommentValue,
            writter: user.userData._id,
            postId: videoId,
        };
        Axios.post(
            '/api/comment/saveComment',
            variables
        ).then((res) => {
            if (res.data.success) {
                setCommentValue('');
            } else {
                alert('댓글 작성 실패');
            }
        });
    };

    return (
        <div>
            <br />
            <p>댓글</p>
            {/* Comment Lists */}
            {props.CommentLists &&
                props.CommentLists.map(
                    (comment, index) =>
                        !comment.responseTo && (
                            <>
                                <SingleComment
                                    comment={
                                        comment
                                    }
                                    postId={
                                        videoId
                                    }
                                    comment={
                                        comment
                                    }
                                />
                                <ReplyComment
                                    parentCommentId={
                                        comment._id
                                    }
                                    postId={
                                        videoId
                                    }
                                    commentLists={
                                        props.CommentLists
                                    }
                                />
                            </>
                        )
                )}

            {/* Root comment form */}
            <form
                onSubmit={onSubmit}
                style={{ display: 'flex' }}
            >
                <TextArea
                    style={{
                        width: '100%',
                        borderRadius: '5px',
                    }}
                    value={CommentValue}
                    placeholder="코멘트를 작성해주세요."
                    onChange={handleClick}
                ></TextArea>
                <br />
                <Button
                    style={{
                        width: '20%',
                        height: '52px',
                    }}
                    onClick={onSubmit}
                >
                    등록
                </Button>
            </form>
        </div>
    );
}

export default withRouter(Comment);
