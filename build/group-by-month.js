export const groupByMonth = (collection) => {
  const groupedByMonth = {};

  // Use for...of loop instead of forEach
  for (const item of collection) {
    const { date } = item;
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;

    if (!groupedByMonth[monthKey]) {
      groupedByMonth[monthKey] = {
        date: new Date(date.getFullYear(), date.getMonth(), 1),
        pages: [],
      };
    }

    groupedByMonth[monthKey].pages.push(item);
  }

  // Use Object.entries and map for more idiomatic ES6
  return Object.entries(groupedByMonth)
    .map(([, value]) => value)
    .sort((a, b) => b.date - a.date);
};
