import React, { useState } from "react";
import "./ticket.styles.scss";

const CreateTicket = () => {
  const [activeCategory, setActiveCategory] = useState("Feature");

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
          <div className="form-group">
            <label className="add-ticket-form-label">Ticket Title</label>
            <input type="text" className="add-ticket-form-input" />
            <div className="alert">This field is required</div>{" "}
            {/* Alert message */}
          </div>
          <div className="form-group">
            <label className="add-ticket-form-label">Category</label>
            <p>Choose a category for your feedback</p>
            <div className="ticket-dropdown-wrapper">
              <select
                className="ticket-dropdown"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                <option value="Feature">Feature</option>
                <option value="UI">UI</option>
                <option value="UX">UX</option>
                <option value="Enhancement">Enhancement</option>
                <option value="Bug">Bug</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="add-ticket-form-label">Details</label>
            <textarea className="add-ticket-form-input"></textarea>{" "}
            {/* Details input */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;

// const Checkmark = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
//     <path
//       fill="none"
//       stroke="#AD1FEA"
//       strokeWidth="2"
//       d="M1 5.233L4.522 9 12 1"
//     />
//   </svg>
// );
