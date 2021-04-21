export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }

  const found = state.days.find((dayApp) => dayApp.name === day);

  if (!found) {
    return [];
  }

  const newArr = found.appointments.map((appId) => {
    if (state.appointments[appId]) {
      return { ...state.appointments[appId] };
    }
  });
  return newArr;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  } else {
    let intData = state.interviewers[interview.interviewer];

    if (interview.interviewer) {
      return {
        student: interview.student,
        interviewer: {
          id: interview.interviewer,
          name: intData.name,
          avatar: intData.avatar,
        },
      };
    } else {
      return null;
    }
  }
}

export function getInterviewersForDay(state, day) {
  const found = state.days.find((eachDay) => eachDay.name === day);

  if (!found) {
    return [];
  }

  const newArr = found.interviewers.map((interviewId) => {
    if (state.interviewers[interviewId]) {
      return { ...state.interviewers[interviewId] };
    }
  });
  return newArr;
}
