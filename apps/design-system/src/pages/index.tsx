import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TestComponent1, TestComponent2, PageComponent } from '@microfrontend-demo/design-system/components';
import { CustomThemeProvider } from '@microfrontend-demo/design-system/styles';

import { Theme } from '../themes/theme';

const Content = styled.div`
    padding: ${themeGet('space.4')};
`;

const HeaderLogo = styled.div<{ children: React.ReactNode}>`
    background-color: ${themeGet('colors.tds')};
    color: ${themeGet('colors.white_text')};
    font-size: ${themeGet('fontSizes.2')};
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0 ${themeGet('space.2')} 0 0;
    text-decoration: none;
`;

export function Index() {
    return (
        <CustomThemeProvider theme={Theme}>
            <PageComponent headerLogo={<HeaderLogo>Design System</HeaderLogo>}>
                <Content>
                    <TestComponent1/>
                    <TestComponent2/>
                </Content>
            </PageComponent>
        </CustomThemeProvider>
    );
}

export default Index;
