// This file contains constants for styles used throughout the website.

export const Colors = {
    green: "#28a745",
    red: "",
    textOnBlackBackground: "#dedee3",
};

export const Fonts = {
    default: "Helvetica"
};

export const Sizes = {
    FooterHeight: 48,
    HeaderHeight: 48
};

export function headerAndFooterHeight() {
    return Sizes.HeaderHeight + Sizes.FooterHeight;
}
