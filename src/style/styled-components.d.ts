import "styled-components"

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        iBgColor: string;
        textColor: string;
        eColor: string;
        iTextColor: string;
    }
}