export function extractTime(isoString) {
  const date = new Date(isoString);
  const today = new Date();

  const isToday = date.toDateString() === today.toDateString();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours.toString().padStart(2, "0");

  const timeString = `${hours}:${minutes} ${ampm}`;
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const dateString = date.toLocaleDateString(undefined, dateOptions);

  return isToday ? timeString : `${dateString} ${timeString}`;
}
