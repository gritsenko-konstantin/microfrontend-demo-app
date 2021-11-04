
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TestComponent1, PageComponent } from '@microfrontend-demo/design-system/components';
import { TioComponent } from '@microfrontend-demo/tio/common';
import { CustomThemeProvider } from '@microfrontend-demo/design-system/styles';

import { Theme } from './theme';
import { SideNav } from './side-nav';

const Content = styled.div`
    padding: ${themeGet('space.4')};
`;

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`;

export function App1() {
    return (
        <>
            Application 1
        </>
    );
}

export default App1;
