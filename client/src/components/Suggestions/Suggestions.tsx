import { QuickWidgets } from "components/QuickWidgets/QuickWidgets";
import "./suggestions.styles.scss";
import { Button } from "common/Button/Button";
import Dropdown from "common/Dropdown/Dropdown";
import { TicketItem } from "components/Tickets/TicketItem";

const sortOptions = [
  "Most Upvotes",
  "Least Upvotes",
  "Most Comments",
  "Least Comments",
];

const Suggestions = () => {
  const handleSortSelection = (selectedOption: string) => {
    console.log("Selected Sort Option:", selectedOption);
    // Implement your sorting logic here based on the selectedOption
  };
  const test = true;
  return (
    <div className="suggestions-container">
      <QuickWidgets />
      <div className="suggestions-wrapper">
        here goes some suggestions
        <div className="suggestions-control-panel">
          <div className="filter-wrapper">
            <span className="bulb-icon"></span>
            <span className="suggestions-counter-text">3 Suggestions</span>

            <div className="sort-filter-wrapper">
              <span className="sort-filter-text">Sort by: </span>
              <Dropdown options={sortOptions} onSelect={handleSortSelection} />
            </div>
          </div>
          <div className="add-feedback-wrapper">
            <Button variant="primary" size="medium">
              + Add Feedback
            </Button>
          </div>
        </div>
        {test ? (
          <TicketItem />
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Suggestions;
