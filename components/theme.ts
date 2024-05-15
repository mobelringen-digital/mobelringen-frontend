/// <reference types="@graphcommerce/next-ui/types" />

import {
  responsiveVal,
  breakpointVal,
  MuiButtonPill,
  MuiButtonResponsive,
  themeBaseDefaults,
  MuiSnackbar,
  MuiFabSizes,
  MuiSlider,
  MuiChip,
  MuiButtonInline,
  NextLink,
} from "@graphcommerce/next-ui";
import {
  createTheme,
  Theme,
  alpha,
  LinkProps,
  Components,
} from "@mui/material";
import { PaletteOptions } from "@mui/material/styles/createPalette";

const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#FF3E3E",
    contrastText: "#3F1414",
    dark: "#3F1414",
    light: "#7F2828",
  },
  secondary: {
    main: "#FFDBD2",
    light: "#FEF0E5",
    dark: "#FAD0C5",
    contrastText: "#3F1414",
  },
  success: {
    main: "#39A627",
    light: "#DFF5D5",
    dark: "#1D780E",
  },
  warning: {
    main: "#F7B200",
    light: "#FFECBA",
    dark: "#8B6400",
  },
  error: {
    main: "#C82B2B",
    light: "#FFE7E5",
  },
  background: {
    default: "#F8F4F1",
    paper: "#ffffff",
    image: "#ffffff",
  },
  grey: {
    50: "#F8F4F1",
    100: "#F0EBE5",
    200: "#E6DFD6",
  },
  divider: "#00000015",
  action: {
    hoverOpacity: 0.12,
  },
  text: {
    primary: "#1A1110",
    secondary: "#03031755",
    disabled: "#03031735",
  },
};

// const darkPalette: PaletteOptions = {
//   mode: "dark",
//   primary: {
//     main: "#62C7B0",
//     contrastText: "#ffffff",
//     dark: "#62C7B0",
//   },
//   secondary: {
//     main: "#62C7B0",
//     light: "#62C7B0",
//     contrastText: "#ffffff",
//   },
//   background: {
//     default: "#001727",
//     paper: "#15293B",
//     image: "#ffffff",
//   },
//   divider: "#ffffff30",
//   success: {
//     main: "#01D26A",
//   },
//   action: {
//     hoverOpacity: 0.16,
//   },
//   text: {
//     primary: "#ffffff",
//     secondary: "#ffffff80",
//     disabled: "#ffffff30",
//   },
// };

const fontSize = (from: number, to: number) =>
  breakpointVal("fontSize", from, to, themeBaseDefaults.breakpoints.values);

// Create a theme instance.
const createThemeWithPalette = (palette: PaletteOptions) =>
  createTheme({
    ...themeBaseDefaults,
    palette,
    shape: { borderRadius: 3 },
    typography: {
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      // @see docs typography.md
      h1: {
        ...fontSize(36, 48),
        fontWeight: 700,
        fontVariationSettings: "'wght' 660",
        lineHeight: 1.22,
      },
      h2: {
        ...fontSize(28, 36),
        fontWeight: 700,
        fontVariationSettings: "'wght' 630",
        lineHeight: 1.35,
      },
      h3: {
        ...fontSize(24, 28),
        fontWeight: 700,
        fontVariationSettings: "'wght' 660",
        lineHeight: 1.55,
      },
      h4: {
        ...fontSize(18, 20),
        fontWeight: 550,
        fontVariationSettings: "'wght' 550",
        lineHeight: 1.55,
      },
      h5: {
        ...fontSize(14, 16),
        fontWeight: 650,
        fontVariationSettings: "'wght' 650",
        lineHeight: 1.55,
      },
      h6: {
        ...fontSize(12, 14),
        fontWeight: 550,
        fontVariationSettings: "'wght' 510",
        lineHeight: 1.8,
      },
      subtitle1: {
        ...fontSize(16, 19),
        fontWeight: 450,
        fontVariationSettings: "'wght' 460",
        lineHeight: 1.7,
      },
      fontWeightBold: 600,
      body1: {
        ...fontSize(14, 16),
        lineHeight: 1.7,
      },
      subtitle2: {
        ...fontSize(14, 16),
        fontWeight: 500,
        fontVariationSettings: "'wght' 520",
        lineHeight: 1.7,
      },
      body2: {
        ...fontSize(16, 18),
        lineHeight: 1.7,
      },
      caption: {
        // https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
        ...fontSize(12, 13),
      },
      button: {},
      overline: {
        // https://web.dev/font-size/#how-the-lighthouse-font-size-audit-fails
        ...fontSize(12, 14),
        fontWeight: 500,
        letterSpacing: 1,
        lineHeight: 1.2,
        textTransform: "uppercase",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 460,
        md: 960,
        lg: 1240,
        xl: 1920,
      },
    },
    spacings: {
      xxs: responsiveVal(10, 16),
      xs: responsiveVal(12, 20),
      sm: responsiveVal(14, 30),
      md: responsiveVal(16, 50),
      lg: responsiveVal(24, 80),
      xl: responsiveVal(40, 100),
      xxl: responsiveVal(80, 160),
    },
    page: {
      horizontal: responsiveVal(10, 30),
      vertical: responsiveVal(10, 30),
    },
    appShell: {
      headerHeightSm: "46px",
      headerHeightMd: "100px",
      appBarHeightMd: "80px",
      appBarInnerHeightMd: "46px",
    },
  });

