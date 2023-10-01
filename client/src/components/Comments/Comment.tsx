import React, { useState } from "react";
import CommentReply, { ReplyProps } from "./CommentReply";
import CommentReplyInput from "./CommentReplyInput";
import "./comment.styles.scss";

interface User {
  name: string;
  username: string;
  image: string;
}

interface Comment {
  content: string;
  user: User;
  replies: ReplyProps[];
  id: string;
}

interface CommentProps {
  comment: Comment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { content, user, replies, id } = comment;

  const [replyActive, setReplyActive] = useState(false);

  const onReplyClick = () => setReplyActive(!replyActive);

  return (
    <div className="comment-container">
      <div className="profile-picture-container">
        <img className="profile-picture" src={user.image} alt="Profile" />
      </div>
      <div
        className={replies && replies.length > 0 ? "nesting-line" : "hidden"}
      ></div>
      <div className="comment-parent">
        <h4 className="comment-author-name">{user.name}</h4>
        <div className="username-and-reply">
          <p className="comment-username">@{user.username}</p>
          <button className="reply-button" onClick={onReplyClick}>
            Reply
          </button>
        </div>
      </div>
      <div className="comment-body">
        <p className="comment-text">{content}</p>
      </div>
      {replyActive && (
        <CommentReplyInput
          id={id}
          userName={user.username}
          onReplyClick={onReplyClick}
        />
      )}
      {replies &&
        replies.map((reply) => (
          <CommentReply reply={reply} id={id} key={reply.id} />
        ))}
    </div>
  );
};

export default Comment;
