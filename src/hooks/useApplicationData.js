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

  const getSpotsForDay = function (dayObj, appointments) {
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      console.log("appointment.interview", appointment.interview);
      if (!appointment.interview) {
        spots++;
      }
    }
    console.log("spots", spots);
    console.log("dayObj", dayObj);
    return spots;
  };
  function updateSpots(dayName, days, appointments) {
    //find the day Object
    const dayObj = days.find((day) => day.name === dayName);
    //determine spot for day
    const spots = getSpotsForDay(dayObj, appointments);
    console.log(
      "return",
      days.map((day) => (day.name === dayName ? { ...dayObj, spots } : day))
    );
    return days.map((day) => (day.name === dayName ? { ...day, spots } : day));
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

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() =>
        setState({
          ...state,
          appointments,
          days: updateSpots(state.day, state.days, appointments),
        })
      )
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
