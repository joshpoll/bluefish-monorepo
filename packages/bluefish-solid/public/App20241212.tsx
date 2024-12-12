import { For, ParentProps, type Component, JSX } from "solid-js";
import { Bluefish, Distribute, Ref, StackH, StackV, Text } from "../src";
import { Box } from "../gofish/box";

const values = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

type Month =
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
type WeatherType = "sun" | "fog" | "drizzle" | "rain" | "snow";

const seattleWeather: { month: Month; weatherType: WeatherType; numDays: number }[] = [
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

const colors = {
  sun: "goldenrod",
  fog: "gray",
  drizzle: "blue",
  rain: "green",
  snow: "lightblue",
};

const monthShorthand = {
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

const Space = {
  LinearY: (props: ParentProps) => {
    return <>{props.children}</>;
  },
};

const GroupBy = <T, K extends string | number | symbol, U extends JSX.Element>(props: {
  each: T[];
  by: (item: T) => K;
  children: (items: T[], key: K) => U;
}) => {
  return (
    <For each={Object.entries(Object.groupBy(props.each, props.by))}>
      {([key, items]) => props.children(items as T[], key as K)}
    </For>
  );
};

const App: Component = () => {
  return (
    <>
      {/* I guess in this one the y positions and heights are determined by the space. or should be at least (but I can't put the boxes inside the distribute b/c distribute can't calculate its bounding box properly at the moment...) */}
      <Bluefish>
        <For each={values}>{(value) => <Box name={`${value}`} y2={0} w={16} h={value / 2} />}</For>
        <Space.LinearY>
          <Distribute direction="horizontal" spacing={4}>
            <For each={values}>{(value) => <Ref select={`${value}`} />}</For>
          </Distribute>
        </Space.LinearY>
      </Bluefish>
      {/* in this one the heights are determined by the space, but the y values by the stack. I'm not sure what axes should look lik here though */}
      <br />
      <Bluefish>
        <StackH alignment="bottom" spacing={4}>
          <For each={values}>
            {(value) => (
              <Space.LinearY>
                <Box w={16} h={value / 2} />
              </Space.LinearY>
            )}
          </For>
        </StackH>
      </Bluefish>
      <br />
      <Bluefish>
        <StackH spacing={4}>
          <For each={values}>
            {(value, i) => (
              <Space.LinearY>
                <Box w={16} h={value / 2} /*  fill={`hsl(200, 100%, ${i() * 10}%)`} */ />
              </Space.LinearY>
            )}
          </For>
        </StackH>
      </Bluefish>
      <br />
      <Bluefish>
        <StackH alignment="bottom" spacing={16}>
          <GroupBy each={seattleWeather} by={(w) => w.month}>
            {(weatherItems, month) => (
              <StackV name={month} spacing={0}>
                <For each={weatherItems}>
                  {(weather) => <Box w={16} h={weather.numDays * 10} fill={colors[weather.weatherType]} />}
                </For>
              </StackV>
            )}
          </GroupBy>
        </StackH>
        <GroupBy each={seattleWeather} by={(w) => w.month}>
          {(_, month) => (
            <StackV>
              <Ref select={month} />
              <Text>{monthShorthand[month]}</Text>
            </StackV>
          )}
        </GroupBy>
      </Bluefish>
      <br />
      <Bluefish>
        {/* operators also seem capable of gluing togethers spaces somehow... */}
        <StackH alignment="bottom" spacing={16}>
          <GroupBy each={seattleWeather} by={(w) => w.month}>
            {(weatherItems, month) => (
              <StackV name={month} spacing={4}>
                <For each={weatherItems}>{(weather) => <Box w={16} h={weather.numDays * 10} fill={"black"} />}</For>
              </StackV>
            )}
          </GroupBy>
        </StackH>
        {/* <For each={[...new Set(seattleWeather.map((w) => w.month))]}>
          {(month) => (
            <StackV>
              <Ref select={month} />
              <Text>{monthShorthand[month]}</Text>
            </StackV>
          )}
        </For> */}
      </Bluefish>
    </>
  );
};

export default App;
