export type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {
    bgColor: string;
    textColor: string;
    btnColor: string;
  }
}
