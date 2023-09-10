import React from "react";
import { Tag } from "common/Tag/Tag";
import { Widget } from "common/Widget/Widget";

import "./quick-widgets.styles.scss";
export const QuickWidgets = () => {
  return (
    <div className="left-widgets-wrapper">
      here goes some widgets
      <div className="feedback-widget"></div>
      <Widget direction="row">
        <Tag colour="primary">
          <span className="tag-text">All</span>
        </Tag>
      </Widget>
      <Widget direction="col">
        <div className="roadmap-widget-heading">
          <p>Roadmap </p>
          <a>View</a>
        </div>
      </Widget>
    </div>
  );
};
