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
    setState((priorState) => ({ ...priorState, day: day }));
  };

  const spotsLeft = (dayName, days, appointments) => {
    let spot = 0;
    const chosenDay = days.find((day) => day.name === dayName);
    for (let appointment in appointments) {
      if (
        appointments[appointment].interview === null &&
        chosenDay.appointments.includes(appointments[appointment].id)
      ) {
        spot++;
      }
    }
    return {
      ...chosenDay,
      spots: spot,
    };
  };

  const updatedSpots = (dayObject, arrayOfDays) => {
    return arrayOfDays.map((day) =>
      day.name === dayObject.name ? dayObject : day
    );
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updatedSpots(
      spotsLeft(state.day, state.days, appointments),
      state.days
    );
    return axios.put(`/api/appointments/${id}`, { interview }).then(() =>
      setState((prev) => {
        return {
          ...prev,
          appointments,
          days,
        };
      })
    );
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

    const days = updatedSpots(
      spotsLeft(state.day, state.days, appointments),
      state.days
    );

    return axios
      .delete(`/api/appointments/${id}`, { interview: null })
      .then(() =>
        setState((prev) => {
          return {
            ...prev,
            appointments,
            days,
          };
        })
      );
  }
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
  return { bookInterview, cancelInterview, setDay, state };
}
