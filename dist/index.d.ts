import { FlattenInterpolation, ThemeProps } from "styled-components";
import { StyledComponentsInterpolation } from "./responsiveHelpers";
declare type PredictedProp = {
    [name: string]: any;
};
declare type PredictedFn = (props: PredictedProp) => number | string;
/**
 * Read a theme value with ease (currying)
 */
export declare const theme: (name: string) => (props: PredictedProp) => any;
/**
 * Read a component passed prop value with ease (currying)
 *
 * @example  color: ${prop('$name')};
 * @example  color: ${prop('$name.value')};
 */
export declare const prop: (name: string, defaultValue?: any) => any;
/**
 * Only render styles in mobile [will check device type as well]
 * @example   ${inMobile`
 *               color: ${theme('successColor')};
 *               display: none;
 *            `}
 */
export declare const inMobile: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
declare enum AndOr {
    "$AND" = "$AND",
    "$OR" = "$OR"
}
declare type ConditionsProperties = string | string[] | {
    [key in AndOr]?: ConditionsProperties | ConditionsProperties[];
} | "@mobileDevice" | "@tabletDevice" | "@mobileOrTabletDevice";
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
export declare const ifProp: (property: ConditionsProperties, thisStyle: string | number | PredictedFn | FlattenInterpolation<ThemeProps<any>>, thatStyle?: string | number | PredictedFn | FlattenInterpolation<ThemeProps<any>> | undefined) => PredictedFn;
/**
 * Only render styles in tablet [will check device type as well]
 * @example   ${inTablet`
 *               color: ${theme('successColor')};
 *               display: none;
 *            `}
 */
export declare const inTablet: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Will apply this style on mobile and tablet and media screens blow than [will check device type as well]
 * @example   ${inTabletOrMobile`
 *               color: ${theme('successColor')};
 *               display: none;
 *            `}
 */
export declare const inTabletOrMobile: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * just alias of inTabletOrMobile
 */
export declare const inMobileOrTablet: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Render style on desktop
 * @example   ${inDesktop`
 *               color: ${theme('successColor')};
 *               display: none;
 *            `}
 */
export declare const inDesktop: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>> | "";
/**
 * Apply styles on viewport from: 0, to: 360
 * @example   ${inOnlyXxs`
 *               display: none;
 *            `}
 */
export declare const inOnlyXxs: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Apply styles on viewport from: 0, to: 575
 * @example   ${inOnlyXs`
 *               display: none;
 *            `}
 */
export declare const inOnlyXs: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Apply styles on viewport from: 576, to: 767
 * @example   ${inOnlySm`
 *               display: none;
 *            `}
 */
export declare const inOnlySm: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Apply styles on viewport from: 768, to: 991
 * @example   ${inOnlyMd`
 *               display: none;
 *            `}
 */
export declare const inOnlyMd: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Apply styles on viewport from: 992, to: 1199
 * @example   ${inOnlyLg`
 *               display: none;
 *            `}
 */
export declare const inOnlyLg: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Apply styles on viewport from: 1200, to: 1599
 * @example   ${inOnlyXl`
 *               display: none;
 *            `}
 */
export declare const inOnlyXl: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Apply styles on viewport upper that: 1600
 * @example   ${inOnlyXXl`
 *               display: none;
 *            `}
 */
export declare const inOnlyXXl: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Apply styles on Android devices
 * @example   ${inOnlyAndroid`
 *               display: none;
 *            `}
 */
export declare const inOnlyAndroid: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>> | "";
/**
 * Apply styles on IOS devices
 * @example   ${inOnlyIOS`
 *               display: none;
 *            `}
 */
export declare const inOnlyIOS: (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Apply styles between to viewport names
 * @note: always we should add smaller view first
 * @example   ${inRange(['md', 'lg'])`
 *               display: none;
 *            `}
 */
export declare const inRange: (sizes: string[]) => (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Apply styles when viewport is equal or upper than given name
 * @example   ${inUpperThan('md')`
 *               display: none;
 *            `}
 */
export declare const inGreaterThan: (size: string) => (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Apply styles when viewport is equal or below than given name
 * @example   ${inUpperThan('md')`
 *               display: none;
 *            `}
 */
export declare const inLessThan: (size: string) => (styles: any, ...interpolations: StyledComponentsInterpolation[]) => FlattenInterpolation<ThemeProps<any>>;
/**
 * Convert hex color to rgb color
 */
export declare const hexToRgb: (hex: string) => {
    red: number;
    green: number;
    blue: number;
};
/**
 * Make an rgba color suitable for CSS from a hex color
 */
export declare const makeRgba: (color: string, opacity: number) => () => string;
/**
 * Make an rgba color suitable for CSS from a theme color name
 */
export declare const makeRgbaFromTheme: (color: string, opacity: number) => (props: PredictedProp) => string;
/**
 * Make an rgba color suitable for CSS from a theme color name
 */
export declare const makeRgbaFromProp: (color: string, opacity: number) => (props: PredictedProp) => string;
export declare function lighten(color: string, percent: number): string;
export declare enum BreakpointEnum {
    mobile = "mobile",
    tablet = "tablet",
    desktop = "desktop",
    xxs = "xxs",
    xs = "xs",
    sm = "sm",
    md = "md",
    lg = "lg",
    xl = "xl",
    xxl = "xxl",
    landscape = "landscape",
    portrait = "portrait"
}
export {};
