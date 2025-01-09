import { StackH } from "../../src/stackh";
import { Group } from "../../src/group";
import { Text } from "../../src/text";
import { Align } from "../../src/align";
import { StackV } from "../../src/stackv";
import { For } from "solid-js";
import { withBluefish } from "../../src";
import { departmentData } from "../datasets/berkeleyGenderBias";
import { color } from "../../src/style";
import { Box } from "../box";

export const Mekko = withBluefish((_props) => {
  /* stacked bars with men and women. Inspired by https://youtu.be/yevnccB74Vw */
  return (
    <Group>
      <StackH spacing={32}>
        <StackH spacing={0}>
          <For each={Object.entries(departmentData).filter(([dept]) => dept !== "Total")}>
            {([_department, data]) => (
              /* TODO: can we put a chart/space here to do the normalization? defer for now...
          this is already pretty good actually! */
              <StackH spacing={0}>
                {/* TODO: I think we want to lift the width to StackV's width */}
                <StackV spacing={0}>
                  <Align alignment="center">
                    <Box w={data.women.applicants / 10} h={(100 - data.women.admittedPct) * 2} fill={color.yellow[3]} />
                    {/* TODO: this whole thing is a hack for now. Ideally I think we want
                
                <Box>
                  <Text>F</Text>
                </Box>
                
                And then the box logic to determine whether to show the text or not based on whether it fits in the box.
                
                */}
                    {data.women.applicants / 10 >= 10 ? <Text>F</Text> : null}
                  </Align>
                  <Align alignment="center">
                    <Box w={data.women.applicants / 10} h={data.women.admittedPct * 2} fill={color.yellow[5]} />
                    {data.women.applicants / 10 >= 10 ? <Text>F</Text> : null}
                  </Align>
                </StackV>
                {/* w={data.men.applicants} */}
                <StackV spacing={0}>
                  <Align alignment="center">
                    <Box w={data.men.applicants / 10} h={(100 - data.men.admittedPct) * 2} fill={color.green[3]} />
                    <Text>M</Text>
                  </Align>
                  <Align alignment="center">
                    <Box w={data.men.applicants / 10} h={data.men.admittedPct * 2} fill={color.green[5]} />
                    <Text>M</Text>
                  </Align>
                </StackV>
              </StackH>
            )}
          </For>
        </StackH>
        <StackH spacing={0}>
          <StackV spacing={0}>
            <Align alignment="center">
              <Box
                w={departmentData.Total.women.applicants / 10}
                h={(100 - departmentData.Total.women.admittedPct) * 2}
                fill={color.yellow[3]}
              />
              <Text>F</Text>
            </Align>
            <Align alignment="center">
              <Box
                w={departmentData.Total.women.applicants / 10}
                h={departmentData.Total.women.admittedPct * 2}
                fill={color.yellow[5]}
              />
              <Text>F</Text>
            </Align>
          </StackV>
          <StackV spacing={0}>
            <Align alignment="center">
              <Box
                w={departmentData.Total.men.applicants / 10}
                h={(100 - departmentData.Total.men.admittedPct) * 2}
                fill={color.green[3]}
              />
              <Text>M</Text>
            </Align>
            <Align alignment="center">
              <Box
                w={departmentData.Total.men.applicants / 10}
                h={departmentData.Total.men.admittedPct * 2}
                fill={color.green[5]}
              />
              <Text>M</Text>
            </Align>
          </StackV>
        </StackH>
      </StackH>
    </Group>
  );
});
