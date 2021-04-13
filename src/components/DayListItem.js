import React from "react";

import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  const formatSpots = classNames("day-list_item", {
    "day-list_item--unselected": props.spots !== 0,
  });
  return ( 
    <li onClick={() => props.setDay(props.name)}
    className={dayClass, formatSpots}>
      <div>2 spots remaining</div>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}