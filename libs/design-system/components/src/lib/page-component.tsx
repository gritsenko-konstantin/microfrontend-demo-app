import React from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { color, space } from 'styled-system';

/* eslint-disable-next-line */
export interface TestComponentsProps {
    children: string | React.ReactNode;
    header: string;
};

const Header = styled.h1`
    background-color: ${themeGet('colors.primary')};
    color: ${themeGet('colors.white_text')};
    margin: 0;
    margin-bottom: ${themeGet('space.4')};
    padding: ${themeGet('space.3')};
`;

const Body = styled.h1`
    margin: ${themeGet('space.4')};
`;

export function PageComponent(props: TestComponentsProps) {
    return (
        <>
            <Header>{props.header}</Header>

            <Body>{props.children}</Body>
        </>
    );
}

export default PageComponent;
