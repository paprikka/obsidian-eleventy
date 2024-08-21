import { DateTime } from "luxon";

export const dateFormat = (dateObj, format = "LLL d, y") => {
  return DateTime.fromJSDate(dateObj, {
    zone: "utc",
  }).toFormat(format);
};
