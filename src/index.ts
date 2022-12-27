/* eslint-disable @typescript-eslint/no-explicit-any */
import { css, FlattenInterpolation, ThemeProps } from "styled-components";
import { getNextKey, getPreviousKey } from "./helpers/object";
import { getDeviceName, getOs } from "./helpers/userAgent";
import {
  breakpoint,
  renderStyle,
  breakpoints,
  StyledComponentsInterpolation,
  BreakPointName,
  MediaQueryConditions,
} from "./responsiveHelpers";

type themeKey = string;
type PredictedProp = {
  [name: string]: any;
};
type PredictedFn = (props: PredictedProp) => number | string;
type ConditionalStyle = number | string | PredictedFn;

/**
 * Read a theme value with ease (currying)
 */
export const theme = (name: themeKey) => (props: PredictedProp) =>
  props.theme[name];

/**
 * Read a component passed prop value with ease (currying)
 *
 * @example  color: ${prop('$name')};
 * @example  color: ${prop('$name.value')};
 */
export const prop = (name: string, defaultValue?: any): any => {
  // to support reading object props
  if (name.includes(".")) {
    const [object, value] = name.split(".");
    return (props: PredictedProp) => props[object][value] || defaultValue;
  } else {
    // regular props
    return (props: PredictedProp) => props[name] || defaultValue;
  }
};

/**
 * Only render styles in mobile [will check device type as well]
 * @example   ${inMobile`
 *               color: ${theme('successColor')};
 *               display: none;
 *            `}
 */
export const inMobile = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  const deviceType = getDeviceName();

  if (deviceType === "mobile") {
    return renderStyle(styles, interpolations);
  } else {
    return breakpoint("mobile", styles, "", interpolations);
  }
};

enum AndOr {
  "$AND" = "$AND",
  "$OR" = "$OR",
}

type ConditionsProperties =
  | string
  | string[]
  | { [key in AndOr]?: ConditionsProperties | ConditionsProperties[] }
  | "@mobileDevice"
  | "@tabletDevice"
  | "@mobileOrTabletDevice";

/**
 * An idea like IFTTT for props. comes from "If Prop Then That"
 *
 * @example   flex-wrap: ${ifProp('$var', 'wrap', 'no-wrap')};
 * @example   color: ${ifProp('$var', theme('primary'), ifProp('$varNested', 'something') )};
 * @example   ${ifProp('$var', 'padding: 4px', 'padding: 2px')};
 * @example   align-self: ${ifProp(
 *                {
 *                  $OR: [{ $AND: ['$isGoogleResult', '$isInWidget'] }, { $AND: ['!$isInWidget', '$isUser'] }]
 *                },
 *                'flex-start',
 *                'flex-end'
 *             )};
 */
export const ifProp = (
  property: ConditionsProperties,
  thisStyle: ConditionalStyle | FlattenInterpolation<ThemeProps<any>>,
  thatStyle?: ConditionalStyle | FlattenInterpolation<ThemeProps<any>>
): PredictedFn => {
  return (props: PredictedProp) => {
    const renderWithCondition = (hasCondition: boolean) => {
      if (hasCondition) {
        if (typeof thisStyle !== "function") return thisStyle as string;
        return thisStyle(props);
      } else if (thatStyle) {
        if (typeof thatStyle !== "function") return thatStyle as string;
        return thatStyle(props);
      }

      return "";
    };

    /**
     * We have three generic condition to check against mobile and tablet stating with @
     */
    const device = getDeviceName();
    if (property === "@mobileDevice") {
      return renderWithCondition(device === "mobile");
    } else if (property === "@tabletDevice") {
      return renderWithCondition(device === "tablet");
    } else if (property === "@mobileOrTabletDevice") {
      return renderWithCondition(device === "mobile" || device === "tablet");
    }

    /**
     * Check string passes
     */
    const checkStringItems = (item: string) => {
      const isNegative = item.startsWith("!");
      return prop(item.replace("!", ""), false)(props) !== isNegative;
    };

    /**
     * Check object property pass
     */
    const checkObjectItems = (obj: {
      [key in AndOr]?: ConditionsProperties | ConditionsProperties[];
    }) =>
      Object.keys(obj).some((k) =>
        checkItems(obj[k as AndOr] as ConditionsProperties, k as AndOr)
      );

    /**
     * Iterate and check prop statuses
     */
    const checkArrayItems = (
      arrayInputs: ConditionsProperties[],
      conditionType: AndOr = AndOr.$AND
    ) => {
      const list: any = arrayInputs;
      return conditionType === AndOr.$AND
        ? list.every(checkItems)
        : list.some(checkItems);
    };

    const checkItems = (
      items: ConditionsProperties,
      conditionType: AndOr = AndOr.$AND
    ): boolean => {
      if (Array.isArray(items)) {
        // array case
        return checkArrayItems(items, conditionType);
      } else if (typeof items !== "string") {
        // object case
        return checkObjectItems(items);
      } else {
        // string case
        return checkStringItems(items);
      }
    };

    const hasCondition = checkItems(property);

    return renderWithCondition(hasCondition);
  };
};

