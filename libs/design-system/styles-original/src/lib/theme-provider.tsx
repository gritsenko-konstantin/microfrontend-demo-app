import { ThemeProvider, createGlobalStyle } from 'styled-components';
import React from 'react';

/* eslint-disable-next-line */
export interface DesignSystemComponentsProps {
    children: string | React.ReactNode;
    theme: Record<string, unknown>;
};

export function CustomThemeProvider(props: DesignSystemComponentsProps) {
    const GlobalStyles = createGlobalStyle`
        body {
            font-family: helvetica;
        }

        html, body {
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
        }
        
        body, #root {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    `;

    return (
        <ThemeProvider theme={props.theme}>
            <>
                <GlobalStyles />
                {props.children}
            </>
        </ThemeProvider>
    );
}

export default CustomThemeProvider;
