'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var styledComponents = require('styled-components');
var UAParser = _interopDefault(require('ua-parser-js'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Returns the next property of given property in an object
 */
var getNextKey = function (object, key) {
    var keys = Object.keys(object);
    var index = keys.indexOf(key);
    return index !== -1 && keys[index + 1];
};
/**
 * Returns the previous property of given property in an object
 */
var getPreviousKey = function (object, key) {
    var keys = Object.keys(object);
    var index = keys.indexOf(key);
    return index !== -1 && keys[index - 1];
};

var DeviceTypes;
(function (DeviceTypes) {
    DeviceTypes["CONSOLE"] = "console";
    DeviceTypes["MOBILE"] = "mobile";
    DeviceTypes["TABLET"] = "tablet";
    DeviceTypes["SMARTTV"] = "smarttv";
    DeviceTypes["WEARABLE"] = "wearable";
    DeviceTypes["EMBEDDED"] = "embedded";
    DeviceTypes["NONE"] = "";
})(DeviceTypes || (DeviceTypes = {}));
// can be added if need
var OSTypes;
(function (OSTypes) {
    OSTypes["WINDOWS"] = "Windows";
    OSTypes["MACOS"] = "Mac OS";
    OSTypes["LINUX"] = "Linux";
    OSTypes["IOS"] = "iOS";
    OSTypes["ANDROID"] = "Android";
})(OSTypes || (OSTypes = {}));
/**
 * Will give device name
 */
var getDeviceName = function () {
    var _a;
    var uaParser = new UAParser();
    return ((_a = uaParser.getDevice()) === null || _a === void 0 ? void 0 : _a.type) || "";
};
/**
 * Will give OS info
 */
var getOs = function () {
    var uaParser = new UAParser();
    return uaParser.getOS();
};

var MediaQueryConditions;
(function (MediaQueryConditions) {
    MediaQueryConditions[MediaQueryConditions["LESSER"] = 0] = "LESSER";
    MediaQueryConditions[MediaQueryConditions["GREATER"] = 1] = "GREATER";
})(MediaQueryConditions || (MediaQueryConditions = {}));
var breakpoints = {
    mobile: {
        minWidth: 0,
        maxWidth: 768,
    },
    tablet: {
        minWidth: 768,
        maxWidth: 1200,
    },
    desktop: {
        minWidth: 1200,
        maxWidth: 3800,
    },
    xxs: {
        minWidth: 0,
        maxWidth: 360,
    },
    xs: {
        minWidth: 0,
        maxWidth: 576,
    },
    sm: {
        minWidth: 576,
        maxWidth: 768,
    },
    md: {
        minWidth: 768,
        maxWidth: 991,
    },
    lg: {
        minWidth: 992,
        maxWidth: 1200,
    },
    xl: {
        minWidth: 1200,
        maxWidth: 1600,
    },
    xxl: {
        minWidth: 1600,
        maxWidth: 3800,
    },
};
var renderStyle = function (styles, interpolations) { return styledComponents.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), styledComponents.css.apply(void 0, __spreadArrays([styles], interpolations))); };
var breakpoint = function (name, styles, condition) {
    if (condition === void 0) { condition = ""; }
    var interpolations = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        interpolations[_i - 3] = arguments[_i];
    }
    var _a, _b, _c, _d;
    var minWidth;
    var maxWidth;
    if (typeof name === "string") {
        minWidth = ((_a = breakpoints[name]) === null || _a === void 0 ? void 0 : _a.minWidth) || 0;
        maxWidth = ((_b = breakpoints[name]) === null || _b === void 0 ? void 0 : _b.maxWidth) || 0;
        if (condition === MediaQueryConditions.LESSER) {
            minWidth = 0;
        }
        else if (condition === MediaQueryConditions.GREATER) {
            maxWidth = 0;
        }
    }
    else if (Array.isArray(name) && name.length === 2) {
        minWidth = ((_c = breakpoints[name[0]]) === null || _c === void 0 ? void 0 : _c.minWidth) || 0;
        maxWidth = ((_d = breakpoints[name[1]]) === null || _d === void 0 ? void 0 : _d.maxWidth) || 0;
        if (minWidth > maxWidth) {
            throw new Error("The provided responsive range is not correct, the `inRange` responsive helper receives an array with [`smallViewName`, `largeViewName`] and apply your styles between them");
        }
    }
    else {
        throw new Error("The responsive breakpoint parameters are not valid : " + name);
    }
    var offset = 1;
    var mediaCondition = "";
    if (minWidth) {
        mediaCondition += "(min-width: " + minWidth + "px)";
    }
    if (maxWidth) {
        mediaCondition += mediaCondition ? " and " : "";
        mediaCondition += "(max-width: " + (maxWidth - offset) + "px)";
    }
    return styledComponents.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    @media ", " {\n      ", "\n    }\n  "], ["\n    @media ", " {\n      ", "\n    }\n  "])), mediaCondition, styledComponents.css.apply(void 0, __spreadArrays([styles], interpolations)));
};
var templateObject_1, templateObject_2;