/**
 * Only render styles in tablet [will check device type as well]
 * @example   ${inTablet`
 *               color: ${theme('successColor')};
 *               display: none;
 *            `}
 */
export const inTablet = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  const deviceType = getDeviceName();

  if (deviceType === "tablet") {
    return renderStyle(styles, interpolations);
  } else {
    return breakpoint("tablet", styles, "", interpolations);
  }
};

/**
 * Will apply this style on mobile and tablet and media screens blow than [will check device type as well]
 * @example   ${inTabletOrMobile`
 *               color: ${theme('successColor')};
 *               display: none;
 *            `}
 */
export const inTabletOrMobile = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  const deviceType = getDeviceName();

  if (deviceType === "mobile" || deviceType === "tablet") {
    return renderStyle(styles, interpolations);
  } else {
    return breakpoint(["mobile", "tablet"], styles, "", interpolations);
  }
};

/**
 * just alias of inTabletOrMobile
 */
export const inMobileOrTablet = inTabletOrMobile;

/**
 * Render style on desktop
 * @example   ${inDesktop`
 *               color: ${theme('successColor')};
 *               display: none;
 *            `}
 */
export const inDesktop = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  const deviceType = getDeviceName();

  if (deviceType !== "tablet" && deviceType !== "mobile") {
    return breakpoint("desktop", styles, "", interpolations);
  }

  return '';
};

/**
 * Apply styles on viewport from: 0, to: 360
 * @example   ${inOnlyXxs`
 *               display: none;
 *            `}
 */
export const inOnlyXxs = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  return breakpoint("xxs", styles, "", interpolations);
};

/**
 * Apply styles on viewport from: 0, to: 575
 * @example   ${inOnlyXs`
 *               display: none;
 *            `}
 */
export const inOnlyXs = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  return breakpoint("xs", styles, "", interpolations);
};

/**
 * Apply styles on viewport from: 576, to: 767
 * @example   ${inOnlySm`
 *               display: none;
 *            `}
 */
export const inOnlySm = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  return breakpoint("sm", styles, "", interpolations);
};

/**
 * Apply styles on viewport from: 768, to: 991
 * @example   ${inOnlyMd`
 *               display: none;
 *            `}
 */
export const inOnlyMd = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  return breakpoint("md", styles, "", interpolations);
};

/**
 * Apply styles on viewport from: 992, to: 1199
 * @example   ${inOnlyLg`
 *               display: none;
 *            `}
 */
export const inOnlyLg = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  return breakpoint("lg", styles, "", interpolations);
};

/**
 * Apply styles on viewport from: 1200, to: 1599
 * @example   ${inOnlyXl`
 *               display: none;
 *            `}
 */
export const inOnlyXl = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  return breakpoint("xl", styles, "", interpolations);
};

/**
 * Apply styles on viewport upper that: 1600
 * @example   ${inOnlyXXl`
 *               display: none;
 *            `}
 */
export const inOnlyXXl = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  return breakpoint("xxl", styles, "", interpolations);
};

/**
 * Apply styles on Android devices
 * @example   ${inOnlyAndroid`
 *               display: none;
 *            `}
 */
export const inOnlyAndroid = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  const os = getOs();

  if (os.name === "Android") {
    return renderStyle(styles, interpolations);
  }

  return '';
};

/**
 * Apply styles on IOS devices
 * @example   ${inOnlyIOS`
 *               display: none;
 *            `}
 */
export const inOnlyIOS = (
  styles: any,
  ...interpolations: StyledComponentsInterpolation[]
) => {
  const os = getOs();

  if (os.name === "iOS") {
    return renderStyle(styles, interpolations);
  } else {
    return css`
      @supports (-webkit-overflow-scrolling: touch) {
        ${css(styles, ...interpolations)}
      }
    `;
  }
};

