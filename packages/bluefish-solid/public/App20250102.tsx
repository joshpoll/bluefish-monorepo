import { For, ParentProps, type Component, JSX } from "solid-js";
import { Bluefish, Distribute, Ref, StackH, StackV, Text, withBluefish } from "../src";
import { Box } from "../gofish/box";
import { monthShorthand } from "../gofish/datasets/seattleWeather";
import { weatherColors } from "../gofish/datasets/seattleWeather";
import { seattleWeather } from "../gofish/datasets/seattleWeather";
import { heightToInches } from "../gofish/datasets/singerHeights";
import { singerHeights } from "../gofish/datasets/singerHeights";
import { color } from "../src/style";

const values = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

// just a discrete color palette
const colors = [
  color.red[5],
  color.orange[5],
  color.amber[5],
  color.yellow[5],
  color.lime[5],
  color.blue[5],
  color.indigo[5],
  color.purple[5],
  color.pink[5],
];

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

const Label = withBluefish((props: ParentProps<{ select: string }>) => {
  return (
    <StackH alignment="top">
      <Ref select={props.select} />
      {props.children}
    </StackH>
  );
});

const App: Component = () => {
  return (
    <>
      <Bluefish>
        <StackH alignment="bottom" spacing={4}>
          <For each={singerHeights}>
            {/* {(singer, i) => <Box w={16} h={heightToInches(singer)} fill={colors[i() % colors.length]} />} */}
            {(singer, i) => (
              <Box
                w={16}
                h={(heightToInches(singer.height) - heightToInches({ feet: 4, inches: 10 })) * 4}
                // y={heightToInches({ feet: 4, inches: 10 }) * 4}
                // y2={heightToInches(singer.height) * 4}
                fill={colors[i() % colors.length]}
              />
            )}
          </For>
        </StackH>
      </Bluefish>
      <br />
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
                  {(weather) => <Box w={16} h={weather.numDays * 10} fill={weatherColors[weather.weatherType]} />}
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
        <StackH /* alignment="bottom" */ spacing={16}>
          <GroupBy each={seattleWeather} by={(w) => w.month}>
            {(weatherItems, month) => (
              <StackH name={month} spacing={0} /*  alignment="bottom" */>
                <For each={weatherItems}>
                  {(weather) => (
                    <Box
                      name={`${month}-${weather.weatherType}`}
                      w={16}
                      h={weather.numDays * 10}
                      fill={weatherColors[weather.weatherType]}
                    />
                  )}
                </For>
              </StackH>
            )}
          </GroupBy>
        </StackH>
        <GroupBy each={seattleWeather} by={(w) => w.month}>
          {(_, month) => (
            <StackV spacing={16}>
              <Ref select={month} />
              <Text>{monthShorthand[month]}</Text>
            </StackV>
          )}
        </GroupBy>
        <GroupBy each={seattleWeather} by={(w) => w.month}>
          {(weatherItems, month) => (
            <For each={weatherItems}>
              {(weather) => (
                <StackV spacing={4}>
                  <Ref select={`${month}-${weather.weatherType}`} />
                  <Text font-size={"8px"} fill={weatherColors[weather.weatherType]}>
                    {weather.weatherType}
                  </Text>
                </StackV>
              )}
            </For>
          )}
        </GroupBy>
      </Bluefish>
      <br />
      <Bluefish>
        <StackH alignment="bottom" spacing={16}>
          <GroupBy each={seattleWeather} by={(w) => w.month}>
            {(weatherItems, month) => (
              <StackH name={month} spacing={4} alignment="bottom">
                <For each={weatherItems}>
                  {(weather) => (
                    <Box
                      name={`${month}-${weather.weatherType}`}
                      w={16}
                      h={weather.numDays * 10}
                      fill={weatherColors[weather.weatherType]}
                    />
                  )}
                </For>
              </StackH>
            )}
          </GroupBy>
        </StackH>
        <GroupBy each={seattleWeather} by={(w) => w.month}>
          {(_, month) => (
            <StackV spacing={16}>
              <Ref select={month} />
              <Text>{monthShorthand[month]}</Text>
            </StackV>
          )}
        </GroupBy>
        <GroupBy each={seattleWeather} by={(w) => w.month}>
          {(weatherItems, month) => (
            <For each={weatherItems}>
              {(weather) => (
                <StackV spacing={4}>
                  <Ref select={`${month}-${weather.weatherType}`} />
                  <Text font-size={"8px"} fill={weatherColors[weather.weatherType]}>
                    {weather.weatherType}
                  </Text>
                </StackV>
              )}
            </For>
          )}
        </GroupBy>
        <Label select={"August-sun"}>
          <Text fill={color.red[6]}>Hot!</Text>
        </Label>
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