/**
 * Read a theme value with ease (currying)
 */
var theme = function (name) { return function (props) {
    return props.theme[name];
}; };
/**
 * Read a component passed prop value with ease (currying)
 *
 * @example  color: ${prop('$name')};
 * @example  color: ${prop('$name.value')};
 */
var prop = function (name, defaultValue) {
    // to support reading object props
    if (name.includes(".")) {
        var _a = name.split("."), object_1 = _a[0], value_1 = _a[1];
        return function (props) { return props[object_1][value_1] || defaultValue; };
    }
    else {
        // regular props
        return function (props) { return props[name] || defaultValue; };
    }
};
/**
 * Only render styles in mobile [will check device type as well]
 * @example   ${inMobile`
 *               color: ${theme('successColor')};
 *               display: none;
 *            `}
 */
var inMobile = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    var deviceType = getDeviceName();
    if (deviceType === "mobile") {
        return renderStyle(styles, interpolations);
    }
    else {
        return breakpoint("mobile", styles, "", interpolations);
    }
};
var AndOr;
(function (AndOr) {
    AndOr["$AND"] = "$AND";
    AndOr["$OR"] = "$OR";
})(AndOr || (AndOr = {}));
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
var ifProp = function (property, thisStyle, thatStyle) {
    return function (props) {
        var renderWithCondition = function (hasCondition) {
            if (hasCondition) {
                if (typeof thisStyle !== "function")
                    return thisStyle;
                return thisStyle(props);
            }
            else if (thatStyle) {
                if (typeof thatStyle !== "function")
                    return thatStyle;
                return thatStyle(props);
            }
            return "";
        };
        /**
         * We have three generic condition to check against mobile and tablet stating with @
         */
        var device = getDeviceName();
        if (property === "@mobileDevice") {
            return renderWithCondition(device === "mobile");
        }
        else if (property === "@tabletDevice") {
            return renderWithCondition(device === "tablet");
        }
        else if (property === "@mobileOrTabletDevice") {
            return renderWithCondition(device === "mobile" || device === "tablet");
        }
        /**
         * Check string passes
         */
        var checkStringItems = function (item) {
            var isNegative = item.startsWith("!");
            return prop(item.replace("!", ""), false)(props) !== isNegative;
        };
        /**
         * Check object property pass
         */
        var checkObjectItems = function (obj) {
            return Object.keys(obj).some(function (k) {
                return checkItems(obj[k], k);
            });
        };
        /**
         * Iterate and check prop statuses
         */
        var checkArrayItems = function (arrayInputs, conditionType) {
            if (conditionType === void 0) { conditionType = AndOr.$AND; }
            var list = arrayInputs;
            return conditionType === AndOr.$AND
                ? list.every(checkItems)
                : list.some(checkItems);
        };
        var checkItems = function (items, conditionType) {
            if (conditionType === void 0) { conditionType = AndOr.$AND; }
            if (Array.isArray(items)) {
                // array case
                return checkArrayItems(items, conditionType);
            }
            else if (typeof items !== "string") {
                // object case
                return checkObjectItems(items);
            }
            else {
                // string case
                return checkStringItems(items);
            }
        };
        var hasCondition = checkItems(property);
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
var inTablet = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    var deviceType = getDeviceName();
    if (deviceType === "tablet") {
        return renderStyle(styles, interpolations);
    }
    else {
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
var inTabletOrMobile = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    var deviceType = getDeviceName();
    if (deviceType === "mobile" || deviceType === "tablet") {
        return renderStyle(styles, interpolations);
    }
    else {
        return breakpoint(["mobile", "tablet"], styles, "", interpolations);
    }
};
/**
 * just alias of inTabletOrMobile
 */
var inMobileOrTablet = inTabletOrMobile;
/**
 * Render style on desktop
 * @example   ${inDesktop`
 *               color: ${theme('successColor')};
 *               display: none;
 *            `}
 */
var inDesktop = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    var deviceType = getDeviceName();
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
var inOnlyXxs = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    return breakpoint("xxs", styles, "", interpolations);
};
/**
 * Apply styles on viewport from: 0, to: 575
 * @example   ${inOnlyXs`
 *               display: none;
 *            `}
 */
var inOnlyXs = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    return breakpoint("xs", styles, "", interpolations);
};
/**
 * Apply styles on viewport from: 576, to: 767
 * @example   ${inOnlySm`
 *               display: none;
 *            `}
 */
