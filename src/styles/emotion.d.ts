export type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {
    red1: string;
    black3: string;
    black2: string;
    black1: string;
    black0: string;
    white0: string;
    white1: string;
  }
}
