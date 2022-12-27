# 🦊 Styled component helpers
> A collection of styled component helpers

## Install

```bash
npm install --save styled-components-helpers
```

## Usage

```ts
import styled from "styled-components";
import { prop, theme, ifProp, makeRgbaFromTheme, inLessThan } from "styled-components-helpers";

export const StyledCircle = styled.div`
  border-radius: 50%;
  background-color: ${theme("white")};
  border: 1px solid ${prop("$borderRadius")};
  height: ${ifProp("$isSmall", "24px", "48px")};

  a {
    color: ${makeRgbaFromTheme("black", 0.65)};
  }

  ${inLessThan("md")`
    min-width: 20px;
    height: 20px;
  `};
`;
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
    ${FlexboxEnum.horizontalLeftRow}
  `}
`;

```





## License

MIT
