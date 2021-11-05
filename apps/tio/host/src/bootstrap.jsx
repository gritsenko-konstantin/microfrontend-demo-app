import React, { Suspense, lazy } from 'react';
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

import { Theme } from './theme';
import { SideNav } from './side-nav';
import { Landing } from './landing';

const App1 = lazy(() => import('application1'));
const App2 = lazy(() => import('application2'));

const Content = styled.div`
    padding: ${themeGet('space.4')};
`;

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`;

const HeaderLogo = styled(Link)`
    background-color: ${themeGet('colors.tio_dark')};
    color: ${themeGet('colors.white_text')};
    font-size: ${themeGet('fontSizes.2')};
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0 ${themeGet('space.2')}; 0 0;
    text-decoration: none;
`;

const Loader = () => {
    return (
        <>Please wait while the application is loaded</>
    );
};

const App = () => {
    return (
        <CustomThemeProvider theme={Theme}>
            <HashRouter>
                <PageComponent headerLogo={<HeaderLogo to='/'>Tio</HeaderLogo>}>
                    <Wrapper>
                        <SideNav />

                        <Content>
                            <Routes>
                                <Route path="/" element={<Landing />} />
                                
                                <Route
                                    path='app1'
                                    element={(
                                        <Suspense fallback={<Loader />}>
                                            <App1 />
                                        </Suspense>
                                    )}
                                />

                                <Route
                                    path='app2'
                                    element={(
                                        <Suspense fallback={<Loader />}>
                                            <App2 />
                                        </Suspense>
                                    )}
                                />
                            </Routes>  
                        </Content>
                    </Wrapper>
                </PageComponent>
            </HashRouter>
        </CustomThemeProvider>
    );
};

/*
<Route path="app1" element={<App1 />} />
<Route path="app2" element={<App2 />} />
*/

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
