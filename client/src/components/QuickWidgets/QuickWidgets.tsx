import React from "react";
import { Tag } from "common/Tag/Tag";
import { Widget } from "common/Widget/Widget";

import "./quick-widgets.styles.scss";
export const QuickWidgets = () => {
  return (
    <div className="left-widgets-wrapper">
      here goes some widgets
      <div className="feedback-widget">
        <h3>John Doe</h3>
        <p>Frontend Engineer</p>
      </div>
      <Widget direction="row">
        <Tag colour="primary">
          <span className="tag-text">All</span>
        </Tag>
      </Widget>
      <Widget direction="col">
        <div className="roadmap-widget-heading">
          <p>Roadmap</p>
          <a>View</a>
        </div>
        <div className="roadmap-widget-options">
          <div className="roadmap-widget-option-wrapper">
            <div className="roadmap-option">
              <span className="roadmap-widget-option-icon orange"></span>
              <span className="roadmap-widget-option-text">Planned</span>
            </div>
            <span className="roadmap-widget-option-counter">2</span>
          </div>
          <div className="roadmap-widget-option-wrapper">
            <div className="roadmap-option">
              <span className="roadmap-widget-option-icon purple"></span>
              <span className="roadmap-widget-option-text">In-Progress</span>
            </div>
            <span className="roadmap-widget-option-counter">2</span>
          </div>
          <div className="roadmap-widget-option-wrapper">
            <div className="roadmap-option">
              <span className="roadmap-widget-option-icon blue"></span>
              <span className="roadmap-widget-option-text">Live</span>
            </div>
            <span className="roadmap-widget-option-counter">2</span>
          </div>
        </div>
      </Widget>
    </div>
  );
};
