export type Height = {
  feet: number;
  inches: number;
};

export type SingerHeight = {
  name: string;
  height: Height;
};

export const singerHeights: SingerHeight[] = [
  { name: "Taylor Swift", height: { feet: 5, inches: 10 } },
  { name: "Megan Thee Stallion", height: { feet: 5, inches: 10 } },
  { name: "Dua Lipa", height: { feet: 5, inches: 8 } },
  { name: "Beyoncé", height: { feet: 5, inches: 7 } },
  { name: "Selena Gomez", height: { feet: 5, inches: 5 } },
  { name: "Ariana Grande", height: { feet: 5, inches: 1 } },
  { name: "Sabrina Carpenter", height: { feet: 5, inches: 0 } },
];

export const heightToInches = (height: Height) => height.feet * 12 + height.inches;
