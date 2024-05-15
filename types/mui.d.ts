import {
  Palette as MuiPallete,
  PaletteOptions as MuiPaletteOptions,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette extends MuiPallete {
    darkGrey: { main: string; light: string; dark: string };
  }

  interface PaletteOptions extends MuiPaletteOptions {
    darkGrey?: { main: string; light: string; dark: string };
  }
}
