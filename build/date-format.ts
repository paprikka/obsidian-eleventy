import { DateTime } from "luxon";

export const dateFormat = (dateObj: Date, format: string = "LLL d, y"): string => {
  return DateTime.fromJSDate(dateObj, {
    zone: "utc",
  }).toFormat(format);
};
