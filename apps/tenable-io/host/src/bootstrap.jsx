import React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import {
    HashRouter,
    Routes,
    Route
  } from "react-router-dom";
import { Link } from 'react-router-dom';

import { PageComponent } from '@microfrontend-demo/design-system/components';
import { CustomThemeProvider } from '@microfrontend-demo/design-system/styles';

import { Application1 } from 'application1';
import { Application2 } from 'application2';

import { Theme } from './theme';
import { SideNav } from './side-nav';
import { Landing } from './landing';

const Content = styled.div`
    padding: ${themeGet('space.4')};
`;

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`;

const HeaderLogo = styled(Link)`
    background-color: ${themeGet('colors.tenable_io_dark')};
    color: ${themeGet('colors.white_text')};
    font-size: ${themeGet('fontSizes.2')};
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0 ${themeGet('space.2')}; 0 0;
    text-decoration: none;
`;

const App = () => {
    return (
        <CustomThemeProvider theme={Theme}>
            <HashRouter>
                <PageComponent headerLogo={<HeaderLogo to='/'>Tenable.io</HeaderLogo>}>
                    <Wrapper>
                        <SideNav />

                        <Content>
                            <Routes>
                                <Route path="/" element={<Landing />} />
                                
                                <Route
                                    path='app1'
                                    element={<Application1 />}
                                />
                                
                                <Route
                                    path='app2'
                                    element={<Application2 />}
                                />
                            </Routes>  
                        </Content>
                    </Wrapper>
                </PageComponent>
            </HashRouter>
        </CustomThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
