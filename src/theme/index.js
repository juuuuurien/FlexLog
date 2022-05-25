import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

export const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    surface: "#f7f8fa",
    surfaceLight: "#f7f8fa",
    headerBackground: "#f7f8fa",
    background: "#ebeced",
    cardColor: "#f7f8fa",
    card: "#f7f8fa",
    cardRed: "#E15D54",
    cardBlue: "#4067D4",
    cardYellow: "#ECC53A",
    cardGreen: "#339A4A",
    cardPurple: "#A04BE2",
    cardGray: "#4F5F6D",
    subText: "#89A9B8",
    setFinished: "#D7F9E0",
    inputBackground: "#e1e3e6",
  },
};
export const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    surface: "#253D47",
    surfaceLight: "#1B2C32",
    headerBackground: "#19272C",
    background: "#19272C",
    cardColor: "#1F2024",
    card: "#1F2024",
    cardRed: "#D8183B",
    cardBlue: "#1D84BD",
    cardYellow: "#B4A739",
    cardGreen: "#3DBF5A",
    cardPurple: "#4B228E",
    cardGray: "#44606B",
    subText: "#89A9B8",
    setFinished: "#244E40",
    inputBackground: "transparent",
  },
};
