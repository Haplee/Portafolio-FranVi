export interface ThemeOptions {
    dark: string;
    light: string;
}

export interface SvglIcon {
    id: number;
    title: string;
    category: string | string[];
    route: string | ThemeOptions;
    url: string;
    wordmark?: string | ThemeOptions;
}
