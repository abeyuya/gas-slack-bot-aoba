
export const randomPickup = (array: any[], pickupCount: number): any[] => {
  const a = array;
  const t: any = [];
  const r: any = [];
  let l = a.length;
  let n = pickupCount < l ? pickupCount : l;

  while (n-- > 0) {
    const i = Math.floor(Math.random() * l) || 0;
    r[n] = t[i] || a[i];
    --l;
    t[i] = t[l] || a[l];
  }

  return r;
};

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
