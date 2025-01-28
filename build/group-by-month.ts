type CollectionItem = {
  date: Date;
  [key: string]: unknown;
};

type MonthGroup = {
  date: Date;
  pages: CollectionItem[];
};

type MonthGroups = {
  [key: string]: MonthGroup;
};

export const groupByMonth = (collection: CollectionItem[]): MonthGroup[] => {
  const groupedByMonth: MonthGroups = {};

  for (const item of collection) {
    const { date } = item;
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;

    if (!groupedByMonth[monthKey]) {
      groupedByMonth[monthKey] = {
        date: new Date(date.getFullYear(), date.getMonth(), 12),
        pages: [],
      };
    }

    groupedByMonth[monthKey].pages.push(item);
  }

  // Use Object.entries and map for more idiomatic ES6
  return Object.entries(groupedByMonth)
    .map(([, value]) => value)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};
