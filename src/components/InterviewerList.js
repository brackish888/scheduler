import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  return (
   <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    {props.interviewers.map(interviewer => {
      return <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.interviewer === interviewer.id}
        setInterviewer={props.setInterviewer}

      />
    })}
    <ul className="interviewers__list"></ul>
  </section>
)} 