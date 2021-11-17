import React from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { color, space } from 'styled-system';

const CustomStyle = styled.button`
    ${color}
    ${space}
    border: none;
    background-color: ${themeGet('colors.primary_dark')};
    color: ${themeGet('colors.white_text')};
    margin-right: ${themeGet('space.2')};
    padding: ${themeGet('space.2')};
`;

export function TestComponent3() {
    return (
        <CustomStyle>
            Test Component 3
        </CustomStyle>
    );
}

export default TestComponent3;
