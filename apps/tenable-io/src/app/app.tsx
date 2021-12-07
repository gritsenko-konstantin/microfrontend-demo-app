
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import { Link } from 'react-router-dom';

import { PageComponent } from '@microfrontend-demo/design-system/components';
import { CustomThemeProvider } from '@microfrontend-demo/design-system/styles';

import { Theme } from './theme';
import { SideNav } from './side-nav';
import { Landing } from './landing';
import { App1 } from './app-1';
import { App2 } from './app-2';

const Content = styled.div`
    padding: ${themeGet('space.4')};
`;

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`;

const HeaderLogo = styled(Link)<{ children: React.ReactNode}>`
    background-color: ${themeGet('colors.tenable_io_dark')};
    color: ${themeGet('colors.white_text')};
    font-size: ${themeGet('fontSizes.2')};
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0 ${themeGet('space.2')}; 0 0;
    text-decoration: none;
`;

export function Index() {
    return (
        <CustomThemeProvider theme={Theme}>
            <BrowserRouter>
                <PageComponent headerLogo={<HeaderLogo to='/'>Tenable.io</HeaderLogo>}>
                    <Wrapper>
                        <SideNav />

                        <Content>
                            <Routes>
                                <Route path="/" element={<Landing />} />
                                <Route path="app1" element={<App1 />} />
                                <Route path="app2" element={<App2 />} />
                            </Routes>  
                        </Content>
                    </Wrapper>
                </PageComponent>
            </BrowserRouter>
        </CustomThemeProvider>
    );
}

export default Index;
