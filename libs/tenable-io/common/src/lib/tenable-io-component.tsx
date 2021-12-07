import React from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { color, space } from 'styled-system';

/* eslint-disable-next-line */
export interface TestComponentsProps {
};

const CustomStyle = styled.button`
    ${color}
    ${space}
    border: none;
    background-color: ${themeGet('colors.tenable_io_dark')};
    color: ${themeGet('colors.white_text')};
    margin-right: ${themeGet('space.2')};
    padding: ${themeGet('space.2')};
`;

export function TenableIoComponent(props: TestComponentsProps) {
    return (
        <CustomStyle>
            Tenable IO Component
        </CustomStyle>
    );
}

export default TenableIoComponent;
