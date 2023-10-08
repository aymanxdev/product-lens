import React from "react";
import { TicketItem } from "./TicketItem";
import "./ticket-detail.styles.scss";
import Comment from "../Comments/Comment";
import AddComment from "components/Comments/AddComment";

const mockComments = [
  {
    id: "1",
    user: {
      name: "John Doe",
      username: "john_doe",
      image: "https://via.placeholder.com/40x40",
    },
    content: "This is a comment.",
    replies: [
      {
        id: "1",
        user: {
          name: "Jane Doe",
          username: "jane_doe",
          image: "https://via.placeholder.com/40x40",
        },
        content: "This is a reply.",
        replyingTo: "john_doe",
      },
      {
        id: "2",
        user: {
          name: "Jane Doe",
          username: "jane_doe",
          image: "https://via.placeholder.com/40x40",
        },
        content: "This is a reply.",
        replyingTo: "john_doe",
      },
    ],
  },
];

const TicketDetail = () => {
  return (
    <div className="ticket-detail--container">
      <div className="breadcrumbs">breadcrumb</div>
      <TicketItem />
      <div className="comment-section-container">
        <h3>8 Comments</h3>
        {mockComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <AddComment />
    </div>
  );
};

export default TicketDetail;
