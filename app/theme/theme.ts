import {Platform, StyleSheet} from 'react-native';

// Types
interface spacingType {
  borderRadius: number;
  layoutPaddingH: number;
  containerPaddingV: number;
  cardMarginB: number;
  cardPadding: number;
}

interface typeSizesType {
  // Font Sizes
  FONT_SIZE_SMALL: number;
  FONT_SIZE_MEDIUM: number;
  FONT_SIZE_LARGE: number;
  FONT_SIZE_LARGE_XL: number;

  // Font Weights
  FONT_WEIGHT_LIGHT: number;
  FONT_WEIGHT_MEDIUM: number;
  FONT_WEIGHT_HEAVY: number;
}

export interface themeType {
  name: string;
  color: string;
  primary: string;
  layoutBg: string;
  cardBg: string;
  cardBorderColor: string;
  accent: string;
  error: string;
  gray: string;
  text: string;
  placeholder: string;
}

interface themesType {
  light: themeType;
  dark: themeType;
}

// Spacing:- Common margins and paddings
const spacing: spacingType = {
  borderRadius: 16,
  layoutPaddingH: 16,
  containerPaddingV: 22,
  cardMarginB: 16,
  cardPadding: 8,
};

// Type Sizes:- Font sizes and weights
const typeSizes: typeSizesType = {
  FONT_SIZE_LARGE_XL: 32,
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_SMALL: 12,
  // Font Weights
  FONT_WEIGHT_LIGHT: 200,
  FONT_WEIGHT_MEDIUM: 600,
  FONT_WEIGHT_HEAVY: 700,
};

const typeVariants = {
  header: {
    fontFamily: 'Poppins-Bold',
    fontSize: typeSizes.FONT_SIZE_LARGE_XL,
  },
  titleLarge: {
    fontFamily: 'Poppins-Bold',
    fontSize: typeSizes.FONT_SIZE_LARGE,
  },
  titleSmall: {
    fontFamily: 'Poppins-Bold',
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
  bodyMedium: {
    fontFamily: 'Poppins-Regular',
    fontSize: typeSizes.FONT_SIZE_MEDIUM,
  },
  bodySmall: {
    fontFamily: 'Poppins-Regular',
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
};

// Themes:- Can alter values here. Can only be consumed through Context (see useTheme.js file)
const themes: themesType = {
  light: {
    name: 'light',
    color: '#695D5D',
    primary: '#2bbca2',
    layoutBg: '#e0eeec',
    cardBg: '#ffffff',
    cardBorderColor: '#EEECEC',
    accent: '#0071ff',
    error: '#B00020',
    gray: '#111827',
    text: '#000000',
    placeholder: '#A9A9A9',
  },
  dark: {
    name: 'dark',
    color: '#ffffff',
    primary: '#2bbca2',
    layoutBg: '#121212',
    cardBg: '#1e1e1e',
    cardBorderColor: '#1A1A1A',
    accent: '#0071ff',
    error: '#B00020',
    gray: '#ffffff',
    text: '#ffffff',
    placeholder: '#ffffff',
  },
};

const elevation = Platform.select({
  android: {
    elevation: 10,
  },
  ios: {},
});

const styleShadows = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 1,
    shadowOpacity: 0.15,
    overflow: 'visible',
    ...elevation,
  },
  shadowRight: {
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 1,
    shadowOpacity: 0.15,
    overflow: 'visible',
    ...elevation,
  },
  shadowTop: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 1,
    shadowOpacity: 0.13,
    overflow: 'visible',
    ...elevation,
  },
  shadowWhiteBottom: {
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 1,
    shadowOpacity: 1,
    overflow: 'visible',
    ...elevation,
  },
  shadowAll: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 1,
    shadowOpacity: 0.5,
    overflow: 'visible',
    ...elevation,
  },
});

export {spacing, typeSizes, typeVariants, themes, styleShadows};
