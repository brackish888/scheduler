import React from "react";

import "components/InterviewerListItem.scss";

// import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerItemClass = `interviewers__item ${
    props.selected ? "interviewers__item--selected" : ""
  }`;

  return (
    <li className={interviewerItemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
