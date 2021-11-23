import { ThemeConfig } from "bumbag-native/types";

const lightTheme : ThemeConfig = {
    palette: {
        primary: '#000199',
        secondary: '#387FF5',
        body: '#FFFFFF',
        muted: '#919AA9',
        mutedPrimary: '#3F40ED',
        mutedLight: '#E5E5E5',
        mutedDark: '#e4e4e4',
        // semantic colors
        warning: '#976A02',
        warningLight: '#FCF5CB',
        success: '#176A11',
        successLight: '#C1F1A3',
        // specials colors
        avatar: '#6C85FF'
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
        xlarge: 28,
        xxlarge: 36
    },
    icons: {
        icons: {
            chile: {
                viewBoxHeight: 512,
                viewBoxWidth: 512
            } 
        }   
    }
}

export { lightTheme }