// todo: move most of the styles to the graphcommerce library while still allowing for extensibility.
const createOverrides = (theme: Theme): Components<Theme> => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        overflowY: "scroll",
      },
      "::selection": { background: alpha(theme.palette.primary.main, 0.6) },
      "::-moz-selection": {
        background: alpha(theme.palette.primary.main, 0.6),
      },
      "#__next": {
        position: "relative",
      },
      "picture img": {
        filter: "brightness(1.03)",
        willChange: "filter",
      },
    },
  },

  // https://mui.com/material-ui/guides/routing/#global-theme-link
  // https://www.graphcommerce.org/docs/framework/links
  MuiLink: { defaultProps: { component: NextLink } as LinkProps },
  MuiButtonBase: { defaultProps: { LinkComponent: NextLink } },

  MuiContainer: {
    variants: [
      {
        props: { disableGutters: false },
        style: {
          paddingLeft: theme.page.horizontal,
          paddingRight: theme.page.horizontal,
          [theme.breakpoints.up("sm")]: {
            paddingLeft: theme.page.horizontal,
            paddingRight: theme.page.horizontal,
          },
        },
      },
    ],
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: "16px", // https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/
      },
    },
  },

  MuiButton: {
    defaultProps: { color: "inherit" },
    variants: [
      ...MuiButtonResponsive,
      ...MuiButtonPill,
      ...MuiButtonInline,
      {
        props: { variant: "contained", color: "inherit" },
        style: { backgroundColor: theme.palette.background.paper },
      },
      {
        props: { variant: "outlined" },
        style: {
          ...breakpointVal(
            "borderRadius",
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values
          ),
        },
      },
      {
        props: { variant: "text" },
        style: { borderRadius: "99em" },
      },
      {
        props: { variant: "inline" },
        style: { borderRadius: "99em" },
      },
      {
        props: { color: "primary" },
        style: {
          "&:not(.Mui-disabled)": {
            boxShadow: "none",
          },
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        },
      },
      {
        props: { color: "secondary" },
        style: {
          "&:not(.Mui-disabled)": {
            boxShadow: "none",
          },
        },
      },
    ],
  },

  MuiFab: {
    styleOverrides: {
      root: {
        "&.MuiFab-default": {
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            backgroundColor: theme.palette.background.paper,
          },
          color: theme.palette.text.primary,
        },
      },
      colorInherit: {
        backgroundColor: "inherit",
        "&:hover, &:focus": {
          backgroundColor: "inherit",
        },
        boxShadow: "none",
      },
      extended: {
        fontWeight: 400,
        textTransform: "none",
      },
    },

    variants: [...MuiFabSizes],
  },

  MuiTextField: {
    defaultProps: { color: "secondary" },
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          ...breakpointVal(
            "borderRadius",
            theme.shape.borderRadius * 1.5,
            theme.shape.borderRadius * 2,
            theme.breakpoints.values
          ),
        },
      },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
      },
    },
  },

  MuiChip: {
    variants: [...MuiChip],
  },

  MuiCheckbox: {
    styleOverrides: {
      colorPrimary: {
        color: theme.palette.text.disabled,
        "&.Mui-checked": {
          color: theme.palette.primary.main,
        },
      },
      colorSecondary: {
        color: theme.palette.text.disabled,
        "&.Mui-checked": {
          color: theme.palette.secondary.main,
        },
      },
    },

    variants: [
      {
        props: { size: "medium" },
        style: {
          padding: 7,
        },
      },
    ],
  },

  MuiSwitch: {
    styleOverrides: {
      thumb: {
        boxShadow: theme.shadows[6],
      },
    },
  },

  MuiSnackbar: { variants: [...MuiSnackbar] },

  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: theme.palette.text.disabled,
      },
    },
  },

  MuiSlider: { variants: [...MuiSlider] },

  MuiCircularProgress: {
    defaultProps: {
      thickness: 2,
    },
  },
});

export const lightTheme = createThemeWithPalette(lightPalette);
lightTheme.components = createOverrides(lightTheme) as Components;

// export const darkTheme = createThemeWithPalette(darkPalette);
// darkTheme.components = createOverrides(darkTheme) as Components;
