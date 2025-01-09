import { Group, Rect, Ref, StackH, StackV, withBluefish } from "../../src";
import { color } from "../../src/style";
import { Link } from "../link";

export const Ribbon = withBluefish((_props) => {
  return (
    <Group>
      <StackH spacing={64} alignment="top">
        <StackV spacing={4} alignment="centerX">
          <Rect name="rect-1-1" width={4} height={100} fill={color.red[4]} />
          <Rect name="rect-2-1" width={4} height={30} fill={color.green[4]} />
          <Rect name="rect-3-1" width={4} height={20} fill={color.blue[4]} />
        </StackV>
        <StackV spacing={4} alignment="centerX">
          <Rect name="rect-2-2" width={4} height={70} fill={color.green[4]} />
          <Rect name="rect-3-2" width={4} height={50} fill={color.blue[4]} />
          <Rect name="rect-1-2" width={4} height={30} fill={color.red[4]} />
        </StackV>
        <StackV spacing={4} alignment="centerX">
          <Rect name="rect-1-3" width={4} height={60} fill={color.red[4]} />
          <Rect name="rect-2-3" width={4} height={50} fill={color.green[4]} />
          <Rect name="rect-3-3" width={4} height={40} fill={color.blue[4]} />
        </StackV>
      </StackH>
      <Link direction="horizontal" fill={color.red[4]} interpolation="bezier" opacity={0.5}>
        <Ref select="rect-1-1" />
        <Ref select="rect-1-2" />
        <Ref select="rect-1-3" />
      </Link>
      <Link direction="horizontal" fill={color.green[4]} interpolation="bezier" opacity={0.5}>
        <Ref select="rect-2-1" />
        <Ref select="rect-2-2" />
        <Ref select="rect-2-3" />
      </Link>
      <Link direction="horizontal" fill={color.blue[4]} interpolation="bezier" opacity={0.5}>
        <Ref select="rect-3-1" />
        <Ref select="rect-3-2" />
        <Ref select="rect-3-3" />
      </Link>
    </Group>
  );
});
