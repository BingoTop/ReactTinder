import React, {
    useEffect,
    useState,
} from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [
        ChildCommentNumber,
        setChildCommentNumber,
    ] = useState(0);
    useEffect(() => {
        let commentNumber = 0;
        props.commentsLists.map((comment) => {
            if (
                comment.responseTo ===
                props.parentCommentId
            ) {
                commentNumber++;
            }
            setChildCommentNumber(commentNumber);
        });
    }, []);
    const renderReplyComment = (
        parentCommentId
    ) =>
        props.commentLists.map(
            (index, comment) => (
                <>
                    {comment.responseTo ===
                        parentCommentId && (
                        <div>
                            <SingleComment
                                comment={comment}
                                key={index}
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
                                    props.CommentLists
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
    return (
        <div>
            {ChildCommentNumber > 0 && (
                <p
                    style={{
                        fontSize: '14px',
                        margin: 0,
                        color: 'gray',
                    }}
                >
                    View {ChildCommentNumber} more
                    comment(s)
                </p>
            )}
            {renderReplyComment(
                props.parentCommentId
            )}
        </div>
    );
}

export default ReplyComment;
