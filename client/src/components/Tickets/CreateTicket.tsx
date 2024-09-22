import React, { useState } from "react";
import "./create-ticket.styles.scss";
import { api } from "api/api";

const CreateTicket = () => {
  const [activeCategory, setActiveCategory] = useState("Feature");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
    if (e.target.value.trim()) setTitleError(false);
  };

  const handleDetailsChange = (e: any) => {
    setDetails(e.target.value);
    if (e.target.value.trim()) setDetailsError(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let isValid = true;
    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    }
    if (!details.trim()) {
      setDetailsError(true);
      isValid = false;
    }
    if (isValid) {
      // Placeholder for API call
      console.log("Form Data:", { title, activeCategory, details });
      const response = await api.post("/tickets", {
        title,
        description: details,
        category: activeCategory,
      });
      // Reset form
      setTitle("");
      setDetails("");
      setActiveCategory("Feature");
      return response.data;
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
        <form onSubmit={handleSubmit} className="add-ticket-form-container">
          <label className="add-ticket-form-label">Ticket Title</label>
          <p>Add a short, descriptive headline</p>
          <input
            type="text"
            className="add-ticket-form-input"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <div className="alert">This field is required</div>}
          <label className="add-ticket-form-label">Category</label>
          <p>Choose a category for your ticket</p>
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
          <label className="add-ticket-form-label">Details</label>
          <p>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
          <textarea
            className="add-ticket-form-input text-area"
            value={details}
            onChange={handleDetailsChange}
          ></textarea>
          {detailsError && <div className="alert">This field is required</div>}
          <div className="add-ticket-form-btn-wrapper">
            <button type="button" className="add-ticket-form-btn">
              Cancel
            </button>
            <button type="submit" className="add-ticket-form-btn">
              Add Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
