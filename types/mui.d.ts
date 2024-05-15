declare module '@mui/material/styles' {
  interface Palette {
    "dark-grey": Palette['primary'];
  }

  interface PaletteOptions {
    "dark-grey"?: PaletteOptions['primary'];
  }
}