# 🦊 Styled component helpers
> A collection of styled component helpers

## Install

```bash
npm install --save styled-components-helpers
```

## Usage

```ts
import styled from "styled-components";
import { prop, ifProp, inLessThan, theme } from "styled-components-helpers";

export default styled.section`
  padding: 4em;
  text-align: center;
  background: papayawhip;
  border-radius: ${prop("$borderRadius")};
  padding: ${ifProp("$isSmall", "24px", "48px")};

  > p {
    font-size: 18px;
    color: ${ifProp(
      "$isSmall",
      theme("darkDisabled"),
      ifProp("$isDark", theme("disabledNote"), prop("$noteColor", "#323232"))
    )};
  }

  ${inLessThan("xs")`
    background: #ccc;
  `}
`;

```
And the `App.tsx` file:

```tsx
import React from "react";
import { render } from "react-dom";
import Wrapper from "./Wrapper";

const App = () => (
  <Wrapper $borderRadius="20px" $isSmall={false}>
    <p>Hello World, this is my first styled component!</p>
  </Wrapper>
);

render(<App />, document.getElementById("root"));

```

## Complex condition

```ts
import styled from "styled-components";
import { prop, theme, ifProp, inLessThan, inGreaterThan, BreakpointEnum } from "styled-components-helpers";


export const StyledCircle = styled.div`
  text-align: center;

  ${inLessThan("xl")`
    fill: ${ifProp(
      "$disabled",
      theme("darkDisabled"),
      ifProp("$isNote", theme("disabledNote"), prop("$noteColor"))
    )};
    width: 20px;
    height: 20px;
  `};

  ${inGreaterThan(BreakpointEnum.md)`
    overflow: hidden;
    margin-right: 1rem;
  `}
`;

```





## License

MIT
