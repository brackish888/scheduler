import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [getName, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const onChange = function (event) {
    setName(event.target.value);
  };
  const reset = function () {
    setName("");
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    props.onCancel();
  };

  const validate = () => {
    if (getName === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(getName, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={getName}
            onChange={onChange}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>

        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} cancel>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
