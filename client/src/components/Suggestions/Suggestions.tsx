import React from "react";
import "./suggestions.styles.scss";
import { Button } from "common/Button/Button";
const Suggestions = () => {
  return (
    <div className="suggestions-container">
      <div className="left-widgets-wrapper">
        here goes some widgets
        <div className="feedback-widget"></div>
        <div className="filters-widget"></div>
        <div className="roadmap-widget"></div>
      </div>
      <div className="suggestions-wrapper">
        here goes some suggestions
        <div className="suggestions-control-panel">
          <div className="sort-filter-wrapper">
            <span className="bulb-icon"></span>
            <span className="suggestions-counter-text">3 Suggestions</span>

            <div>
              <span className="sort-filter-text">Sort by: </span>
              <select className="sort-filter-select">
                <option value="most-upvotes">Most Upvotes</option>
                <option value="least-upvotes">Least Upvotes</option>
                <option value="most-comments">Most Comments</option>
                <option value="least-comments">Least Comments</option>
              </select>
            </div>
          </div>
          <div className="add-feedback-wrapper">
            <Button variant="primary" size="medium">
              + Add Feedback
            </Button>
          </div>
        </div>
        <div className="suggestions-board">
          <div className="empty-suggestions-wrapper">
            <span className="empty-suggestions-icon"></span>
            <span className="empty-suggestions-text">
              There is no feedback yet.
            </span>
            <span className="empty-suggestions-subtext">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </span>
            <Button variant="primary" size="medium">
              + Add Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
