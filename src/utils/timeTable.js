export default (appointments, timeSlots) => {
  return timeSlots.map((t) => {
    const appointment = appointments.find((app) => app.time === t) || {};
    return {
      time: t,
      ...appointment,
    };
  });
};
