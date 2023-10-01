import React, { useState } from "react";
// import DataContext from '../../context/data/dataContext';
import "./comment.styles.scss";

interface ReplyInputProps {
  id: string;
  onReplyClick: () => void;
  userName: string;
}

const ReplyInput: React.FC<ReplyInputProps> = ({ onReplyClick }) => {
  //   const { addReply } = useContext(DataContext);
  const [userReply, setUserReply] = useState("");
  const [alert, setAlert] = useState(false);

  const userReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setUserReply(e.target.value.substring(0, 250));

  const onPostReplyClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (userReply.length === 0) {
      setAlert(true);
    } else {
      onReplyClick();
      //   addReply(userReply, id, userName);
      setUserReply("");
      setAlert(false);
    }
  };

  return (
    <form
      className="reply-input-container"
      autoComplete="off"
      onSubmit={onPostReplyClick}
    >
      <textarea
        name="userReply"
        className={alert ? "reply-input alert" : "reply-input"}
        placeholder="Type your reply here"
        value={userReply}
        onChange={userReplyChange}
      />
      <p className={alert ? "alert-text" : "hidden"}>
        Can't leave any fields empty
      </p>
      <input type="submit" className="post-reply-button" value="Post Reply" />
    </form>
  );
};

export default ReplyInput;
