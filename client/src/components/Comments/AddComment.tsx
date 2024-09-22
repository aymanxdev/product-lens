import { useState } from "react";

const AddComment = () => {
  // Declare and destructure context
  //   const dataContext = useContext(DataContext);
  //   const { addComment } = dataContext;

  // Declare comp level state
  const [chars, setChars] = useState(250);
  const [userComment, setUserComment] = useState("");
  const [alert, setAlert] = useState(false);

  // On comment change
  const userCommentChange = (e: any) => {
    // Set state for input field
    setUserComment(e.target.value.substring(0, 250));

    // Set state for chars remaining
    const inputString = e.target.value;
    const newChars = inputString.length > 250 ? 0 : 250 - inputString.length;
    setChars(newChars);
  };

  // On form submition
  const onPostClick = (e: any) => {
    e.preventDefault();
    if (userComment.length === 0) {
      const newAlert = true;
      setAlert(newAlert);
    } else {
      const newAlert = false;
      //   addComment(userComment);
      setAlert(newAlert);
      setUserComment("");
      setChars(250);
    }
  };

  return (
    <form
      className="add-comment-container"
      autoComplete="off"
      onSubmit={onPostClick}
    >
      <h3 className="add-comment-header">Add Comment</h3>
      <textarea
        name="userComment"
        className={`add-comment-input ${alert ? "alert" : ""}`}
        placeholder="Type your comment here"
        value={userComment}
        onChange={userCommentChange}
      />
      <p className={alert ? "alert-text reply-alert" : "hidden"}>
        Can't leave any fields empty
      </p>
      <div className="add-comment-bottom-container ">
        <p id="chars-left" className="body2">
          {chars} Characters Left
        </p>
        <input
          type="submit"
          className="post-reply-button"
          value="Post Comment"
        ></input>
      </div>
    </form>
  );
};

export default AddComment;
