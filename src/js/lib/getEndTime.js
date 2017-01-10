const ONE_DAY = 86400000;
const SIX_HOURS = 21600000;

export default function getEndTime (date) {
  // next day + 6 hours
  const start = new Date(date).getTime();
  const end = start + ONE_DAY + SIX_HOURS;
  return end;
}
