import React, {
    useEffect,
    useState,
} from 'react';
import SingleComment from './SingleComment';
import { withRouter } from 'react-router-dom';

function ReplyComment(props) {
    const [
        OpenReplyComments,
        setOpenReplyComments,
    ] = useState(false);
    const [
        ChildCommentNumber,
        setChildCommentNumber,
    ] = useState(0);
    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map((comment) => {
            if (
                comment.responseTo ===
                props.parentCommentId
            ) {
                commentNumber++;
            }
            setChildCommentNumber(commentNumber);
        });
    }, [props.commentLists]);
    const renderReplyComment = (
        parentCommentId
    ) =>
        props.commentLists.map(
            (comment, index) => (
                <>
                    {comment.responseTo ===
                        parentCommentId && (
                        <div
                            style={{
                                width: '80%',
                                marginLeft:
                                    '40px',
                            }}
                        >
                            <SingleComment
                                comment={comment}
                                postId={
                                    props.postId
                                }
                                comment={comment}
                            />
                            <ReplyComment
                                postId={
                                    props.postId
                                }
                                commentLists={
                                    props.commentLists
                                }
                                parentCommentId={
                                    comment._id
                                }
                            />
                        </div>
                    )}
                </>
            )
        );
    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments);
    };
    return (
        <div>
            {ChildCommentNumber > 0 && (
                <p
                    style={{
                        fontSize: '14px',
                        margin: 0,
                        color: 'gray',
                        cursor: 'pointer',
                    }}
                    onClick={onHandleChange}
                >
                    View {ChildCommentNumber} more
                    comment(s)
                </p>
            )}
            {OpenReplyComments &&
                renderReplyComment(
                    props.parentCommentId
                )}
        </div>
    );
}

export default withRouter(ReplyComment);
