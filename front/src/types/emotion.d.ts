import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    PUBLIC_BLACK: string;
    PUBLIC_WHITE: string;
    HOME_GRAY: string;
    spacing: number;
  }
}
