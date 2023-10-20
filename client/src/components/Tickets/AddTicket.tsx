import React, { useState } from "react";
import "./ticket.styles.scss";

// Checkmark markup
const checkMark = (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
    <path
      fill="none"
      stroke="#AD1FEA"
      strokeWidth="2"
      d="M1 5.233L4.522 9 12 1"
    />
  </svg>
);
const AddTicket = () => {
  const [activeCategory, setActiveCategory] = useState("Feature");
  const [open, setOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackDetail, setFeedbackDetail] = useState("");
  const [titleAlert, setTitleAlert] = useState(false);
  const [descAlert, setDescAlert] = useState(false);

  const toggleOpen = () => setOpen((prevOpen) => !prevOpen);
  const handleOptionClick = (e: any) => {
    setActiveCategory(e.target.innerText);
    toggleOpen();
  };
  const handleInputChange = (e: any, setter: any) => setter(e.target.value);

  const handleAddFeedbackClick = (e: any) => {
    e.preventDefault();
    if (!feedbackTitle && !feedbackDetail) {
      setTitleAlert(true);
      setDescAlert(true);
    } else if (!feedbackTitle) {
      setTitleAlert(true);
      setDescAlert(false);
    } else if (!feedbackDetail) {
      setTitleAlert(false);
      setDescAlert(true);
    } else {
      // addFeedback(feedbackTitle, activeCategory, feedbackDetail);
      // onGoBackClick();
    }
  };

  return (
    <div className="add-ticket-main-container">
      <div className="add-ticket-wrapper">
        <div className="add-ticket-icon">
          <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient
                cx="103.9%"
                cy="-10.387%"
                fx="103.9%"
                fy="-10.387%"
                r="166.816%"
                id="a"
              >
                <stop stopColor="#E84D70" offset="0%" />
                <stop stopColor="#A337F6" offset="53.089%" />
                <stop stopColor="#28A7ED" offset="100%" />
              </radialGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <circle fill="url(#a)" cx="28" cy="28" r="28" />
              <path
                fill="#FFF"
                fillRule="nonzero"
                d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
              />
            </g>
          </svg>
        </div>
        <h1 className="add-ticket-header">Create New Ticket</h1>
        <div className="add-ticket-form-container">
          <label className="add-ticket-form-label">Ticket Title</label>
          <input className="add-ticket-form-input" type="text" />
          {/* Simplified markup for category dropdown */}
          <div className="ticket-category-container">
            <h4 className="header4 ticket-modal-bold">Category</h4>
            <p className="body2 ticket-modal-light">
              Choose a category for your feedback
            </p>
            <div className="ticket-dropdown-wrapper">
              <button
                className={open ? "ticket-dropdown open" : "ticket-dropdown"}
                onClick={toggleOpen}
              >
                {activeCategory}
              </button>
              {open && (
                <div className="options">
                  {["Feature", "UI", "UX", "Enhancement", "Bug"].map(
                    (category) => (
                      <div
                        key={category}
                        className="option body1"
                        onClick={handleOptionClick}
                      >
                        {category}
                        {activeCategory === category && <Checkmark />}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <label className="add-ticket-form-label">Ticket Title</label>
        <input className="add-ticket-form-input" type="text" />
      </div>
    </div>
  );
};

export default AddTicket;

const Checkmark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
    <path
      fill="none"
      stroke="#AD1FEA"
      strokeWidth="2"
      d="M1 5.233L4.522 9 12 1"
    />
  </svg>
);
