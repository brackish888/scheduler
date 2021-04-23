import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  prettyDOM,
  waitForElementToBeRemoved,
  getByDisplayValue,
  queryByText,
  queryByAltText,
  getAllByAltText,
  fireEvent,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// jest.mock("axios");

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //1 - Render the Application.
    const { container } = render(<Application />);
    //2 - Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    //3 - Click "Edit" button on the booked appointment.
    fireEvent.click(queryByAltText(appointment, "Edit"));
    //4 - Check if Archie Cohen is on the screen.
    expect(
      getByPlaceholderText(appointment, "Enter Student Name")
    ).toBeInTheDocument();
    //5 - Change Name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    //6 - Click on Interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //7 - Click on Save
    fireEvent.click(getByText(appointment, "Save"));
    //8 - Check State
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //9 - Check for the new name
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //10 - Check that monday has 1 spot remaining
    const day = getAllByTestId(container, "day").find((day) =>
      getByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Save Error"));
    expect(getByText(appointment, "Save Error"));

    fireEvent.click(getByAltText(appointment, "Close"));
    expect(queryByText(appointment, "Save Error")).not.toBeInTheDocument();
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure?")).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    expect(getByText(appointment, "Deleting"));
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    expect(getByText(appointment, "Delete Error")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));

    expect(queryByText(appointment, "Delete Error")).not.toBeInTheDocument();
    const day = getAllByTestId(container, "day").find((day) =>
      getByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});
