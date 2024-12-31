export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export type WeatherType = "sun" | "fog" | "drizzle" | "rain" | "snow";

export const seattleWeather: { month: Month; weatherType: WeatherType; numDays: number }[] = [
  // Winter months
  { month: "January", weatherType: "rain", numDays: 15 },
  { month: "January", weatherType: "snow", numDays: 2 },
  { month: "January", weatherType: "fog", numDays: 8 },
  { month: "January", weatherType: "drizzle", numDays: 4 },
  { month: "January", weatherType: "sun", numDays: 2 },

  { month: "February", weatherType: "rain", numDays: 12 },
  { month: "February", weatherType: "snow", numDays: 1 },
  { month: "February", weatherType: "fog", numDays: 7 },
  { month: "February", weatherType: "drizzle", numDays: 5 },
  { month: "February", weatherType: "sun", numDays: 3 },

  // Spring months
  { month: "March", weatherType: "rain", numDays: 13 },
  { month: "March", weatherType: "fog", numDays: 5 },
  { month: "March", weatherType: "drizzle", numDays: 8 },
  { month: "March", weatherType: "sun", numDays: 5 },

  { month: "April", weatherType: "rain", numDays: 11 },
  { month: "April", weatherType: "fog", numDays: 4 },
  { month: "April", weatherType: "drizzle", numDays: 9 },
  { month: "April", weatherType: "sun", numDays: 6 },

  { month: "May", weatherType: "rain", numDays: 8 },
  { month: "May", weatherType: "fog", numDays: 3 },
  { month: "May", weatherType: "drizzle", numDays: 10 },
  { month: "May", weatherType: "sun", numDays: 10 },

  // Summer months
  { month: "June", weatherType: "rain", numDays: 5 },
  { month: "June", weatherType: "fog", numDays: 2 },
  { month: "June", weatherType: "drizzle", numDays: 8 },
  { month: "June", weatherType: "sun", numDays: 15 },

  { month: "July", weatherType: "rain", numDays: 3 },
  { month: "July", weatherType: "fog", numDays: 1 },
  { month: "July", weatherType: "drizzle", numDays: 5 },
  { month: "July", weatherType: "sun", numDays: 22 },

  { month: "August", weatherType: "rain", numDays: 2 },
  { month: "August", weatherType: "fog", numDays: 1 },
  { month: "August", weatherType: "drizzle", numDays: 4 },
  { month: "August", weatherType: "sun", numDays: 24 },

  // Fall months
  { month: "September", weatherType: "rain", numDays: 6 },
  { month: "September", weatherType: "fog", numDays: 3 },
  { month: "September", weatherType: "drizzle", numDays: 7 },
  { month: "September", weatherType: "sun", numDays: 14 },

  { month: "October", weatherType: "rain", numDays: 10 },
  { month: "October", weatherType: "fog", numDays: 5 },
  { month: "October", weatherType: "drizzle", numDays: 10 },
  { month: "October", weatherType: "sun", numDays: 6 },

  { month: "November", weatherType: "rain", numDays: 14 },
  { month: "November", weatherType: "fog", numDays: 6 },
  { month: "November", weatherType: "drizzle", numDays: 7 },
  { month: "November", weatherType: "sun", numDays: 3 },

  { month: "December", weatherType: "rain", numDays: 15 },
  { month: "December", weatherType: "snow", numDays: 1 },
  { month: "December", weatherType: "fog", numDays: 8 },
  { month: "December", weatherType: "drizzle", numDays: 5 },
  { month: "December", weatherType: "sun", numDays: 2 },
];

export const weatherColors = {
  sun: "goldenrod",
  fog: "gray",
  drizzle: "blue",
  rain: "green",
  snow: "lightblue",
};

export const monthShorthand = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
