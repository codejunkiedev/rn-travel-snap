import { isDeviceWeb } from '@/constants';

export enum FONT_FAMILY {
  POPPINS_BOLD = 'Poppins-Bold',
  POPPINS_BOLD_ITALIC = 'Poppins-BoldItalic',
  POPPINS_REGULAR = 'Poppins-Regular',
  POPPINS_ITALIC = 'Poppins-Italic',
  POPPINS_LIGHT = 'Poppins-Light',
  POPPINS_LIGHT_ITALIC = 'Poppins-LightItalic',
}

export enum FONT_SIZE {
  EXTRA_SMALL = isDeviceWeb ? 10 : 12,
  SMALL = isDeviceWeb ? 12 : 14,
  MEDIUM = isDeviceWeb ? 14 : 16,
  LARGE = isDeviceWeb ? 16 : 18,
  EXTRA_LARGE = isDeviceWeb ? 18 : 20,
  SUBTITLE = isDeviceWeb ? 22 : 24,
  TITLE = isDeviceWeb ? 26 : 28,
  SUBHEADER = isDeviceWeb ? 28 : 30,
  HEADER = isDeviceWeb ? 30 : 32,
}

export enum FONT_WEIGHT {
  LIGHT = '200',
  REGULAR = '400',
  BOLD = '700',
}
