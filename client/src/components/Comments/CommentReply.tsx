import React, { useState } from "react";
import CommentReplyInput from "./CommentReplyInput";
import "./comment.styles.scss";

interface User {
  name: string;
  username: string;
  image: string;
}

interface CommentReplyProps {
  reply: ReplyProps;
  id: string;
}

export interface ReplyProps {
  content: string;
  replyingTo: string;
  user: User;
  id: string;
}

const CommentReply: React.FC<CommentReplyProps> = ({ reply, id }) => {
  const { content, replyingTo, user } = reply;

  const [replyActive, setReplyActive] = useState(false);

  const onReplyClick = () => setReplyActive(!replyActive);

  return (
    <div className="reply-container">
      <div className="profile-picture-container">
        <img className="profile-picture" src={user.image} alt="Profile" />
      </div>
      <div className="comment-parent">
        <h4 className="comment-author-name">{user.name}</h4>
        <div className="username-and-reply">
          <p className="username">@{user.username}</p>
          <button className="reply-button" onClick={onReplyClick}>
            Reply
          </button>
        </div>
      </div>
      <div className="comment-body">
        <p className="comment-text">
          <span className="replying-to">@{replyingTo} </span>
          {content}
        </p>
      </div>
      {replyActive && (
        <CommentReplyInput
          userName={user.username}
          id={id}
          onReplyClick={onReplyClick}
        />
      )}
    </div>
  );
};

export default CommentReply;
