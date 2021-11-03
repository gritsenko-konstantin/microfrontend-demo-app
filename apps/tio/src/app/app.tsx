import { TestComponent1, PageComponent } from '@microfrontend-demo/design-system/components';
import { CustomThemeProvider } from '@microfrontend-demo/design-system/styles';

export function Index() {
    return (
        <CustomThemeProvider>
            <PageComponent header='TIO App'>
                <TestComponent1>Test Component 1</TestComponent1>
            </PageComponent>
        </CustomThemeProvider>
    );
}

export default Index;
