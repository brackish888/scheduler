import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    spots: "",
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    console.log("Start", state.days);
    setState((priorState) => ({ ...priorState, day: day }));
    console.log("Stop", state.days);
  };

  useEffect(() => {
    const daysUrl = axios.get(`/api/days`);
    const appointmentsUrl = axios.get(`/api/appointments`);
    const interviewersUrl = axios.get(`/api/interviewers`);
    const promises = [daysUrl, appointmentsUrl, interviewersUrl];

    Promise.all(promises).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function updateSpots(day) {
    console.log("state", state);
    console.log("day", day);
    if (state.appointments) {
      const dayFound = state.days.find((eachDay) => eachDay.name === day);
      console.log("dayFound", dayFound);
      const emptyAppointments = dayFound.appointments.filter(
        (appointmentId, id) =>
          state.appointments[appointmentId].interview === null
      );
      console.log("dayFound.appointments", dayFound.appointments);
      console.log("emptyApp", emptyAppointments);

      //return emptyAppointments.length;
      const daysSpots = [...state.days];

      console.log("daySpots", daysSpots);
      dayFound.spots = emptyAppointments.length;

      return daysSpots;
    }
  }
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayCount = updateSpots(state.day, id);

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments, days: dayCount }))
      .catch((error) => console.error(error));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayCount = updateSpots(state.day, id);

    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments, dayCount }))
      .catch((error) => console.error(error));
  }
  return { bookInterview, cancelInterview, setDay, state };
}
