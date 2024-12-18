# Tutorial Part 2: The Power of Relations

In the last tutorial, we got a brief introduction to Bluefish: its marks, relations, and declarative
references. In this tutorial, we'll see just how expressive relations can be. We'll progressively
modify the label in the last tutorial until we've gone from this:

::: sandbox

```tsx [active]
// prettier-ignore
import { Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return [
    Background({ padding: 40, fill: "#859fc9", stroke: "none" }, [
      StackH({ spacing: 50 }, [
        Circle({ name: "mercury", r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" }),
      ]),
    ]),
    Background({ stroke: "black", "stroke-width": 3, fill: "none", rx: 10 }, [
      StackV({ spacing: 30 }, [Text("Mercury"), Ref({ select: "mercury" })]),
    ]),
  ];
}

render(Diagram, document.getElementById("app"));
```

:::

to this:

::: sandbox

```tsx [active]
// prettier-ignore
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return [
    Background({ name: "planets", padding: 40, fill: "#859fc9", stroke: "none" }, [
      StackH({ spacing: 50 }, [
        Circle({ name: "mercury", r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" }),
      ]),
    ]),
    Distribute({ direction: "vertical", spacing: 30 }, [
      Ref({ select: "planets" }),
      Text({ name: "label" }, "Mercury"),
    ]),
    Align({ alignment: "centerX" }, [Ref({ select: "mercury" }), Ref({ select: "label" })]),
    Arrow([Ref({ select: "label" }), Ref({ select: "mercury" })]),
  ];
}

render(Diagram, document.getElementById("app"));
```

:::

Along the way we'll encounter some other Bluefish relations: `Arrow`, `Align`, and `Distribute`.
We'll also gain some more experience using `name` and `Ref`.

## Flip label direction

One thing we can do without changing our spec very much is move the label below the planet by
simply reversing the order of `StackV`'s children:

```tsx
// ...
Background({ padding: 40, fill: "#859fc9", stroke: "none" }, [
  StackV({ spacing: 30 }, [
    Text("Mercury"), // [!code --]
    Ref({ select: "mercury" }), // [!code --]
    Ref({ select: "mercury" }), // [!code ++]
    Text("Mercury"), // [!code ++]
  ]),
]);
// ...
```

![label under planet](/learn/assets/label-under-planet.png)

## Change `Background` to `Arrow`

We can also change how we connect the label to the planet.

First, we'll _denest_ the `Background` relation from the `StackV`.

```tsx
// ...
Background({ padding: 40, fill: "#859fc9", stroke: "none" }, [ // [!code --]
StackV({ spacing: 30 }, [
  Ref({ select: "mercury" }),
  Text("Mercury"), // [!code --]
  Text({ name: "label" }, "Mercury"), // [!code ++]
]),
Background({ padding: 40, fill: "#859fc9", stroke: "none" }, [ // [!code ++]
  Ref({ select: "label" }), // [!code ++]
  Ref({ select: "mercury" }), // [!code ++]
]) // [!code ++]
// ...
```

Notice that this doesn't change our diagram! It just changes our spec so that we can make other
kinds of edits.

Now, instead of using a `Background`, we can
use an `Arrow` relation:

```tsx
// ...
StackV({ spacing: 30 }, [Ref({ select: "mercury" }), Text({ name: "label" }, "Mercury")]),
  Background({ padding: 40, fill: "#859fc9", stroke: "none" }, [ // [!code --]
  Arrow([ // [!code ++]
    Ref({ select: "label" }),
    Ref({ select: "mercury" }),
  ]);
// ...
```

![label arrow](/learn/assets/label-arrow.png)

## Distribute the label from the planets

Right now the label is inside the planets `Background`, but what if we want to place it outside? We
could change the `StackV` spacing until it's large enough, but we would have to manually update it
whenever we changed the `Background` or the sizes of the planets. Instead, we'll offset the label
from the planets `Background` directly.

To do this, we first have to split `StackV` into its two constituent parts: vertical `Distribute`
and horizontal `Align`:

```tsx
StackV({ spacing: 30 }, // [!code --]
Distribution({ direction: "vertical", spacing: 30 }, // [!code ++]
 [Ref({ select: "mercury" }), Text({ name: "label"}, "Mercury")]),
Align({ alignment: "centerX" }, [ Ref({ select: "mercury"}), Ref({ select: "label"})]) // [!code ++]
```

This refactor doesn't change the diagram at all, but it _does_ let us retarget the `Distribute` so
we n offset it from the `Background` instead of the Mercury `Circle`. To do this, we'll first label
the planets `Background`:

```tsx
Background({ padding: 40, fill: "#859fc9", stroke: "none" }, // [!code --]
Background({ name: "planets", padding: 40, fill: "#859fc9", stroke: "none" }, // [!code ++]
```

Then we'll change the selection in the `Distribute`:

```tsx
Distribution({ direction: "vertical", spacing: 30 }, [
  Ref({ select: "mercury" }), // [!code --]
  Ref({ select: "planets" }), // [!code ++]
  Text({ name: "label" }, "Mercury"),
]);
```

![mercury label outside background](/learn/assets/mercury-label-outside-background.png)

## Wrapping up

Huzzah! We modified the label in our planets diagram. Along the way we used `Arrow`, `Align`, and
`Distribute`, three important Bluefish relations. We've also gained more experience naming elements
and selecting them with `Ref`. Your final code should look like this:

::: sandbox

```tsx [active]
// prettier-ignore
import { Bluefish, Group, StackH, StackV, Circle, Text, Ref, Background, Arrow, Align, Distribute, Rect, render } from "bluefish-js";

function Diagram() {
  return [
    Background({ name: "planets", padding: 40, fill: "#859fc9", stroke: "none" }, [
      StackH({ spacing: 50 }, [
        Circle({ name: "mercury", r: 15, fill: "#EBE3CF", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 36, fill: "#DC933C", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 38, fill: "#179DD7", "stroke-width": 3, stroke: "black" }),
        Circle({ r: 21, fill: "#F1CF8E", "stroke-width": 3, stroke: "black" }),
      ]),
    ]),
    Distribute({ direction: "vertical", spacing: 30 }, [
      Ref({ select: "planets" }),
      Text({ name: "label" }, "Mercury"),
    ]),
    Align({ alignment: "centerX" }, [Ref({ select: "mercury" }), Ref({ select: "label" })]),
    Arrow([Ref({ select: "label" }), Ref({ select: "mercury" })]),
  ];
}

render(Diagram, document.getElementById("app"));
```

:::

<!-- ## What's next

In the next tutorial we'll see how to take advantage of SolidJS, Bluefish's host framework, to make
our diagram data-driven and reactive and our spec a little easier to read and modify. -->
