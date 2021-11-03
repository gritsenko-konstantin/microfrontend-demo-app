import { TestComponent1, TestComponent2, PageComponent } from '@microfrontend-demo/design-system/components';
import { CustomThemeProvider } from '@microfrontend-demo/design-system/styles';

export function Index() {
    return (
        <CustomThemeProvider>
            <PageComponent header='Design System'>
                <TestComponent1>Test Component 1</TestComponent1>
                <TestComponent2>Test Component 2</TestComponent2>
            </PageComponent>
        </CustomThemeProvider>
    );
}

export default Index;