var inOnlySm = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    return breakpoint("sm", styles, "", interpolations);
};
/**
 * Apply styles on viewport from: 768, to: 991
 * @example   ${inOnlyMd`
 *               display: none;
 *            `}
 */
var inOnlyMd = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    return breakpoint("md", styles, "", interpolations);
};
/**
 * Apply styles on viewport from: 992, to: 1199
 * @example   ${inOnlyLg`
 *               display: none;
 *            `}
 */
var inOnlyLg = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    return breakpoint("lg", styles, "", interpolations);
};
/**
 * Apply styles on viewport from: 1200, to: 1599
 * @example   ${inOnlyXl`
 *               display: none;
 *            `}
 */
var inOnlyXl = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    return breakpoint("xl", styles, "", interpolations);
};
/**
 * Apply styles on viewport upper that: 1600
 * @example   ${inOnlyXXl`
 *               display: none;
 *            `}
 */
var inOnlyXXl = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    return breakpoint("xxl", styles, "", interpolations);
};
/**
 * Apply styles on Android devices
 * @example   ${inOnlyAndroid`
 *               display: none;
 *            `}
 */
var inOnlyAndroid = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    var os = getOs();
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
var inOnlyIOS = function (styles) {
    var interpolations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        interpolations[_i - 1] = arguments[_i];
    }
    var os = getOs();
    if (os.name === "iOS") {
        return renderStyle(styles, interpolations);
    }
    else {
        return styledComponents.css(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n      @supports (-webkit-overflow-scrolling: touch) {\n        ", "\n      }\n    "], ["\n      @supports (-webkit-overflow-scrolling: touch) {\n        ", "\n      }\n    "])), styledComponents.css.apply(void 0, __spreadArrays([styles], interpolations)));
    }
};
/**
 * Apply styles between to viewport names
 * @note: always we should add smaller view first
 * @example   ${inRange(['md', 'lg'])`
 *               display: none;
 *            `}
 */
var inRange = function (sizes) {
    return function (styles) {
        var interpolations = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            interpolations[_i - 1] = arguments[_i];
        }
        return breakpoint(sizes, styles, "", interpolations);
    };
};
/**
 * Apply styles when viewport is equal or upper than given name
 * @example   ${inUpperThan('md')`
 *               display: none;
 *            `}
 */
var inGreaterThan = function (size) {
    return function (styles) {
        var interpolations = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            interpolations[_i - 1] = arguments[_i];
        }
        var tempSize = getNextKey(breakpoints, size) || size;
        return breakpoint(tempSize, styles, MediaQueryConditions.GREATER, interpolations);
    };
};
/**
 * Apply styles when viewport is equal or below than given name
 * @example   ${inUpperThan('md')`
 *               display: none;
 *            `}
 */
var inLessThan = function (size) {
    return function (styles) {
        var interpolations = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            interpolations[_i - 1] = arguments[_i];
        }
        var tempSize = getPreviousKey(breakpoints, size) || size;
        return breakpoint(tempSize, styles, MediaQueryConditions.LESSER, interpolations);
    };
};
/**
 * Convert hex color to rgb color
 */