/**
 * Apply styles between to viewport names
 * @note: always we should add smaller view first
 * @example   ${inRange(['md', 'lg'])`
 *               display: none;
 *            `}
 */
export const inRange =
  (sizes: Array<BreakPointName>) =>
  (styles: any, ...interpolations: StyledComponentsInterpolation[]) => {
    return breakpoint(sizes, styles, "", interpolations);
  };

/**
 * Apply styles when viewport is equal or upper than given name
 * @example   ${inUpperThan('md')`
 *               display: none;
 *            `}
 */
export const inGreaterThan =
  (size: BreakPointName) =>
  (styles: any, ...interpolations: StyledComponentsInterpolation[]) => {
    const tempSize = getNextKey(breakpoints, size) || size;
    return breakpoint(
      tempSize,
      styles,
      MediaQueryConditions.GREATER,
      interpolations
    );
  };

/**
 * Apply styles when viewport is equal or below than given name
 * @example   ${inUpperThan('md')`
 *               display: none;
 *            `}
 */
export const inLessThan =
  (size: BreakPointName) =>
  (styles: any, ...interpolations: StyledComponentsInterpolation[]) => {
    const tempSize = getPreviousKey(breakpoints, size) || size;
    return breakpoint(
      tempSize,
      styles,
      MediaQueryConditions.LESSER,
      interpolations
    );
  };

/**
 * Convert hex color to rgb color
 */
export const hexToRgb = (hex: string) => {
  if (!hex || hex.length < 4 || hex.length > 7) {
    throw new Error(
      `Wrong hex color passed to "hexToRgb" method, passed hex: ${hex}`
    );
  }

  let hexColor = hex.replace("#", "");
  if (hexColor.length === 3) {
    hexColor = hexColor
      .split("")
      .map((h: string) => `${h}${h}`)
      .join("");
  }

  return {
    red: parseInt(hexColor.substr(0, 2), 16),
    green: parseInt(hexColor.substr(2, 2), 16),
    blue: parseInt(hexColor.substr(4, 2), 16),
  };
};

/**
 * Make an rgba color suitable for CSS from a hex color
 */
export const makeRgba = (color: string, opacity: number) => () => {
  const rgb = hexToRgb(color);
  return `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${opacity})`;
};

/**
 * Make an rgba color suitable for CSS from a theme color name
 */
export const makeRgbaFromTheme =
  (color: themeKey, opacity: number) => (props: PredictedProp) => {
    return makeRgba(theme(color)(props), opacity)();
  };

/**
 * Make an rgba color suitable for CSS from a theme color name
 */
export const makeRgbaFromProp =
  (color: string, opacity: number) => (props: PredictedProp) => {
    let usedColor = prop(color, "#fff")(props);

    // look up about passed prop in theme if it is wrong hex color
    if (!usedColor.includes("#")) {
      usedColor = theme(usedColor)(props);
    }
    return makeRgba(usedColor, opacity)();
  };

export function lighten(color: string, percent: number) {
  const R = parseInt(color.substring(1, 3), 16);
  const G = parseInt(color.substring(3, 5), 16);
  const B = parseInt(color.substring(5, 7), 16);
  const curr_total_dark = 255 * 3 - (R + G + B);

  // calculate how much of the current darkness comes from the different channels
  const RR = (255 - R) / curr_total_dark;
  const GR = (255 - G) / curr_total_dark;
  const BR = (255 - B) / curr_total_dark;

  // calculate how much darkness there should be in the new color
  const new_total_dark = (255 - 255 * (percent / 100)) * 3;

  // make the new channels contain the same % of available dark as the old ones did
  const NR = 255 - Math.round(RR * new_total_dark);
  const NG = 255 - Math.round(GR * new_total_dark);
  const NB = 255 - Math.round(BR * new_total_dark);

  const RO =
    NR.toString(16).length === 1 ? "0" + NR.toString(16) : NR.toString(16);
  const GO =
    NG.toString(16).length === 1 ? "0" + NG.toString(16) : NG.toString(16);
  const BO =
    NB.toString(16).length === 1 ? "0" + NB.toString(16) : NB.toString(16);

  return "#" + RO + GO + BO;
}

export enum BreakpointEnum {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop',
  xxs = 'xxs',
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
  landscape = 'landscape',
  portrait = 'portrait',
}
