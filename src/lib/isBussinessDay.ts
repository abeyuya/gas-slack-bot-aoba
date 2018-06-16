
export const isBusinessDay = (): boolean => {
  const date = new Date();

  // sunday, saturday
  if (date.getDay() === 0 || date.getDay() === 6) {
    return false;
  }

  const calJa = CalendarApp.getCalendarById("ja.japanese#holiday@group.v.calendar.google.com");
  if (calJa.getEventsForDay(date).length > 0) { return false; }
  return true;
};
