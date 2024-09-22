import React, { useContext, useEffect } from "react";
import { TicketItem } from "./TicketItem";
import "./ticket.styles.scss";
import Comment from "../Comments/Comment";
import AddComment from "components/Comments/AddComment";
// import BreadcrumbContext from "contexts/AppBreadcrumbs/BreadcrumbContext";

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
  // const context = useContext(BreadcrumbContext);

  // if (!context) {
  //   throw new Error('SomePage must be used within a BreadcrumbProvider');
  // }

  // const { addBreadcrumb } = context;

  // useEffect(() => {
  //   addBreadcrumb('Some Page');
  // }, [addBreadcrumb]);

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
