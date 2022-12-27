export declare type StyledComponentsInterpolation = ((executionContext: Record<string, any>) => StyledComponentsInterpolation) | string | number | StyledComponentsInterpolation[];
export declare enum MediaQueryConditions {
    LESSER = 0,
    GREATER = 1
}
export declare type BreakpointMap = Record<string, {
    minWidth: number;
    maxWidth: number;
}>;
export declare const breakpoints: BreakpointMap;
export declare const renderStyle: (styles: any, interpolations: StyledComponentsInterpolation[]) => import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<any>>;
export declare type BreakPointName = keyof typeof breakpoints;
export declare const breakpoint: (name: string | string[], styles: any, condition?: "" | MediaQueryConditions, ...interpolations: StyledComponentsInterpolation[]) => import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<any>>;
export default breakpoint;
