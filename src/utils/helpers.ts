import { Meeting, Review, ReviewState } from "../types/events";
import { format, isBefore, isToday, isTomorrow, isYesterday } from "date-fns";

export const groupEvents = (events: (Meeting | Review)[]) => {
  const overdue: (Meeting | Review)[] = [];
  const today: (Meeting | Review)[] = [];
  const tomorrow: (Meeting | Review)[] = [];

  events.forEach((event) => {
    if (isToday(event.start)) today.push(event);
    else if (isTomorrow(event.start)) tomorrow.push(event);
    else if (
      "state" in event &&
      event.state !== ReviewState.COMPLETED &&
      isBefore(event.end, new Date())
    )
      overdue.push(event);
  });
  return { overdue, today, tomorrow };
};

export const getRelativeDay = (date: Date) => {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "PPPP");
};
