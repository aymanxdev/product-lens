import { ReactComponent as UpVoteArrow } from "../../assets/icons/dropdown-arrow.svg";
import { ReactComponent as CommentIcon } from "../../assets/icons/comment.svg";
import "./ticket-item.styles.scss";
import { Tag } from "common/Tag/Tag";

export const TicketItem = () => {
  return (
    <div className="ticket-item-container">
      <div className="vote-counter-wrapper">
        <div className="vote-counter-card">
          <span className="upvote-arrow">
            <UpVoteArrow />
          </span>
          <span className="vote-counter">123</span>
        </div>
      </div>
      <div className="ticket-item--content">
        <span className="ticket-item--content--title ">
          Add tags for solutions
        </span>
        <p className="ticket-item--content--description">
          Easier to search for solutions based on a specific stack.
        </p>
        <Tag colour="primary">
          <span>Enhancement</span>
        </Tag>
      </div>
      <div className="ticket-item-comments-counter">
        <span className="comment-icon">
          <CommentIcon />
        </span>
        <span className="comments-counter">2</span>
      </div>
    </div>
  );
};