var hexToRgb = function (hex) {
    if (!hex || hex.length < 4 || hex.length > 7) {
        throw new Error("Wrong hex color passed to \"hexToRgb\" method, passed hex: " + hex);
    }
    var hexColor = hex.replace("#", "");
    if (hexColor.length === 3) {
        hexColor = hexColor
            .split("")
            .map(function (h) { return "" + h + h; })
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
var makeRgba = function (color, opacity) { return function () {
    var rgb = hexToRgb(color);
    return "rgba(" + rgb.red + ", " + rgb.green + ", " + rgb.blue + ", " + opacity + ")";
}; };
/**
 * Make an rgba color suitable for CSS from a theme color name
 */
var makeRgbaFromTheme = function (color, opacity) { return function (props) {
    return makeRgba(theme(color)(props), opacity)();
}; };
/**
 * Make an rgba color suitable for CSS from a theme color name
 */
var makeRgbaFromProp = function (color, opacity) { return function (props) {
    var usedColor = prop(color, "#fff")(props);
    // look up about passed prop in theme if it is wrong hex color
    if (!usedColor.includes("#")) {
        usedColor = theme(usedColor)(props);
    }
    return makeRgba(usedColor, opacity)();
}; };
function lighten(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);
    var curr_total_dark = 255 * 3 - (R + G + B);
    // calculate how much of the current darkness comes from the different channels
    var RR = (255 - R) / curr_total_dark;
    var GR = (255 - G) / curr_total_dark;
    var BR = (255 - B) / curr_total_dark;
    // calculate how much darkness there should be in the new color
    var new_total_dark = (255 - 255 * (percent / 100)) * 3;
    // make the new channels contain the same % of available dark as the old ones did
    var NR = 255 - Math.round(RR * new_total_dark);
    var NG = 255 - Math.round(GR * new_total_dark);
    var NB = 255 - Math.round(BR * new_total_dark);
    var RO = NR.toString(16).length === 1 ? "0" + NR.toString(16) : NR.toString(16);
    var GO = NG.toString(16).length === 1 ? "0" + NG.toString(16) : NG.toString(16);
    var BO = NB.toString(16).length === 1 ? "0" + NB.toString(16) : NB.toString(16);
    return "#" + RO + GO + BO;
}
(function (BreakpointEnum) {
    BreakpointEnum["mobile"] = "mobile";
    BreakpointEnum["tablet"] = "tablet";
    BreakpointEnum["desktop"] = "desktop";
    BreakpointEnum["xxs"] = "xxs";
    BreakpointEnum["xs"] = "xs";
    BreakpointEnum["sm"] = "sm";
    BreakpointEnum["md"] = "md";
    BreakpointEnum["lg"] = "lg";
    BreakpointEnum["xl"] = "xl";
    BreakpointEnum["xxl"] = "xxl";
    BreakpointEnum["landscape"] = "landscape";
    BreakpointEnum["portrait"] = "portrait";
})(exports.BreakpointEnum || (exports.BreakpointEnum = {}));
var templateObject_1$1;

exports.hexToRgb = hexToRgb;
exports.ifProp = ifProp;
exports.inDesktop = inDesktop;
exports.inGreaterThan = inGreaterThan;
exports.inLessThan = inLessThan;
exports.inMobile = inMobile;
exports.inMobileOrTablet = inMobileOrTablet;
exports.inOnlyAndroid = inOnlyAndroid;
exports.inOnlyIOS = inOnlyIOS;
exports.inOnlyLg = inOnlyLg;
exports.inOnlyMd = inOnlyMd;
exports.inOnlySm = inOnlySm;
exports.inOnlyXXl = inOnlyXXl;
exports.inOnlyXl = inOnlyXl;
exports.inOnlyXs = inOnlyXs;
exports.inOnlyXxs = inOnlyXxs;
exports.inRange = inRange;
exports.inTablet = inTablet;
exports.inTabletOrMobile = inTabletOrMobile;
exports.lighten = lighten;
exports.makeRgba = makeRgba;
exports.makeRgbaFromProp = makeRgbaFromProp;
exports.makeRgbaFromTheme = makeRgbaFromTheme;
exports.prop = prop;
exports.theme = theme;
//# sourceMappingURL=index.js.map
