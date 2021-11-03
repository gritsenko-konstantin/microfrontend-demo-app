import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Theme } from './theme';
import React from 'react';

/* eslint-disable-next-line */
export interface DesignSystemComponentsProps {
    children: string | React.ReactNode;
};

export function CustomThemeProvider(props: DesignSystemComponentsProps) {
    const GlobalStyles = createGlobalStyle`
        body {
            font-family: helvetica;
            margin: 0;
        }
    `;

    return (
        <ThemeProvider theme={Theme}>
            <>
                <GlobalStyles />
                {props.children}
            </>
        </ThemeProvider>
    );
}

export default CustomThemeProvider;
